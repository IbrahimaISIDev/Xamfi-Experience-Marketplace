import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">X</div>
              <span className="text-xl font-heading font-bold text-white">Xamfi</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connectez-vous avec l'Afrique authentique. Découvrez des guides locaux et des propriétaires de bateaux pour des expériences inoubliables.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4">Plateforme</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link to="/marketplace" className="hover:text-primary">Explorer les activités</Link></li>
              <li><span className="text-muted-foreground/50 cursor-not-allowed">Destinations populaires</span></li>
              <li><span className="text-muted-foreground/50 cursor-not-allowed">Nos guides locaux</span></li>
              <li><Link to="/boat-owners" className="hover:text-primary">Propriétaires de bateaux</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4">Informations</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">À propos de nous</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog de voyage</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Conditions d'utilisation</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Politique de confidentialité</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Dakar, Sénégal</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +221 33 000 00 00</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@xamfi.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Xamfi.com. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
} 
