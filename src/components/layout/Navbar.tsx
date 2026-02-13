import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/button'
import { Menu, X, User, Search, Globe, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

export function Navbar() {
  const { user, login, logout, isAuthenticated } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lang, setLang] = useState('FR')

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">X</div>
            <span className="text-xl font-heading font-bold text-foreground">Xamfi</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">Explorer</Link>
            <span className="text-sm font-medium text-muted-foreground/50 cursor-not-allowed">Destinations</span>
            <span className="text-sm font-medium text-muted-foreground/50 cursor-not-allowed">Guides</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                <Globe className="h-4 w-4" />
                {lang}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onClick={() => setLang('FR')}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang('EN')}>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" className="hidden md:flex gap-2">
                  <User className="h-4 w-4" />
                  Tableau de bord
                </Button>
              </Link>
              <Button variant="ghost" onClick={() => logout()} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                Déconnexion
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="hidden md:flex">
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button>
                  S'inscrire
                </Button>
              </Link>
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4 animate-fade-in">
          <Link to="/marketplace" className="text-lg font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>Explorer</Link>
          <span className="text-lg font-medium py-2 border-b text-muted-foreground/50 cursor-not-allowed">Destinations</span>
          <span className="text-lg font-medium py-2 border-b text-muted-foreground/50 cursor-not-allowed">Guides</span>
          {isAuthenticated ? (
            <Link to="/dashboard" className="text-lg font-medium py-2 border-b" onClick={() => setIsMenuOpen(false)}>Tableau de bord</Link>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Connexion</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Inscription</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
} 