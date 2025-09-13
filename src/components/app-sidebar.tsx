import { useState } from "react"
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users,
  BarChart3,
  Settings,
  Heart,
  Home,
  LogIn,
  UserPlus,
  Moon,
  Sun
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import { useTheme } from "@/components/theme-provider" // Assuming you have a theme provider

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

          <SidebarGroup className="pb-4">
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
        </div>
      </SidebarContent>
    </Sidebar>
  )
}