import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  MoreHorizontal,
  Search,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Eye,
  Filter,
  Shield,
  Activity,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"

interface StoreData {
  store: string
  storeId: string
  healthStatus: "Healthy" | "Warning" | "Critical"
  healthScore: number
  trend: "up" | "down" | "stable"
  priority: "High" | "Medium" | "Low"
  revenue: string
  cwvStatus: "Good" | "Needs Improvement" | "Poor"
  visitors: string
  aiAgents: number
  criticalIssues: number
  lastSync: string
  status: "online" | "warning" | "critical" | "offline"
  satisfaction: number // 0-100
  lastFeedback: string
  sentiment: "positive" | "neutral" | "negative"
}

const mockStoreData: StoreData[] = [
  {
    store: "TechGear Store",
    storeId: "TG-001",
    healthStatus: "Healthy",
    healthScore: 95,
    trend: "up",
    priority: "High",
    revenue: "$125K",
    cwvStatus: "Good",
    visitors: "45.2K",
    aiAgents: 3,
    criticalIssues: 0,
    lastSync: "2 min ago",
    status: "online",
    satisfaction: 97,
    lastFeedback: "Great support, very responsive team.",
    sentiment: "positive"
  },
  {
    store: "Fashion Forward",
    storeId: "FF-002",
    healthStatus: "Healthy",
    healthScore: 92,
    trend: "up",
    priority: "High",
    revenue: "$98K",
    cwvStatus: "Good",
    visitors: "38.7K",
    aiAgents: 4,
    criticalIssues: 0,
    lastSync: "5 min ago",
    status: "online",
    satisfaction: 90,
    lastFeedback: "Smooth onboarding, happy with results.",
    sentiment: "positive"
  },
  {
    store: "Global Finance Shop",
    storeId: "GFS-003",
    healthStatus: "Warning",
    healthScore: 78,
    trend: "down",
    priority: "Medium",
    revenue: "$87K",
    cwvStatus: "Needs Improvement",
    visitors: "29.3K",
    aiAgents: 2,
    criticalIssues: 3,
    lastSync: "18 min ago",
    status: "warning",
    satisfaction: 68,
    lastFeedback: "Some delays in updates, but overall good.",
    sentiment: "neutral"
  },
  {
    store: "EduTech Store",
    storeId: "ET-004",
    healthStatus: "Healthy",
    healthScore: 88,
    trend: "stable",
    priority: "Medium",
    revenue: "$45K",
    cwvStatus: "Good",
    visitors: "12.8K",
    aiAgents: 2,
    criticalIssues: 1,
    lastSync: "8 min ago",
    status: "online",
    satisfaction: 85,
    lastFeedback: "Helpful insights, would recommend.",
    sentiment: "positive"
  },
  {
    store: "RetailMax Shop",
    storeId: "RM-005",
    healthStatus: "Critical",
    healthScore: 65,
    trend: "down",
    priority: "Low",
    revenue: "$23K",
    cwvStatus: "Poor",
    visitors: "8.1K",
    aiAgents: 1,
    criticalIssues: 7,
    lastSync: "2 hr ago",
    status: "critical",
    satisfaction: 40,
    lastFeedback: "Unhappy with recent results.",
    sentiment: "negative"
  },
]

