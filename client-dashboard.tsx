import { useMemo } from "react"
import { DashboardHeader } from "./components/dashboard/dashboard-header"
import { StatsGrid } from "./components/dashboard/stats-grid"
import { FilterControls } from "./components/dashboard/filter-controls"
import { QuickFilterButtons } from "./components/dashboard/quick-filter-buttons"
import { ClientsTable } from "./components/table/clients-table"
import { MobileClientsGrid } from "./components/mobile/mobile-clients-grid"
import { ShadcnChartsGrid } from "./components/charts/shadcn-charts-grid"

// Custom hooks
import { useClientData } from "./hooks/use-client-data"
import { useDashboardFilters } from "./hooks/use-dashboard-filters"
import { useTableSorting } from "./hooks/use-table-sorting"
import { useFilteredClients } from "./hooks/use-filtered-clients"
import { useDashboardStats } from "./hooks/use-dashboard-stats"

export default function ClientDashboard() {
  // Data management
  const { data, isLoading, syncData } = useClientData()

  // Filtering
  const { filters, updateFilter } = useDashboardFilters()

  // Sorting
  const { sortField, sortDirection, handleSort } = useTableSorting()

  // Computed data
  const filteredClients = useFilteredClients(data, filters, sortField, sortDirection)
  const stats = useDashboardStats(data)

  // Derived data
  const uniquePMs = useMemo(() => [...new Set(data.map((client) => client.pm))], [data])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <DashboardHeader onSync={syncData} isLoading={isLoading} />

        {/* Stats Cards */}
        <StatsGrid stats={stats} />

        {/* Analytics Charts - Using shadcn/ui Charts */}
        <ShadcnChartsGrid />

        {/* Filters */}
        <FilterControls filters={filters} uniquePMs={uniquePMs} onFilterChange={updateFilter} />

        {/* Quick Filters */}
        <QuickFilterButtons
          activeFilter={filters.quickFilter}
          onFilterChange={(filter) => updateFilter("quickFilter", filter)}
        />

        {/* Data Display - Desktop Table */}
        <ClientsTable
          clients={filteredClients}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />

        {/* Data Display - Mobile Cards */}
        <MobileClientsGrid clients={filteredClients} />
      </div>
    </div>
  )
}
