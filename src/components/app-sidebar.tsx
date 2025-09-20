import { useState } from "react"
import { 
  BarChart3,
  Calendar,
  MessageCircle,
  Users,
  Settings,
  Heart,
  Home,
  LogIn,
  UserPlus,
  Moon,
  Sun,
  Flame,
  PhoneCall,
  AlertTriangle
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import { useTheme } from "@/components/theme-provider"
import { StreakPopup } from "@/components/ui/streak"

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
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

const studentItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "AI Chat Support", url: "/chatbot", icon: MessageCircle },
  { title: "Book Session", url: "/booking", icon: Calendar },
  { title: "Peer Forum", url: "/forum", icon: Users },
]

const counsellorItems = [
  { title: "Appointments", url: "/counsellor", icon: Calendar },
]

const adminItems = [
  { title: "Analytics", url: "/admin", icon: BarChart3 },
  { title: "Forum Moderation", url: "/admin/forum", icon: Users },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavClass = (path: string) =>
    isActive(path) 
      ? "bg-primary text-primary-foreground shadow-wellness" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  const { theme, setTheme } = useTheme()
  const [isStreakOpen, setIsStreakOpen] = useState(false)
  const streakCount = 7 // This would come from your app's state or API

  const handleCallHelpline = () => {
    window.location.href = "tel:988"
  }

  return (
    <Sidebar className="theme-transition border-r-0">
      <SidebarHeader className="p-4">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-primary p-2 rounded-xl">
            <Heart className="h-5 w-5 text-white" />
          </div>
          {state !== "collapsed" && (
            <span className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
              WellnessHub
            </span>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2 flex flex-col justify-between h-[calc(100%-72px)]">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>Student Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {studentItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Counsellor</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {counsellorItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setIsStreakOpen(true)}
                    className="hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  >
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span>Streak</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  >
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span>Toggle Theme</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/login" className={getNavClass("/login")}>
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/register" className={getNavClass("/register")}>
                      <UserPlus className="h-5 w-5" />
                      <span>Register</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="pb-4">
            <SidebarGroupContent>
              <SidebarMenu>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="text-destructive hover:bg-destructive/10 hover:text-destructive font-medium">
                        <PhoneCall className="h-5 w-5" />
                        <span>SOS Emergency</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
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
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      <StreakPopup
        streakCount={streakCount}
        isOpen={isStreakOpen}
        onOpenChange={setIsStreakOpen}
      />
    </Sidebar>
  )
}