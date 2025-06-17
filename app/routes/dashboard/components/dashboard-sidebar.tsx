"use client"

import type * as React from "react"
import {
  Bot,
  Cog,
  Heart,
  ShoppingBag,
  Users,
  Workflow,
  Zap,
  Shield,
  SproutIcon as Seedling,
  Gauge,
  FileText,
  User as UserIcon,
  Moon,
  Sun,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "~/components/ui/sidebar"
import { UserButton } from "@clerk/remix"
import { Button } from "~/components/ui/button"
import { Theme, useTheme } from "remix-themes"
import { User } from "../types"

const data = {
  navMain: [
    {
      title: "Core Operations",
      items: [
        {
          title: "Store Health",
          url: "/dashboard",
          icon: Heart,
          isActive: true,
        },
        {
          title: "AI Agents",
          url: "/dashboard/agents",
          icon: Bot,
        },
      ],
    },
    {
      title: "User Automations",
      items: [
        {
          title: "Automations",
          url: "/dashboard/automations",
          icon: Workflow,
        },
      ],
    },
    {
      title: "E-commerce Management",
      items: [
        {
          title: "Shopify Stores",
          url: "/dashboard/stores",
          icon: ShoppingBag,
        },
      ],
    },
    {
      title: "Admin",
      items: [
        {
          title: "Team Management",
          url: "/dashboard/team",
          icon: Users,
        },
        {
          title: "Seedid.AI Health",
          url: "/dashboard/seed-health",
          icon: Seedling,
        },
        {
          title: "AI Speed Health",
          url: "/dashboard/ai-speed",
          icon: Gauge,
        },
        {
          title: "Form+ Health",
          url: "/dashboard/form-health",
          icon: FileText,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Cog,
        },
      ],
    },
  ],
}

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: User }) {
  const { state } = useSidebar()
  const [theme, setTheme] = useTheme()
  
  return (
    <Sidebar 
      variant="inset" 
      collapsible="icon" 
      {...props}
      className="border-r border-border bg-sidebar"
    >
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-3 transition-all duration-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md">
            <Zap className="h-4 w-4" />
          </div>
          <div className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ${
            state === "collapsed" ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}>
            <span className="truncate font-semibold text-sidebar-foreground">
              ArcticGrey
            </span>
            <span className="truncate text-xs text-sidebar-foreground/60">
              Shopify AI Platform
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 bg-sidebar">
        {data.navMain.map((section) => (
          <SidebarGroup key={section.title} className="py-2">
            <SidebarGroupLabel className={`text-sidebar-foreground/60 transition-all duration-200 ${
              state === "collapsed" ? "opacity-0" : "opacity-100"
            }`}>
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={item.isActive} 
                      tooltip={item.title}
                    >
                      <a href={item.url} className="flex items-center gap-3 w-full">
                        <item.icon className="h-4 w-4 transition-all duration-200 group-hover:scale-110" />
                        <span className={`transition-all duration-200 ${
                          state === "collapsed" ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                        }`}>
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="space-y-2">
        {/* Dark Mode Toggle */}
        <div className="px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}
            className={`w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 ${
              state === "collapsed" ? "px-2" : ""
            }`}
          >
            {theme === Theme.DARK ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className={`transition-all duration-200 ${
              state === "collapsed" ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}>
              {theme === Theme.DARK ? "Light Mode" : "Dark Mode"}
            </span>
          </Button>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3 p-3 transition-all duration-200">
          <div className="transition-all duration-200 hover:scale-105">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: {
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--sidebar-border))",
                    backgroundColor: "hsl(var(--sidebar-accent))",
                  },
                  
                  avatarImage: {
                    borderRadius: "6px",
                  },

                  userButtonPopoverCard: {
                    backgroundColor: "hsl(var(--sidebar-background))",
                    border: "1px solid hsl(var(--sidebar-border))",
                    borderRadius: "12px",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    color: "hsl(var(--sidebar-foreground))",
                    minWidth: "250px",
                  },

                  userButtonPopoverMain: {
                    padding: "20px",
                    borderBottom: "1px solid hsl(var(--sidebar-border))",
                    backgroundColor: "hsl(var(--sidebar-background))",
                  },

                  userButtonPopoverMainIdentifier: {
                    color: "hsl(var(--sidebar-foreground))",
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "4px",
                  },

                  userButtonPopoverMainIdentifierText: {
                    color: "hsl(var(--sidebar-foreground))",
                    fontSize: "14px",
                    opacity: "0.8",
                  },

                  userButtonPopoverActions: {
                    padding: "8px",
                    gap: "4px",
                    backgroundColor: "hsl(var(--sidebar-background))",
                  },

                  userButtonPopoverActionButton: {
                    backgroundColor: "transparent",
                    color: "hsl(var(--sidebar-foreground))",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    transition: "all 0.2s ease",
                    border: "none",
                    width: "100%",
                    justifyContent: "flex-start",
                    fontSize: "14px",
                    fontWeight: "500",
                    "&:hover": {
                      backgroundColor: "hsl(var(--sidebar-accent))",
                      color: "hsl(var(--sidebar-accent-foreground))",
                    },
                    "&:focus": {
                      backgroundColor: "hsl(var(--sidebar-accent))",
                      color: "hsl(var(--sidebar-accent-foreground))",
                    }
                  },

                  userButtonPopoverActionButtonText: {
                    color: "inherit",
                    fontSize: "14px",
                    fontWeight: "500",
                  },

                  userButtonPopoverActionButtonIcon: {
                    color: "inherit",
                    marginRight: "12px",
                    opacity: "0.8",
                  },

                  userButtonPopoverFooter: {
                    borderTop: "1px solid hsl(var(--sidebar-border))",
                    backgroundColor: "hsl(var(--sidebar-background))",
                    padding: "12px 20px",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    color: "hsl(var(--sidebar-foreground))",
                  },

                  userButtonPopoverFooterPages: {
                    color: "hsl(var(--sidebar-foreground))",
                  },

                  userButtonPopoverFooterPageButton: {
                    color: "hsl(var(--sidebar-foreground))",
                    textDecoration: "none",
                    "&:hover": {
                      color: "hsl(var(--sidebar-accent-foreground))",
                    }
                  },

                  userButtonPopoverCard__main: {
                    color: "hsl(var(--sidebar-foreground))",
                  },

                  userButtonPopoverCard__actions: {
                    backgroundColor: "hsl(var(--sidebar-background))",
                  },

                  userButtonPopoverCard__footer: {
                    backgroundColor: "hsl(var(--sidebar-background))",
                    color: "hsl(var(--sidebar-foreground))",
                  }
                }
              }}
            />
          </div>
          
          {user && (
            <div className={`flex flex-col flex-1 text-left leading-tight transition-all duration-200 ${
              state === "collapsed" ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}>
              <span className="truncate text-sm font-semibold text-sidebar-foreground">
                {user.name}
              </span>
              <span className="truncate text-xs text-sidebar-foreground/60 capitalize mt-0.5">
                {user.role?.toLowerCase().replace('_', ' ')}
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
