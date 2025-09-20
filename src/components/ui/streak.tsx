import { Flame } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./button"

interface StreakPopupProps {
  streakCount: number
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const getMotivationalMessage = (streak: number) => {
  if (streak < 3) {
    return "Great start! Every step forward is a victory."
  }
  if (streak < 7) {
    return "You're building a healthy habit. Keep the momentum going!"
  }
  if (streak < 30) {
    return "Amazing consistency! You're making mental wellness a priority."
  }
  return "Incredible dedication! You are an inspiration."
}

export function StreakPopup({ streakCount, isOpen, onOpenChange }: StreakPopupProps) {
  const message = getMotivationalMessage(streakCount)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Your Wellness Streak</DialogTitle>
          <DialogDescription>
            Consistency is key to a healthier mind.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <Flame className="absolute h-full w-full text-orange-400" />
            <span className="z-10 text-7xl font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {streakCount}
            </span>
          </div>
          <p className="text-lg font-semibold text-orange-500">Days in a Row!</p>
          <p className="mt-2 text-muted-foreground">{message}</p>
        </div>
        <Button onClick={() => onOpenChange(false)} className="w-full">
          Keep Going
        </Button>
      </DialogContent>
    </Dialog>
  )
}