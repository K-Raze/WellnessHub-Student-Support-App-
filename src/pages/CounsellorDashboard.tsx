import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
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
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  VideoIcon, 
  Upload,
  FileText,
  Plus,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react"

interface Appointment {
  id: string
  studentName: string
  studentAvatar: string
  date: Date
  time: string
  duration: number
  type: 'video' | 'audio' | 'chat'
  status: 'scheduled' | 'completed' | 'cancelled'
  notes: string
  concern: string
}

interface Resource {
  id: string
  title: string
  description: string
  type: 'video' | 'audio' | 'document'
  uploadDate: Date
  downloads: number
}

export default function CounsellorDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      studentName: "Anonymous Student",
      studentAvatar: "/api/placeholder/40/40",
      date: new Date(),
      time: "10:00 AM",
      duration: 50,
      type: 'video',
      status: 'scheduled',
      notes: "",
      concern: "Academic stress and anxiety"
    },
    {
      id: "2",
      studentName: "Sarah M.",
      studentAvatar: "/api/placeholder/40/40",
      date: new Date(),
      time: "02:00 PM",
      duration: 50,
      type: 'video',
      status: 'scheduled',
      notes: "",
      concern: "Social anxiety and relationship issues"
    },
    {
      id: "3",
      studentName: "Anonymous Student",
      studentAvatar: "/api/placeholder/40/40",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      time: "11:00 AM",
      duration: 50,
      type: 'video',
      status: 'completed',
      notes: "Student showed improvement in coping strategies. Recommended daily mindfulness practice.",
      concern: "Depression and sleep issues"
    }
  ])

  const [resources] = useState<Resource[]>([
    {
      id: "1",
      title: "Cognitive Behavioral Therapy Techniques",
      description: "Comprehensive guide for CBT interventions",
      type: 'document',
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      downloads: 45
    },
    {
      id: "2",
      title: "Mindfulness Meditation Audio Guide",
      description: "10-minute guided meditation for anxiety relief",
      type: 'audio',
      uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      downloads: 78
    }
  ])

  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "document" as const,
    file: null as File | null
  })

  const todayAppointments = appointments.filter(apt => {
    const today = new Date()
    return apt.date.toDateString() === today.toDateString()
  })

  const upcomingAppointments = appointments.filter(apt => {
    const today = new Date()
    return apt.date > today && apt.status === 'scheduled'
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-wellness-calm/20 text-wellness-calm'
      case 'completed':
        return 'bg-wellness-success/20 text-wellness-success'
      case 'cancelled':
        return 'bg-destructive/20 text-destructive'
      default:
        return 'bg-muted/20 text-muted-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <VideoIcon className="h-4 w-4" />
      case 'audio':
        return <Clock className="h-4 w-4" />
      case 'chat':
        return <User className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleResourceUpload = () => {
    if (newResource.title && newResource.description) {
      // Handle file upload logic here
      console.log("Uploading resource:", newResource)
      setNewResource({ title: "", description: "", type: "document", file: null })
    }
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
                  <h1 className="text-2xl font-bold">Counsellor Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, Dr. Johnson</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-wellness-primary/20 p-3 rounded-xl">
                      <CalendarIcon className="h-6 w-6 text-wellness-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{todayAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Today's Sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-wellness-secondary/20 p-3 rounded-xl">
                      <User className="h-6 w-6 text-wellness-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Active Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-wellness-success/20 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-wellness-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-sm text-muted-foreground">Session Completion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-wellness-calm/20 p-3 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-wellness-calm" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.9</p>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar & Today's Appointments */}
              <div className="lg:col-span-2 space-y-6">
                {/* Today's Schedule */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todayAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center space-x-4 p-4 rounded-xl bg-muted/20 hover-glow">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={appointment.studentAvatar} alt={appointment.studentName} />
                            <AvatarFallback>{appointment.studentName[0]}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{appointment.studentName}</h4>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{appointment.concern}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {getTypeIcon(appointment.type)}
                                <span className="capitalize">{appointment.type}</span>
                              </div>
                              <span>{appointment.duration} min</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            {appointment.status === 'scheduled' && (
                              <>
                                <Button size="sm" className="wellness-gradient hover-glow">
                                  <VideoIcon className="h-4 w-4 mr-1" />
                                  Join
                                </Button>
                                <Button size="sm" variant="outline" className="glass-button">
                                  Reschedule
                                </Button>
                              </>
                            )}
                            {appointment.status === 'completed' && (
                              <Button size="sm" variant="outline" className="glass-button">
                                View Notes
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {todayAppointments.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No appointments scheduled for today</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/10">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={appointment.studentAvatar} alt={appointment.studentName} />
                              <AvatarFallback>{appointment.studentName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{appointment.studentName}</p>
                              <p className="text-xs text-muted-foreground">
                                {appointment.date.toLocaleDateString()} at {appointment.time}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {appointment.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Calendar & Resources */}
              <div className="space-y-6">
                {/* Calendar */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-xl border-0"
                    />
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full wellness-gradient hover-glow justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Block Time Slot
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full glass-button justify-start">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Resource
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card border-0">
                        <DialogHeader>
                          <DialogTitle>Upload New Resource</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Resource title..."
                            value={newResource.title}
                            onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                            className="glass-card border-0"
                          />
                          <Textarea
                            placeholder="Description..."
                            value={newResource.description}
                            onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                            className="glass-card border-0"
                          />
                          <select
                            value={newResource.type}
                            onChange={(e) => setNewResource({...newResource, type: e.target.value as any})}
                            className="w-full px-4 py-2 rounded-xl bg-white/30 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10"
                          >
                            <option value="document">Document</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                          </select>
                          <div className="border-2 border-dashed border-border/40 rounded-xl p-8 text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                          </div>
                          <Button onClick={handleResourceUpload} className="w-full wellness-gradient hover-glow">
                            Upload Resource
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="w-full glass-button justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Session Notes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Resources Section */}
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>My Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources.map((resource) => (
                    <div key={resource.id} className="p-4 rounded-xl bg-muted/20 hover-glow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{resource.title}</h4>
                        <Badge variant="secondary" className="capitalize text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{resource.downloads} downloads</span>
                        <span>{resource.uploadDate.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
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