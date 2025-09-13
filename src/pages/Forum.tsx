import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Navbar } from "@/components/navbar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Heart, 
  MessageCircle, 
  Flag, 
  Plus, 
  Clock, 
  TrendingUp,
  Users,
  Search,
  Filter
} from "lucide-react"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    isAnonymous: boolean
  }
  timestamp: Date
  likes: number
  comments: number
  tags: string[]
  isLiked: boolean
}

interface Comment {
  id: string
  content: string
  author: {
    name: string
    avatar: string
    isAnonymous: boolean
  }
  timestamp: Date
  likes: number
  isLiked: boolean
}

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Feeling overwhelmed with final exams",
      content: "I'm in my final year and the pressure is getting to me. Has anyone else experienced this? How did you cope?",
      author: {
        name: "Anonymous",
        avatar: "/api/placeholder/40/40",
        isAnonymous: true
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      comments: 8,
      tags: ["anxiety", "exams", "support"],
      isLiked: false
    },
    {
      id: "2",
      title: "Study tips that helped me manage stress",
      content: "I wanted to share some techniques that really helped me during my toughest semester. The Pomodoro technique and regular breaks made a huge difference...",
      author: {
        name: "Sarah M.",
        avatar: "/api/placeholder/40/40",
        isAnonymous: false
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 45,
      comments: 12,
      tags: ["tips", "study", "wellness"],
      isLiked: true
    },
    {
      id: "3",
      title: "Anyone else struggling with social anxiety?",
      content: "I find it really hard to participate in group discussions and make friends. It's affecting my college experience...",
      author: {
        name: "Anonymous",
        avatar: "/api/placeholder/40/40",
        isAnonymous: true
      },
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      likes: 18,
      comments: 15,
      tags: ["anxiety", "social", "support"],
      isLiked: false
    }
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: "", anonymous: false })

  const popularTags = [
    "anxiety", "depression", "stress", "exams", "social", "wellness", 
    "tips", "support", "sleep", "relationships", "academic"
  ]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag)
    
    return matchesSearch && matchesTag
  })

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ))
  }

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post: Post = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        author: {
          name: newPost.anonymous ? "Anonymous" : "You",
          avatar: "/api/placeholder/40/40",
          isAnonymous: newPost.anonymous
        },
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        tags: newPost.tags.split(",").map(tag => tag.trim()).filter(Boolean),
        isLiked: false
      }
      
      setPosts([post, ...posts])
      setNewPost({ title: "", content: "", tags: "", anonymous: false })
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
                <h1 className="text-2xl font-bold">Peer Support Forum</h1>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="wellness-gradient hover-glow">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-0 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Share Your Experience</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="glass-card border-0"
                    />
                    <Textarea
                      placeholder="Share your thoughts, experiences, or ask for support..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="glass-card border-0 min-h-32"
                    />
                    <Input
                      placeholder="Tags (comma separated): anxiety, support, tips..."
                      value={newPost.tags}
                      onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                      className="glass-card border-0"
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={newPost.anonymous}
                        onChange={(e) => setNewPost({...newPost, anonymous: e.target.checked})}
                        className="rounded"
                      />
                      <label htmlFor="anonymous" className="text-sm">Post anonymously</label>
                    </div>
                    <Button 
                      onClick={handleCreatePost}
                      className="w-full wellness-gradient hover-glow"
                      disabled={!newPost.title || !newPost.content}
                    >
                      Share Post
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="p-6 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Community Stats */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Community</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-wellness-primary" />
                        <span className="text-sm">Active Members</span>
                      </div>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 text-wellness-secondary" />
                        <span className="text-sm">Posts Today</span>
                      </div>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-wellness-success" />
                        <span className="text-sm">Helpful Responses</span>
                      </div>
                      <span className="font-semibold">156</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={selectedTag === "all" ? "default" : "secondary"}
                        className={`cursor-pointer hover-glow ${
                          selectedTag === "all" ? "wellness-gradient" : ""
                        }`}
                        onClick={() => setSelectedTag("all")}
                      >
                        All
                      </Badge>
                      {popularTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTag === tag ? "default" : "secondary"}
                          className={`cursor-pointer hover-glow ${
                            selectedTag === tag ? "wellness-gradient" : ""
                          }`}
                          onClick={() => setSelectedTag(tag)}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Guidelines */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Community Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2 text-muted-foreground">
                    <p>• Be respectful and supportive</p>
                    <p>• No judgment or discrimination</p>
                    <p>• Protect privacy and anonymity</p>
                    <p>• Report inappropriate content</p>
                    <p>• Seek professional help for crises</p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Search and Filter */}
                <Card className="glass-card border-0">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search posts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 glass-card border-0"
                        />
                      </div>
                      <Button variant="outline" className="glass-button">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="glass-card hover-glow border-0">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>
                              {post.author.isAnonymous ? "A" : post.author.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium">
                                {post.author.isAnonymous ? "Anonymous" : post.author.name}
                              </span>
                              <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                                <Clock className="h-3 w-3" />
                                <span>{getTimeAgo(post.timestamp)}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{post.content}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`hover-glow ${post.isLiked ? 'text-wellness-primary' : ''}`}
                                  onClick={() => handleLike(post.id)}
                                >
                                  <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                                  {post.likes}
                                </Button>
                                
                                <Button variant="ghost" size="sm" className="hover-glow">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  {post.comments}
                                </Button>
                              </div>
                              
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                                <Flag className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center">
                  <Button variant="outline" className="glass-button">
                    Load More Posts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </SidebarProvider>
    </div>
  )
}