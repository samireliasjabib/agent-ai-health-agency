"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { 
  Zap,
  CheckCircle, 
  AlertTriangle,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Shield,
  BarChart3,
  RefreshCw
} from "lucide-react"

interface AutomationAction {
  id: string
  title: string
  description: string
  category: string
  status: "ready" | "active" | "scheduled" | "maintenance"
  frequency: string
  icon: any
  bgColor: string
  borderColor: string
  badgeColor: string
}

const automationActions: AutomationAction[] = [
  {
    id: "1",
    title: "Smart Client Health Reports",
    description: "Automatically generate comprehensive health reports with AI insights and send to clients weekly",
    category: "Analytics",
    status: "ready",
    frequency: "Weekly",
    icon: BarChart3,
    bgColor: "bg-green-500/5",
    borderColor: "border-green-500/20",
    badgeColor: "bg-green-500/10 text-green-600 border-green-500/20"
  },
  {
    id: "2", 
    title: "Critical Issue Alert System",
    description: "Monitor store performance and instantly notify stakeholders when critical issues are detected",
    category: "Monitoring",
    status: "active",
    frequency: "Real-time",
    icon: Shield,
    bgColor: "bg-red-500/5",
    borderColor: "border-red-500/20", 
    badgeColor: "bg-red-500/10 text-red-600 border-red-500/20"
  },
  {
    id: "3",
    title: "Revenue Optimization Engine", 
    description: "Analyze performance patterns and automatically suggest revenue improvement strategies",
    category: "Strategy",
    status: "scheduled",
    frequency: "Daily 9 AM",
    icon: TrendingUp,
    bgColor: "bg-blue-500/5",
    borderColor: "border-blue-500/20",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  },
  {
    id: "4",
    title: "Client Communication Hub",
    description: "Send automated project updates, milestone notifications, and performance summaries to clients",
    category: "Communication", 
    status: "ready",
    frequency: "Bi-weekly",
    icon: MessageSquare,
    bgColor: "bg-purple-500/5",
    borderColor: "border-purple-500/20",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20"
  },
  {
    id: "5",
    title: "Team Productivity Tracker",
    description: "Monitor team performance metrics and automatically distribute workload for optimal efficiency",
    category: "Team Management",
    status: "ready", 
    frequency: "Continuous",
    icon: Users,
    bgColor: "bg-orange-500/5",
    borderColor: "border-orange-500/20",
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/20"
  },
  {
    id: "6",
    title: "Competitor Analysis Bot",
    description: "Track competitor pricing, features, and marketing strategies with automated intelligence reports",
    category: "Research",
    status: "ready",
    frequency: "Daily",
    icon: Target,
    bgColor: "bg-cyan-500/5", 
    borderColor: "border-cyan-500/20",
    badgeColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20"
  },
  {
    id: "7",
    title: "Smart Project Scheduling",
    description: "AI-powered project timeline optimization that adapts to team capacity and client deadlines",
    category: "Planning",
    status: "maintenance",
    frequency: "Weekly",
    icon: Calendar,
    bgColor: "bg-yellow-500/5",
    borderColor: "border-yellow-500/20", 
    badgeColor: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
  },
  {
    id: "8",
    title: "Performance Forecasting AI",
    description: "Predict store performance trends and automatically adjust strategies for maximum ROI",
    category: "Forecasting",
    status: "ready",
    frequency: "Real-time",
    icon: RefreshCw,
    bgColor: "bg-indigo-500/5",
    borderColor: "border-indigo-500/20",
    badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20"
  }
]

const getStatusBadge = (status: AutomationAction['status'], badgeColor: string) => {
  const statusConfig = {
    ready: { label: "Ready", icon: CheckCircle },
    active: { label: "Active", icon: Zap },
    scheduled: { label: "Scheduled", icon: Clock },
    maintenance: { label: "Maintenance", icon: AlertTriangle }
  }
  
  const { label, icon: StatusIcon } = statusConfig[status]
  
  return (
    <Badge variant="outline" className={`${badgeColor} flex items-center gap-1 text-xs font-medium`}>
      <StatusIcon className="h-3 w-3" />
      {label}
    </Badge>
  )
}

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="text-center pb-6">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <Zap className="h-6 w-6 text-primary" />
          AI Automation Hub
        </CardTitle>
        <CardDescription>
          Intelligent workflows to streamline operations and maximize efficiency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {automationActions.map((action) => {
            const IconComponent = action.icon
            return (
              <Card 
                key={action.id} 
                className={`${action.bgColor} ${action.borderColor} border-2 hover:shadow-md transition-all duration-200 cursor-pointer group h-full`}
              >
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-background/80">
                      <IconComponent className="h-5 w-5 text-foreground" />
                    </div>
                    {getStatusBadge(action.status, action.badgeColor)}
                  </div>
                  
                  <div className="flex-1 text-center space-y-2">
                    <h3 className="font-semibold text-sm text-foreground leading-tight">
                      {action.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {action.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">
                        {action.category}
                      </span>
                      <span className="text-muted-foreground">
                        {action.frequency}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3 w-full group-hover:bg-background/60 transition-colors"
                  >
                    Configure
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 