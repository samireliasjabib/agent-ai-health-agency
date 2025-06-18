"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { 
  CheckSquare, 
  Zap, 
  Calendar,
  Users,
  MessageCircle,
  FileText,
  Timer,
  Target,
  Clock,
  CheckCircle,
  GitBranch,
  Briefcase
} from "lucide-react"

const projectManagementAutomations = [
  {
    id: "task-assignment",
    title: "Automated Task Assignment",
    description: "Intelligently assign tasks to team members based on workload and skills",
    icon: CheckSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    status: "ready",
    estimatedTime: "Instant",
    category: "Task Management"
  },
  {
    id: "deadline-tracking",
    title: "Deadline & Milestone Tracking",
    description: "Monitor project deadlines and send automated reminders to stakeholders",
    icon: Calendar,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    status: "active",
    estimatedTime: "Real-time",
    category: "Scheduling"
  },
  {
    id: "team-standup",
    title: "Daily Standup Automation",
    description: "Generate standup reports and track team progress automatically",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    status: "scheduled",
    estimatedTime: "Daily 9 AM",
    category: "Team Management"
  },
  {
    id: "client-updates",
    title: "Client Progress Updates",
    description: "Automatically generate and send project status updates to clients",
    icon: MessageCircle,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    status: "ready",
    estimatedTime: "Weekly",
    category: "Communication"
  },
  {
    id: "time-tracking",
    title: "Smart Time Tracking",
    description: "Track time spent on tasks and projects with AI-powered insights",
    icon: Timer,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    status: "ready",
    estimatedTime: "Continuous",
    category: "Analytics"
  },
  {
    id: "resource-allocation",
    title: "Resource Allocation",
    description: "Optimize team resources and workload distribution across projects",
    icon: Target,
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    borderColor: "border-pink-200 dark:border-pink-800",
    status: "ready",
    estimatedTime: "5 min",
    category: "Planning"
  },
  {
    id: "sprint-planning",
    title: "Sprint Planning Assistant",
    description: "AI-powered sprint planning with velocity tracking and story estimation",
    icon: GitBranch,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    status: "ready",
    estimatedTime: "30 min",
    category: "Agile"
  },
  {
    id: "project-health",
    title: "Project Health Monitoring",
    description: "Monitor project health metrics and predict potential risks or delays",
    icon: Briefcase,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    status: "ready",
    estimatedTime: "Real-time",
    category: "Monitoring"
  }
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Active
        </div>
      </Badge>
    case "scheduled":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Scheduled
        </div>
      </Badge>
    case "ready":
      return <Badge variant="outline" className="bg-background">
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Ready
        </div>
      </Badge>
    default:
      return <Badge variant="secondary">Idle</Badge>
  }
}

export function QuickActions() {
  return (
    <Card className="bg-card-texture">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          Project Management Automation
        </CardTitle>
        <p className="text-muted-foreground">
          Streamline project workflows and team coordination with intelligent automation
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectManagementAutomations.map((automation) => {
            const Icon = automation.icon
            
            return (
              <Button
                key={automation.id}
                variant="outline"
                className={`h-auto p-4 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg ${automation.bgColor} ${automation.borderColor} hover:scale-[1.02] border-2`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-2 rounded-lg bg-background/50">
                    <Icon className={`h-4 w-4 ${automation.color}`} />
                  </div>
                  {getStatusBadge(automation.status)}
                </div>
                
                <div className="text-left w-full space-y-2">
                  <div className="font-semibold text-foreground text-sm leading-tight">
                    {automation.title}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {automation.description}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {automation.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                      <Clock className="h-3 w-3" />
                      {automation.estimatedTime}
                    </div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 