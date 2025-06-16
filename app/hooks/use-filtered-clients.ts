"use client"

import { useMemo } from "react"
import type { ClientData, DashboardFilters, SortField, SortDirection } from "../types/client"

function isOverdue(date: Date): boolean {
  const daysDiff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff > 7
}

export function useFilteredClients(
  data: ClientData[],
  filters: DashboardFilters,
  sortField: SortField | null,
  sortDirection: SortDirection,
) {
  return useMemo(() => {
    const { searchTerm, pmFilter, riskFilter, quickFilter } = filters

    const filtered = data.filter((client) => {
      const matchesSearch =
        client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.pm.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPM = pmFilter === "all" || client.pm === pmFilter
      const matchesRisk = riskFilter === "all" || client.riskLevel === riskFilter

      // Quick filters
      let matchesQuickFilter = true
      if (quickFilter === "critical") {
        matchesQuickFilter = client.riskLevel === "High" && client.revenue > 50000
      } else if (quickFilter === "attention") {
        matchesQuickFilter = client.issues > 0
      } else if (quickFilter === "overdue") {
        matchesQuickFilter = isOverdue(client.lastCallDate)
      }

      return matchesSearch && matchesPM && matchesRisk && matchesQuickFilter
    })

    // Default sort: High-risk clients first, then by revenue
    if (!sortField) {
      filtered.sort((a, b) => {
        if (a.riskLevel === "High" && b.riskLevel !== "High") return -1
        if (b.riskLevel === "High" && a.riskLevel !== "High") return 1
        if (a.riskLevel === "Medium" && b.riskLevel === "Low") return -1
        if (b.riskLevel === "Medium" && a.riskLevel === "Low") return 1
        return b.revenue - a.revenue
      })
    } else if (sortDirection) {
      filtered.sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase()
          bValue = (bValue as string).toLowerCase()
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, filters, sortField, sortDirection])
}
