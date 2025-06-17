"use client"

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
import { useLoaderData } from "@remix-run/react"
import { User } from "./types"

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  return {
    user:{
      name: user?.firstName + " " + user?.lastName,
      email: user?.email,
      role: user?.role,
      imageUrl: user?.imageUrl,
    }
  }
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <div className="min-h-screen bg-main-texture">
      <SidebarProvider>
        <AppSidebar user={user as unknown as User} />
        <SidebarInset className="bg-main-texture">
          <header className="flex h-16 shrink-0 items-center gap-2 bg-header-texture px-4 backdrop-blur-sm">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-border" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-muted-foreground hover:text-foreground">
                    Core Operations
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground">Store Health</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
            <div className="mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Store Health Dashboard</h1>
              <p className="text-muted-foreground text-base">
                Real-time monitoring and health assessment for all Shopify stores
              </p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
