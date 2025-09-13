import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Heart, Menu, UserPlus, LogIn } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  
  // Only show navbar on landing page
  if (location.pathname !== "/") {
    return null
  }
  
  const isActive = (path: string) => location.pathname === path

  const NavLinks = () => (
    <>
      <Link
        to="/dashboard"
        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
          isActive("/dashboard")
            ? "bg-primary text-primary-foreground shadow-wellness"
            : "hover:bg-white/20 dark:hover:bg-white/10"
        }`}
      >
        Dashboard
      </Link>
      <Link
        to="/chatbot"
        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
          isActive("/chatbot")
            ? "bg-primary text-primary-foreground shadow-wellness"
            : "hover:bg-white/20 dark:hover:bg-white/10"
        }`}
      >
        Chat Support
      </Link>
      <Link
        to="/forum"
        className={`px-4 py-2 rounded-xl transition-all duration-300 ${
          isActive("/forum")
            ? "bg-primary text-primary-foreground shadow-wellness"
            : "hover:bg-white/20 dark:hover:bg-white/10"
        }`}
      >
        Forum
      </Link>
    </>
  )

  return (
    <nav className="glass-card sticky top-4 mx-4 z-50 theme-transition">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-glow">
            <div className="bg-gradient-primary p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              WellnessHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLinks />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />
            
            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="glass-button hover-glow">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost" size="sm" className="glass-button hover-glow">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
            </div>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="icon" className="glass-button">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-0 w-[280px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="space-y-2" onClick={() => setIsOpen(false)}>
                    <div className="flex flex-col space-y-2">
                      <Link
                        to="/dashboard"
                        className="px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 text-left"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/chatbot"
                        className="px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 text-left"
                      >
                        Chat Support
                      </Link>
                      <Link
                        to="/forum"
                        className="px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 text-left"
                      >
                        Forum
                      </Link>
                    </div>
                  </div>
                  <hr className="border-border/30" />
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full glass-button justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full glass-button justify-start">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}