function getHealthBadgeColor(status: string) {
  switch (status) {
    case "Healthy":
      return "bg-green-500/10 text-green-600 border-green-500/20"
    case "Warning":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    case "Critical":
      return "bg-red-500/10 text-red-600 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}

function getPriorityBadgeColor(priority: string) {
  switch (priority) {
    case "High":
      return "bg-red-500/10 text-red-600 border-red-500/20"
    case "Medium":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    case "Low":
      return "bg-green-500/10 text-green-600 border-green-500/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "online":
      return <CheckCircle className="h-3 w-3 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-3 w-3 text-yellow-500" />
    case "critical":
    case "offline":
      return <AlertTriangle className="h-3 w-3 text-red-500" />
    default:
      return <Activity className="h-3 w-3 text-muted-foreground" />
  }
}

function getSatisfactionIcon(score: number) {
  if (score >= 90) return <Smile className="h-5 w-5 text-green-500" />
  if (score >= 75) return <Meh className="h-5 w-5 text-yellow-500" />
  return <Frown className="h-5 w-5 text-red-500" />
}

function getSentimentIcon(sentiment: StoreData["sentiment"]) {
  if (sentiment === "positive") return <ThumbsUp className="h-4 w-4 text-green-500" />
  if (sentiment === "neutral") return <Meh className="h-4 w-4 text-yellow-500" />
  return <ThumbsDown className="h-4 w-4 text-red-500" />
}

function getCWVPassFail(cwvStatus: StoreData["cwvStatus"]) {
  return cwvStatus === "Good"
    ? <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">Passed</Badge>
    : <Badge variant="outline" className="text-xs bg-red-500/10 text-red-600 border-red-500/20">Failed</Badge>
}

export function StoreMonitoringTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  // Filter logic
  const filteredData = mockStoreData.filter((store) => {
    const matchesSearch = store.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.storeId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || store.healthStatus.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || store.priority.toLowerCase() === priorityFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Satisfaction trend (average health score)
  const avgSatisfaction = Math.round(
    filteredData.reduce((sum, s) => sum + s.satisfaction, 0) / (filteredData.length || 1)
  )

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
          <Smile className="h-5 w-5 text-primary" />
          Client Satisfaction Overview
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Health, Core Web Vitals, traffic, revenue, and satisfaction insights for Shopify clients
        </p>
      </CardHeader>
      <CardContent>
        {/* Sticky Table Header with Filters */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50 mb-2">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center py-2">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]">
                <Shield className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            {/* Satisfaction quick view */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-muted-foreground">Avg. Satisfaction</span>
              {getSatisfactionIcon(avgSatisfaction)}
              <span className="font-bold text-foreground">{avgSatisfaction}%</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 bg-muted/30">
                  <TableHead className="text-muted-foreground font-semibold min-w-[180px]">Store Info</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-center min-w-[120px]">Satisfacción</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-center min-w-[100px]">AI Agents</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-center min-w-[120px]">CWV</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-center min-w-[100px]">Priority</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-center min-w-[200px]">Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((store) => (
                  <TableRow key={store.storeId} className="border-border/50 hover:bg-muted/20 transition-colors">
                    {/* Store Info */}
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground flex items-center gap-2">
                          {getStatusIcon(store.status)}
                          {store.store}
                        </div>
                        <div className="text-xs text-muted-foreground">{store.storeId}</div>
                      </div>
                    </TableCell>
                    {/* Satisfacción */}
                    <TableCell className="text-center py-4">
                      <div className="flex items-center justify-center gap-1">
                        {getSatisfactionIcon(store.satisfaction)}
                        <span className="font-bold">{store.satisfaction}%</span>
                      </div>
                    </TableCell>
                    {/* AI Agents */}
                    <TableCell className="text-center py-4">
                      <span className="text-xl font-bold text-primary">{store.aiAgents}</span>
                    </TableCell>
                    {/* CWV */}
                    <TableCell className="text-center py-4">
                      {getCWVPassFail(store.cwvStatus)}
                    </TableCell>
                    {/* Priority */}
                    <TableCell className="text-center py-4">
                      <Badge variant="outline" className={`text-xs ${getPriorityBadgeColor(store.priority)}`}>
                        {store.priority}
                      </Badge>
                    </TableCell>
                    {/* Feedback */}
                    <TableCell className="text-center py-4">
                      <div className="flex items-center justify-center gap-1">
                        {getSentimentIcon(store.sentiment)}
                        <span className="text-xs text-muted-foreground">{store.lastFeedback}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No stores found matching your filters.
          </div>
        )}
      </CardContent>
    </Card>
  )
}