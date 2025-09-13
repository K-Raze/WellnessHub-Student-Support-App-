import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Navbar } from "@/components/navbar"
import { useState } from "react"
import { 
  Smile, 
  Meh, 
  Frown, 
  MessageCircle, 
  Calendar, 
  BookOpen,
  TrendingUp,
  Clock,
  Heart,
  Sparkles
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [moodMessage, setMoodMessage] = useState<string>("")

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    
    switch (mood) {
      case "great":
        setMoodMessage("🌟 That's wonderful! Your positive energy is inspiring. Keep nurturing this momentum with activities that bring you joy.")
        break
      case "okay":
        setMoodMessage("💙 Thank you for checking in. Some days are gentle reminders to take things one step at a time. You're doing great.")
        break
      case "struggling":
        setMoodMessage("🤗 It takes courage to acknowledge difficult feelings. Remember, you're not alone. Our community and support tools are here for you.")
        break
      default:
        setMoodMessage("")
    }
  }
  const moodOptions = [
    { icon: Smile, label: "Great", color: "text-wellness-success", bg: "bg-wellness-success/20" },
    { icon: Meh, label: "Okay", color: "text-wellness-warning", bg: "bg-wellness-warning/20" },
    { icon: Frown, label: "Struggling", color: "text-wellness-primary", bg: "bg-wellness-primary/20" },
  ]

  const quickActions = [
    {
      title: "Chat with AI Support",
      description: "Get instant help from our mental health chatbot",
      icon: MessageCircle,
      href: "/chatbot",
      color: "bg-wellness-primary/20 text-wellness-primary"
    },
    {
      title: "Book Counseling Session",
      description: "Schedule time with a professional counselor",
      icon: Calendar,
      href: "/booking",
      color: "bg-wellness-secondary/20 text-wellness-secondary"
    },
    {
      title: "Peer Forum",
      description: "Stay hidden, but never alone — peer support.",
      icon: BookOpen,
      href: "/forum",
      color: "bg-wellness-calm/20 text-wellness-calm"
    }
  ]

  return (
    <div className="min-h-screen bg-background theme-transition">
      <Navbar />
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background theme-transition">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/40 z-40">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Welcome Section */}
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-primary p-3 rounded-2xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Welcome back!</h2>
                  <p className="text-muted-foreground text-lg">How are you feeling today?</p>
                </div>
              </div>

              {/* Mood Check-in */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {moodOptions.map((mood, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`glass-card hover-glow h-24 flex-col space-y-2 ${mood.bg} border-0`}
                    onClick={() => handleMoodSelect(mood.label.toLowerCase())}
                  >
                    <mood.icon className={`h-8 w-8 ${mood.color}`} />
                    <span className="font-medium">{mood.label}</span>
                  </Button>
                ))}
              </div>

              {/* Show healthy message if a mood is selected */}
              {selectedMood && (
                <div className="mt-4 p-4 rounded-xl bg-muted/40 text-lg font-medium">
                  {moodMessage}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Card className="glass-card hover-glow cursor-pointer border-0 h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center mb-4`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                      <p className="text-muted-foreground text-sm">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Stats and Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Chat Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-wellness-primary" />
                    <span className="text-2xl font-bold">12</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Counseling Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-wellness-secondary" />
                    <span className="text-2xl font-bold">4.5</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Total hours</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Resources Viewed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-wellness-calm" />
                    <span className="text-2xl font-bold">28</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">This week</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Wellness Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-wellness-success" />
                    <span className="text-2xl font-bold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-muted/20">
                    <div className="bg-wellness-primary/20 p-2 rounded-lg">
                      <MessageCircle className="h-4 w-4 text-wellness-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Completed chat session about exam anxiety</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-muted/20">
                    <div className="bg-wellness-secondary/20 p-2 rounded-lg">
                      <BookOpen className="h-4 w-4 text-wellness-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Helped 5 people through Forum</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-muted/20">
                    <div className="bg-wellness-calm/20 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-wellness-calm" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Booked counseling session for next week</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        </div>
      </SidebarProvider>
    </div>
  )
}