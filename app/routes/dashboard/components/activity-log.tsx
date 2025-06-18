"use client"

import { Badge } from "~/components/ui/badge"
import { ScrollArea } from "~/components/ui/scroll-area"
import { 
  Activity, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  Settings,
  RefreshCw,
  Brain,
  MessageCircle,
  Search,
  Zap,
  Users,
  Phone,
  FileText,
  BarChart3
} from "lucide-react"

interface ActivityItem {
  id: string
  type: "health_check" | "automation" | "alert" | "report" | "maintenance" | "sentiment" | "call_analysis" | "meeting" | "client_interaction"
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "error" | "info"
  client?: string
  impact?: "high" | "medium" | "low"
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "call_analysis",
    title: "Client Call Analysis Completed",
    description: "AI analyzed TechGear's weekly check-in call - client satisfaction score: 8.5/10, no risk indicators detected",
    timestamp: "3 min ago",
    status: "success",
    client: "TechGear Solutions",
    impact: "medium"
  },
  {
    id: "2", 
    type: "alert",
    title: "Client Health Score Declined",
    description: "Fashion Hub's health score dropped from 7.8 to 6.2 after analyzing recent communication patterns",
    timestamp: "8 min ago",
    status: "warning", 
    client: "Fashion Hub",
    impact: "high"
  },
  {
    id: "3",
    type: "report",
    title: "Weekly Client Health Report Generated", 
    description: "Comprehensive health analysis report generated and sent to PM - SportGear Co showing 15% improvement",
    timestamp: "25 min ago",
    status: "success",
    client: "SportGear Co",
    impact: "medium"
  },
  {
    id: "4",
    type: "meeting",
    title: "PM-Client Strategy Meeting Scheduled",
    description: "AI detected declining sentiment in Beauty Store communications, auto-scheduled intervention meeting for tomorrow",
    timestamp: "45 min ago", 
    status: "info",
    client: "Beauty Store",
    impact: "high"
  },
  {
    id: "5",
    type: "sentiment",
    title: "Positive Sentiment Trend Detected",
    description: "Electronics Plus client emails show 85% positive sentiment this week - relationship strengthening confirmed",
    timestamp: "1 hr ago",
    status: "success",
    client: "Electronics Plus",
    impact: "medium"
  },
  {
    id: "6",
    type: "automation",
    title: "Risk Escalation Workflow Triggered",
    description: "Home Decor Shop missed 3 check-ins, automated follow-up sequence initiated with PM Sarah Johnson",
    timestamp: "2 hr ago",
    status: "warning",
    client: "Home Decor Shop",
    impact: "high"
  },
  {
    id: "7",
    type: "client_interaction",
    title: "Customer Feedback Analysis Complete",
    description: "AI chatbot analyzed 34 customer interactions from Pet Supplies Co - overall satisfaction: 92%",
    timestamp: "3 hr ago",
    status: "success",
    client: "Pet Supplies Co",
    impact: "low"
  },
  {
    id: "8",
    type: "health_check",
    title: "Monthly Health Assessment",
    description: "Automated health check completed for Wellness Store - all KPIs within healthy ranges, no action needed",
    timestamp: "4 hr ago",
    status: "success",
    client: "Wellness Store",
    impact: "low"
  },
  {
    id: "9",
    type: "call_analysis",
    title: "Emergency Call Analysis",
    description: "Urgent call analysis for Outdoor Gear Ltd - detected contract cancellation risk, immediate PM intervention required",
    timestamp: "5 hr ago",
    status: "error",
    client: "Outdoor Gear Ltd",
    impact: "high"
  },
  {
    id: "10",
    type: "automation",
    title: "Success Story Report Generated",
    description: "AI compiled positive outcomes for Luxury Fashion - 40% revenue increase, client happiness at all-time high",
    timestamp: "6 hr ago",
    status: "success",
    client: "Luxury Fashion",
    impact: "medium"
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
      return <FileText className="h-4 w-4" />
    case "maintenance":
      return <Settings className="h-4 w-4" />
    case "sentiment":
      return <Brain className="h-4 w-4" />
    case "call_analysis":
      return <Phone className="h-4 w-4" />
    case "meeting":
      return <Users className="h-4 w-4" />
    case "client_interaction":
      return <MessageCircle className="h-4 w-4" />
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

const getImpactIndicator = (impact?: string) => {
  if (!impact) return null
  
  const colors = {
    high: "border-l-red-500 bg-red-50/50 dark:bg-red-950/20",
    medium: "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20", 
    low: "border-l-green-500 bg-green-50/50 dark:bg-green-950/20"
  }
  
  return colors[impact as keyof typeof colors] || ""
}

export function ActivityLog() {
  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-3 pr-4">
        {mockActivities.map((activity) => (
          <div 
            key={activity.id} 
            className={`flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-border transition-all duration-200 border-l-4 ${getImpactIndicator(activity.impact)}`}
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
                <div className="flex items-center gap-1">
                  {activity.impact && (
                    <Badge variant="outline" className={`text-xs ${
                      activity.impact === 'high' ? 'text-red-600 border-red-200' :
                      activity.impact === 'medium' ? 'text-yellow-600 border-yellow-200' :
                      'text-green-600 border-green-200'
                    }`}>
                      {activity.impact}
                    </Badge>
                  )}
                  {getStatusBadge(activity.status)}
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {activity.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{activity.timestamp}</span>
                {activity.client && (
                  <span className="font-medium truncate max-w-[100px]">{activity.client}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
} 