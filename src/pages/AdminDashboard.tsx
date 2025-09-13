import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Navbar } from "@/components/navbar"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  Users, 
  MessageCircle, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Flag,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react"

interface FlaggedPost {
  id: string
  title: string
  author: string
  content: string
  reportCount: number
  severity: 'low' | 'medium' | 'high'
  timestamp: Date
  status: 'pending' | 'approved' | 'removed'
}

export default function AdminDashboard() {
  const analyticsData = [
    { month: 'Jan', users: 145, sessions: 320, stress: 65, anxiety: 78 },
    { month: 'Feb', users: 189, sessions: 445, stress: 72, anxiety: 85 },
    { month: 'Mar', users: 234, sessions: 567, stress: 68, anxiety: 82 },
    { month: 'Apr', users: 298, sessions: 689, stress: 71, anxiety: 89 },
    { month: 'May', users: 356, sessions: 789, stress: 69, anxiety: 86 },
    { month: 'Jun', users: 423, sessions: 891, stress: 75, anxiety: 92 }
  ]

  const wellnessData = [
    { name: 'Anxiety', value: 35, color: '#a78bfa' },
    { name: 'Depression', value: 25, color: '#60a5fa' },
    { name: 'Stress', value: 30, color: '#34d399' },
    { name: 'Other', value: 10, color: '#fbbf24' }
  ]

  const flaggedPosts: FlaggedPost[] = [
    {
      id: "1",
      title: "Feeling completely hopeless about everything",
      author: "Anonymous",
      content: "I don't see the point in anything anymore. Life feels meaningless and I'm considering...",
      reportCount: 3,
      severity: 'high',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: "2", 
      title: "Inappropriate comment about other students",
      author: "StudentUser123",
      content: "These people are just attention seekers and don't deserve help...",
      reportCount: 5,
      severity: 'medium',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: "3",
      title: "Sharing personal contact information",
      author: "HelpfulStudent",
      content: "You can reach me at my personal email and phone number...",
      reportCount: 2,
      severity: 'low',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: 'pending'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive/20 text-destructive'
      case 'medium':
        return 'bg-wellness-warning/20 text-wellness-warning'
      case 'low':
        return 'bg-wellness-calm/20 text-wellness-calm'
      default:
        return 'bg-muted/20 text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-wellness-warning/20 text-wellness-warning'
      case 'approved':
        return 'bg-wellness-success/20 text-wellness-success'
      case 'removed':
        return 'bg-destructive/20 text-destructive'
      default:
        return 'bg-muted/20 text-muted-foreground'
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

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
                <div>
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-muted-foreground">System overview and moderation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-wellness-primary/20 p-3 rounded-xl">
                      <Users className="h-6 w-6 text-wellness-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">1,247</p>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-xs text-wellness-success">↑ 12% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-wellness-secondary/20 p-3 rounded-xl">
                      <MessageCircle className="h-6 w-6 text-wellness-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3,456</p>
                      <p className="text-sm text-muted-foreground">Total Sessions</p>
                      <p className="text-xs text-wellness-success">↑ 8% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-wellness-warning/20 p-3 rounded-xl">
                      <AlertTriangle className="h-6 w-6 text-wellness-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{flaggedPosts.filter(p => p.status === 'pending').length}</p>
                      <p className="text-sm text-muted-foreground">Pending Reports</p>
                      <p className="text-xs text-wellness-warning">Requires attention</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-wellness-success/20 p-3 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-wellness-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">87%</p>
                      <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                      <p className="text-xs text-wellness-success">↑ 3% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="analytics" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="moderation">Content Moderation</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
              </TabsList>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* User Growth Chart */}
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle>User Growth & Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: 'none',
                              borderRadius: '12px',
                              boxShadow: '0 8px 32px hsl(0 0% 0% / 0.1)'
                            }}
                          />
                          <Bar dataKey="users" fill="hsl(var(--wellness-primary))" radius={4} />
                          <Bar dataKey="sessions" fill="hsl(var(--wellness-secondary))" radius={4} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Mental Health Trends */}
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle>Mental Health Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: 'none',
                              borderRadius: '12px',
                              boxShadow: '0 8px 32px hsl(0 0% 0% / 0.1)'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="stress" 
                            stroke="hsl(var(--wellness-warning))" 
                            strokeWidth={3}
                            strokeDasharray="5 5"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="anxiety" 
                            stroke="hsl(var(--wellness-primary))" 
                            strokeWidth={3}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Wellness Categories Distribution */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Support Categories Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-12">
                      <ResponsiveContainer width={300} height={300}>
                        <PieChart>
                          <Pie
                            data={wellnessData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            innerRadius={60}
                            dataKey="value"
                          >
                            {wellnessData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      <div className="space-y-4">
                        {wellnessData.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="font-medium">{item.name}</span>
                            <span className="text-muted-foreground">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Moderation Tab */}
              <TabsContent value="moderation" className="space-y-6">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Flag className="h-5 w-5" />
                      <span>Flagged Content</span>
                      <Badge className="bg-wellness-warning/20 text-wellness-warning">
                        {flaggedPosts.filter(p => p.status === 'pending').length} Pending
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {flaggedPosts.map((post) => (
                        <div key={post.id} className="glass-card p-6 border-0">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold">{post.title}</h4>
                                <Badge className={getSeverityColor(post.severity)}>
                                  {post.severity} risk
                                </Badge>
                                <Badge className={getStatusColor(post.status)}>
                                  {post.status}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-2">
                                By {post.author} • {getTimeAgo(post.timestamp)}
                              </p>
                              
                              <p className="text-sm bg-muted/20 p-3 rounded-xl mb-3">
                                {post.content}
                              </p>
                              
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Flag className="h-3 w-3" />
                                  <span>{post.reportCount} reports</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>Needs review</span>
                                </div>
                              </div>
                            </div>
                            
                            {post.status === 'pending' && (
                              <div className="flex space-x-2 ml-4">
                                <Button size="sm" className="wellness-gradient hover-glow">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="destructive">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                                <Button size="sm" variant="outline" className="glass-button">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* User Management Tab */}
              <TabsContent value="users" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle>User Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Students</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Counsellors</span>
                        <span className="font-semibold">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Admin Users</span>
                        <span className="font-semibold">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Suspended Accounts</span>
                        <span className="font-semibold text-wellness-warning">12</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-wellness-success/20 p-1 rounded-full">
                          <Users className="h-3 w-3 text-wellness-success" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">23 new registrations</p>
                          <p className="text-xs text-muted-foreground">Last 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="bg-wellness-primary/20 p-1 rounded-full">
                          <MessageCircle className="h-3 w-3 text-wellness-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">156 chat sessions</p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="bg-wellness-secondary/20 p-1 rounded-full">
                          <Calendar className="h-3 w-3 text-wellness-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">34 appointments booked</p>
                          <p className="text-xs text-muted-foreground">This week</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Server Status</span>
                        <Badge className="bg-wellness-success/20 text-wellness-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Online
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Database</span>
                        <Badge className="bg-wellness-success/20 text-wellness-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">API Response</span>
                        <span className="font-semibold text-wellness-success">45ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Uptime</span>
                        <span className="font-semibold">99.9%</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      </SidebarProvider>
    </div>
  )
}