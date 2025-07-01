import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AttendanceProgressProps {
  attendance: number
  totalGames: number
  showPercentage?: boolean
  size?: "sm" | "default" | "lg"
}

export function AttendanceProgress({ 
  attendance, 
  totalGames, 
  showPercentage = true, 
  size = "default" 
}: AttendanceProgressProps) {
  const percentage = totalGames > 0 ? Math.round((attendance / totalGames) * 100) : 0

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "h-2 text-xs"
      case "lg":
        return "h-4 text-base"
      default:
        return "h-3 text-sm"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <span className={`font-medium ${getSizeClasses(size)}`}>
                출석률
              </span>
              {showPercentage && (
                <span className={`font-bold ${getSizeClasses(size)}`}>
                  {percentage}%
                </span>
              )}
            </div>
            <Progress 
              value={percentage} 
              className={`${getSizeClasses(size)}`}
            />
            <div className="flex justify-between mt-1">
              <span className={`text-xs opacity-70 ${getSizeClasses(size)}`}>
                {attendance}회 출석
              </span>
              <span className={`text-xs opacity-70 ${getSizeClasses(size)}`}>
                총 {totalGames}경기
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>출석률: {attendance}/{totalGames} ({percentage}%)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 