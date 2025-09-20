import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Users, MessageCircle, Calendar, BookOpen } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SOSButton } from "@/components/sos"

export default function Landing() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chat Support",
      description: "24/7 confidential support with our intelligent chatbot trained on mental health resources"
    },
    {
      icon: Calendar,
      title: "Professional Counseling",
      description: "Book sessions with certified counselors who understand student challenges"
    },
    {
      icon: BookOpen,
      title: "Wellness Content",
      description: "Access curated mental health content and educational materials"
    },
    {
      icon: Users,
      title: "Peer Support",
      description: "Connect with fellow students in a safe, moderated community forum"
    },
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "Your mental health journey is private and secure with end-to-end encryption"
    },
    {
      icon: Heart,
      title: "Stigma-Free Zone",
      description: "A judgment-free space designed specifically for student mental wellness"
    }
  ]

  return (
    <div className="min-h-screen bg-background theme-transition">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Your Safe Space for
                <span className="block bg-gradient-to-r from-white to-wellness-accent bg-clip-text text-transparent">
                  Mental Wellness
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                A comprehensive digital platform designed to support student mental health with 
                AI-powered assistance, professional counseling, and peer community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <Link to="/dashboard">
                  <Button size="lg" className="wellness-gradient hover-glow text-lg px-8 py-4 rounded-2xl">
                    Get Started Free
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-8 text-white/80 text-sm mt-8">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Student-Focused</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Peer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Why Choose WellnessHub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges students face and provide comprehensive support tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover-glow group cursor-pointer border-0">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-primary p-3 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <SOSButton className="fixed bottom-8 right-8 z-50" /> */}
    </div>
  )
}