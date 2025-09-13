import { Navbar } from "@/components/navbar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AlertTriangle, CheckCircle, XCircle, Flag, MessageCircle, User, Calendar } from "lucide-react"

export default function ForumModeration() {
  const flaggedPosts = [
    {
      id: 1,
      title: "Struggling with anxiety attacks",
      author: "Anonymous User",
      content: "I've been having panic attacks lately and don't know what to do...",
      flagReason: "Inappropriate content",
      flaggedBy: "User123",
      date: "2024-01-15",
      priority: "high",
      replies: 12
    },
    {
      id: 2,
      title: "Need help with depression",
      author: "Student_2024",
      content: "I've been feeling really down lately and could use some support...",
      flagReason: "Potential self-harm",
      flaggedBy: "Moderator",
      date: "2024-01-14",
      priority: "critical",
      replies: 8
    },
    {
      id: 3,
      title: "Study stress is overwhelming",
      author: "FinalYearStudent",
      content: "The pressure from exams is making me feel hopeless...",
      flagReason: "Spam/Off-topic",
      flaggedBy: "User456",
      date: "2024-01-13",
      priority: "medium",
      replies: 5
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive"
      case "high": return "warning"
      case "medium": return "secondary"
      default: return "default"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical": return <AlertTriangle className="h-4 w-4" />
      case "high": return <Flag className="h-4 w-4" />
      case "medium": return <MessageCircle className="h-4 w-4" />
      default: return <MessageCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background theme-transition">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6">
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">Forum Moderation</h1>
                    <p className="text-muted-foreground mt-2">
                      Review and moderate flagged posts to ensure a safe community environment
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="glass-button">
                      {flaggedPosts.length} Pending Reviews
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="glass-card border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-destructive/20 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Critical</p>
                          <p className="text-xl font-bold">1</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                          <Flag className="h-4 w-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">High Priority</p>
                          <p className="text-xl font-bold">1</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-yellow-500/20 rounded-lg">
                          <MessageCircle className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Medium Priority</p>
                          <p className="text-xl font-bold">1</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Resolved Today</p>
                          <p className="text-xl font-bold">7</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Flagged Posts List */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Flagged Posts Requiring Review</h2>
                  
                  {flaggedPosts.map((post) => (
                    <Card key={post.id} className="glass-card border-0 hover-glow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge 
                                variant={getPriorityColor(post.priority) as any}
                                className="flex items-center space-x-1"
                              >
                                {getPriorityIcon(post.priority)}
                                <span className="capitalize">{post.priority}</span>
                              </Badge>
                              <Badge variant="outline" className="glass-button">
                                <Flag className="h-3 w-3 mr-1" />
                                {post.flagReason}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{post.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {/* Post Content */}
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <p className="text-sm leading-relaxed">{post.content}</p>
                          </div>
                          
                          {/* Post Meta Information */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>By {post.author}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{post.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{post.replies} replies</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p>Flagged by: <span className="font-medium">{post.flaggedBy}</span></p>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-2">
                            <Button variant="outline" size="sm" className="glass-button">
                              View Full Thread
                            </Button>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}