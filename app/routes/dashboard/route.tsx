import { LoaderFunctionArgs, redirect } from "@remix-run/node"
import { AppSidebar } from "./components/dashboard-sidebar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { getAuth } from "@clerk/remix/ssr.server"
import { prisma } from "~/db.server"
import { useLoaderData, Outlet } from "@remix-run/react"
import { User } from "./types"
import { HealthDistributionChart } from "./components/health-distribution-chart"
import { StoreMonitoringTable } from "./components/store-monitoring-table"
import { AIAgentsStatus } from "./components/ai-agents-status"
import { QuickActions } from "./components/quick-actions"
import { HealthTrendChart } from "./components/health-trend-chart"
import { MetricsCards } from "./components/metrics-cards"
import { RevenueImpactChart } from "./components/revenue-impact-chart"

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return redirect("/");
  }

  // Buscar usuario por clerkId (no por id)
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  })

  if (!user) {
    return redirect("/");
  }

  // Verificar onboarding
  if (!user.onboardingComplete || !user.role) {
    return redirect("/onboarding/role-selection");
  }

  // Crear el nombre completo de manera más robusta
  const fullName = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ") || user.email?.split("@")[0] || "Usuario"

  return {
    user: {
      name: fullName,
      email: user.email,
      role: user.role || "USER",
      imageUrl: user.imageUrl,
    }
  }
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar user={user as unknown as User} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 bg-sidebar border-b border-border px-6">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors duration-200" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-border" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                  >
                    Core Operations
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground font-semibold">
                    Store Health
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          <main className="flex-1 p-6">
            <div className="mx-auto max-w-7xl space-y-8">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  Store Health Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Real-time monitoring and health assessment for all Shopify stores
                </p>
              </div>

              {/* Critical Metrics */}
              <MetricsCards />

              {/* Main Health Distribution Chart with Activity Log */}
              <HealthDistributionChart />

              {/* Symmetric Charts Row */}
              <div className="grid gap-6 lg:grid-cols-2">
                <HealthTrendChart />
                <RevenueImpactChart />
              </div>

              {/* AI Automations */}
              <QuickActions />

              {/* Monitoring Section */}
              <div className="grid gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3">
                  <StoreMonitoringTable />
                </div>
                <div className="lg:col-span-1">
                  <AIAgentsStatus />
                </div>
              </div>

              {/* Nested routes content */}
              <div className="mt-8">
                <Outlet />
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
