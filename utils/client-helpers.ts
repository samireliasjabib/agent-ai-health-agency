import { ArrowUp, ArrowDown } from "lucide-react"

export function getHealthScoreColor(score: number): string {
  if (score >= 9) return "text-emerald-700 bg-emerald-50 border border-emerald-200"
  if (score >= 7) return "text-green-700 bg-green-50 border border-green-200"
  if (score >= 5) return "text-amber-700 bg-amber-50 border border-amber-200"
  if (score >= 3) return "text-orange-700 bg-orange-50 border border-orange-200"
  return "text-red-700 bg-red-50 border border-red-200"
}

export function getStatusDot(status: string): string {
  switch (status) {
    case "healthy":
      return "w-2 h-2 bg-green-500 rounded-full"
    case "monitoring":
      return "w-2 h-2 bg-yellow-500 rounded-full"
    case "critical":
      return "w-2 h-2 bg-red-500 rounded-full animate-pulse"
    case "inactive":
      return "w-2 h-2 bg-gray-400 rounded-full"
    default:
      return "w-2 h-2 bg-gray-400 rounded-full"
  }
}

export function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <ArrowUp className="w-3 h-3 text-green-600" />
    case "down":
      return <ArrowDown className="w-3 h-3 text-red-600" />
    case "stable":
      return <span className="w-3 h-3 text-gray-400">→</span>
    default:
      return null
  }
}

export function getLastCallColor(date: Date): string {
  const daysDiff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (daysDiff > 7) return "text-red-600 font-medium"
  if (daysDiff > 3) return "text-orange-600"
  return "text-gray-600"
}

export function isOverdue(date: Date): boolean {
  const daysDiff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff > 7
}

export function getRiskBadgeVariant(risk: string): string {
  switch (risk) {
    case "Low":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getSentimentIcon(sentiment: string): string {
  switch (sentiment) {
    case "positive":
      return "😊"
    case "neutral":
      return "😐"
    case "negative":
      return "😞"
    default:
      return "😐"
  }
}
