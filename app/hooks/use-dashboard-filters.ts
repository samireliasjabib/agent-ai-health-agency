"use client"

import { useState, useCallback } from "react"
import type { DashboardFilters } from "../types/client"

const initialFilters: DashboardFilters = {
  searchTerm: "",
  pmFilter: "all",
  riskFilter: "all",
  quickFilter: "all",
}

export function useDashboardFilters() {
  const [filters, setFilters] = useState<DashboardFilters>(initialFilters)

  const updateFilter = useCallback(<K extends keyof DashboardFilters>(key: K, value: DashboardFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [])

  return {
    filters,
    updateFilter,
    resetFilters,
  }
}
