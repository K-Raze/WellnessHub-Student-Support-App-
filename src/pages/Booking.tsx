import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Navbar } from "@/components/navbar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, MapPin, Star, Calendar as CalendarIcon, User } from "lucide-react"

interface Counselor {
  id: string
  name: string
  specialization: string
  rating: number
  experience: string
  avatar: string
  available: boolean
}

interface TimeSlot {
  time: string
  available: boolean
}

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")

  const counselors: Counselor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Anxiety & Depression",
      rating: 4.9,
      experience: "8 years",
      avatar: "/api/placeholder/64/64",
      available: true
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Academic Stress",
      rating: 4.8,
      experience: "6 years",
      avatar: "/api/placeholder/64/64",
      available: true
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialization: "Relationship Issues",
      rating: 4.9,
      experience: "10 years",
      avatar: "/api/placeholder/64/64",
      available: false
    }
  ]

  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true },
    { time: "10:30 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:30 PM", available: false },
    { time: "05:00 PM", available: true }
  ]

  const handleBooking = () => {
    if (selectedCounselor && selectedDate && selectedTime) {
      // Handle booking logic here
      console.log("Booking confirmed:", {
        counselor: selectedCounselor,
        date: selectedDate,
        time: selectedTime
      })
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
                <h1 className="text-2xl font-bold">Book a Session</h1>
              </div>
            </div>
          </div>

          <div className="p-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar Section */}
              <div className="lg:col-span-1">
                <Card className="glass-card border-0 sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5" />
                      <span>Select Date</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-xl border-0"
                      disabled={(date) => date < new Date()}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Counselors and Time Slots */}
              <div className="lg:col-span-2 space-y-6">
                {/* Available Counselors */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle>Available Counselors</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Choose a counselor that specializes in your area of concern
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {counselors.map((counselor) => (
                        <div
                          key={counselor.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover-glow ${
                            selectedCounselor?.id === counselor.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border/40 hover:border-primary/50'
                          } ${!counselor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => counselor.available && setSelectedCounselor(counselor)}
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={counselor.avatar} alt={counselor.name} />
                              <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-lg">{counselor.name}</h3>
                                {!counselor.available && (
                                  <Badge variant="secondary">Unavailable</Badge>
                                )}
                              </div>
                              
                              <p className="text-muted-foreground mb-2">{counselor.specialization}</p>
                              
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{counselor.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <User className="h-4 w-4" />
                                  <span>{counselor.experience} experience</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>Online Session</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Time Slots */}
                {selectedCounselor && (
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Available Times</span>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {timeSlots.map((slot, index) => (
                          <Button
                            key={index}
                            variant={selectedTime === slot.time ? "default" : "outline"}
                            className={`${
                              selectedTime === slot.time 
                                ? 'wellness-gradient' 
                                : 'glass-button'
                            } ${!slot.available ? 'opacity-50 cursor-not-allowed' : 'hover-glow'}`}
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Booking Summary */}
                {selectedCounselor && selectedTime && (
                  <Card className="glass-card border-0">
                    <CardHeader>
                      <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Counselor:</span>
                        <span className="font-medium">{selectedCounselor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">
                          {selectedDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">50 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Session Type:</span>
                        <span className="font-medium">Online Video Call</span>
                      </div>
                      
                      <div className="pt-4 border-t border-border/40">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full wellness-gradient hover-glow text-lg py-6">
                              Confirm Booking
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="glass-card border-0">
                            <DialogHeader>
                              <DialogTitle>Booking Confirmed!</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>Your session has been successfully booked.</p>
                              <div className="bg-muted/20 p-4 rounded-xl">
                                <p className="font-medium">Next Steps:</p>
                                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                                  <li>• You'll receive a confirmation email shortly</li>
                                  <li>• A calendar invite with video link will be sent</li>
                                  <li>• You can reschedule up to 24 hours before</li>
                                </ul>
                              </div>
                              <Button className="w-full wellness-gradient" onClick={handleBooking}>
                                Got it!
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      </SidebarProvider>
    </div>
  )
}