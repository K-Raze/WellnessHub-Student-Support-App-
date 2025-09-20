import { PhoneCall, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isCollapsed?: boolean
}

export function SOSButton({ className, isCollapsed, ...props }: SOSButtonProps) {
  const handleCallHelpline = () => {
    // This will attempt to open the phone app on mobile devices.
    window.location.href = "tel:988"
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className={cn(
            "h-14 w-full animate-pulse-sos rounded-2xl text-lg font-bold shadow-lg shadow-red-500/50",
            "flex items-center justify-center gap-2",
            isCollapsed && "w-14",
            className
          )}
          {...props}
        >
          <PhoneCall className={cn("h-6 w-6", !isCollapsed && "mr-2")} />
          {!isCollapsed && <span>SOS Emergency</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-2xl text-destructive">
            <AlertTriangle className="h-8 w-8" />
            Emergency Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2 text-base text-foreground/80">
            You are about to contact the National Crisis and Suicide Lifeline. If you are in immediate danger, please call your local emergency number.
            <br /><br />
            <strong>Helpline: 988</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCallHelpline}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            Call Helpline
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}