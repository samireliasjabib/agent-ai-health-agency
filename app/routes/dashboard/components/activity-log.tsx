"use client"

import { Badge } from "~/components/ui/badge"
import { 
  Activity, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  Settings,
  RefreshCw
} from "lucide-react"

interface ActivityItem {
  id: string
  type: "health_check" | "automation" | "alert" | "report" | "maintenance"
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "error" | "info"
  store?: string
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "health_check",
    title: "Health Check Completed",
    description: "Automated health scan for TechGear Store",
    timestamp: "2 min ago",
    status: "success",
    store: "TechGear Store"
  },
  {
    id: "2", 
    type: "alert",
    title: "Critical Issue Detected",
    description: "Payment gateway down for Fashion Hub",
    timestamp: "5 min ago",
    status: "error",
    store: "Fashion Hub"
  },
  {
    id: "3",
    type: "automation",
    title: "Project Report Generated", 
    description: "Weekly performance report sent to client",
    timestamp: "15 min ago",
    status: "success",
    store: "SportGear Co"
  },
  {
    id: "4",
    type: "maintenance",
    title: "Satisfaction Analysis",
    description: "Customer sentiment analysis completed",
    timestamp: "1 hr ago", 
    status: "info",
    store: "Beauty Store"
  },
  {
    id: "5",
    type: "automation",
    title: "Code Review Alert",
    description: "Security vulnerability detected",
    timestamp: "2 hr ago",
    status: "warning",
    store: "Electronics Plus"
  }
]

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case "health_check":
      return <Activity className="h-4 w-4" />
    case "automation":
      return <RefreshCw className="h-4 w-4" />
    case "alert":
      return <AlertTriangle className="h-4 w-4" />
    case "report":
      return <TrendingUp className="h-4 w-4" />
    case "maintenance":
      return <Settings className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getStatusBadge = (status: ActivityItem['status']) => {
  switch (status) {
    case "success":
      return <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">Success</Badge>
    case "warning":
      return <Badge variant="default" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs">Warning</Badge>
    case "error":
      return <Badge variant="destructive" className="text-xs">Error</Badge>
    case "info":
      return <Badge variant="secondary" className="text-xs">Info</Badge>
    default:
      return <Badge variant="outline" className="text-xs">Unknown</Badge>
  }
}

export function ActivityLog() {
  return (
    <div className="h-[350px] overflow-y-auto">
      <div className="space-y-3">
        {mockActivities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className={`p-1.5 rounded-full ${
                activity.status === 'success' ? 'bg-green-500/10 text-green-600' :
                activity.status === 'warning' ? 'bg-yellow-500/10 text-yellow-600' :
                activity.status === 'error' ? 'bg-red-500/10 text-red-600' :
                'bg-blue-500/10 text-blue-600'
              }`}>
                {getActivityIcon(activity.type)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </h4>
                {getStatusBadge(activity.status)}
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {activity.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{activity.timestamp}</span>
                {activity.store && (
                  <span className="font-medium truncate max-w-[100px]">{activity.store}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 