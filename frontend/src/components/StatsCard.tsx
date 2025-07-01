import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trophy, TrendingUp } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  badge 
}: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <div className="text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {subtitle && (
              <div className="text-sm text-muted-foreground mt-1">
                {subtitle}
              </div>
            )}
          </div>
          {badge && (
            <Badge variant={badge.variant || "secondary"}>
              {badge.text}
            </Badge>
          )}
        </div>
        
        {trend && (
          <>
            <Separator className="my-3" />
            <div className="flex items-center space-x-2">
              <TrendingUp 
                className={`w-4 h-4 ${
                  trend.isPositive ? "text-green-500" : "text-red-500"
                }`} 
              />
              <span className={`text-sm font-medium ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-sm text-muted-foreground">
                지난 달 대비
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// 팀 통계를 위한 특화된 컴포넌트들
export function TeamStatsCard({ 
  totalMembers, 
  totalGames, 
  averageAttendance 
}: {
  totalMembers: number
  totalGames: number
  averageAttendance: number
}) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-blue-900 flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          팀 통계
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{totalMembers}</div>
            <div className="text-sm text-blue-700">팀원</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{totalGames}</div>
            <div className="text-sm text-blue-700">경기</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{averageAttendance}%</div>
            <div className="text-sm text-blue-700">평균 출석률</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 