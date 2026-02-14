import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Calendar, Clock, MapPin, MessageSquare, Star, Settings, Shield, User, CreditCard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blink } from '../lib/blink'
import { toast } from 'react-hot-toast'

export function Dashboard() {
  const { user, login, isAuthenticated } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditEditForm] = useState({ displayName: '', role: 'traveler' })

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserData()
    }
  }, [isAuthenticated, user])

  const fetchUserData = async () => {
    setLoading(true)
    try {
      // Mock data for testing phase
      const mockProfile = {
        userId: user!.id,
        displayName: user!.email?.split('@')[0] || 'Voyageur',
        role: 'traveler'
      }
      setProfile(mockProfile)
      setEditEditForm({ displayName: mockProfile.displayName, role: mockProfile.role })
      
      // Mock bookings
      const mockBookings = [
        {
          id: '1',
          activityId: '1',
          activityTitle: 'Excursion en pirogue traditionnelle',
          date: '2024-03-15',
          status: 'confirmed',
          totalPrice: 45000
        }
      ]
      setBookings(mockBookings)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      // Mock profile update for testing phase
      console.log('Mock profile update:', {
        userId: user!.id,
        displayName: editForm.displayName,
        role: editForm.role
      })
      setProfile({
        userId: user!.id,
        displayName: editForm.displayName,
        role: editForm.role
      })
      setIsEditing(false)
      toast.success('Profil mis à jour ! (Mode test)')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
      console.error(error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center gap-8">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-heading font-bold">Accès Restreint</h1>
        <p className="text-muted-foreground max-w-md">Connectez-vous pour accéder à votre tableau de bord personnel et gérer vos réservations.</p>
        <Button size="lg" onClick={() => login()} className="rounded-xl px-12">Se connecter</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <Card className="rounded-2xl border-none shadow-md overflow-hidden">
            <div className="bg-primary h-24" />
            <CardContent className="pt-0 -mt-12 flex flex-col items-center text-center gap-4">
              <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-muted">
                {profile?.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                    <User className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-xl">{profile?.displayName || user?.email}</h3>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{profile?.role || 'Voyageur'}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full rounded-xl gap-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Settings className="h-4 w-4" /> {isEditing ? 'Annuler' : 'Modifier le profil'}
              </Button>

              <AnimatePresence>
                {isEditing && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="w-full flex flex-col gap-4 pt-4 border-t overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 text-left">
                      <label className="text-xs font-bold text-muted-foreground">Nom d'affichage</label>
                      <input 
                        className="w-full p-2 border rounded-lg text-sm"
                        value={editForm.displayName}
                        onChange={(e) => setEditEditForm({...editForm, displayName: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2 text-left">
                      <label className="text-xs font-bold text-muted-foreground">Rôle</label>
                      <select 
                        className="w-full p-2 border rounded-lg text-sm"
                        value={editForm.role}
                        onChange={(e) => setEditEditForm({...editForm, role: e.target.value})}
                      >
                        <option value="traveler">Voyageur</option>
                        <option value="guide">Guide</option>
                        <option value="boat_owner">Propriétaire de bateau</option>
                      </select>
                    </div>
                    <Button size="sm" onClick={handleUpdateProfile}>Enregistrer</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <nav className="flex flex-col gap-1">
             {[
               { icon: Star, label: 'Mes Réservations', active: true },
               { icon: MessageSquare, label: 'Messages', badge: 2 },
               { icon: Clock, label: 'Historique', active: false },
               { icon: CreditCard, label: 'Paiements', active: false },
             ].map((item, i) => (
               <button 
                 key={i}
                 className={`flex items-center justify-between p-3 rounded-xl text-sm transition-colors ${item.active ? 'bg-primary text-white' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
               >
                 <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                 </div>
                 {item.badge && <span className="bg-destructive text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.badge}</span>}
               </button>
             ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col gap-8">
          <header>
            <h1 className="text-3xl font-heading font-bold mb-2">Bonjour, {profile?.displayName || 'Voyageur'} !</h1>
            <p className="text-muted-foreground">Voici l'état de vos réservations et activités récentes.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="rounded-2xl border-none shadow-md">
                <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-medium text-muted-foreground">Réservations actives</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="text-3xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</div>
                </CardContent>
             </Card>
             <Card className="rounded-2xl border-none shadow-md">
                <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-medium text-muted-foreground">Messages en attente</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="text-3xl font-bold">2</div>
                </CardContent>
             </Card>
             <Card className="rounded-2xl border-none shadow-md">
                <CardHeader className="pb-2">
                   <CardTitle className="text-sm font-medium text-muted-foreground">Total dépensé</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="text-3xl font-bold">450F CFA</div>
                </CardContent>
             </Card>
          </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Prochaines Activités</h2>
              <Button variant="ghost" size="sm" className="text-primary font-bold">Voir tout</Button>
            </div>

            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="h-32 bg-muted rounded-2xl animate-pulse" />
              ) : bookings.length > 0 ? (
                bookings.map((booking, i) => (
                  <motion.div 
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background border rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-24 w-24 rounded-xl overflow-hidden shrink-0">
                       <img src="https://images.unsplash.com/photo-1735293221044-60ac95fb197f?q=80&w=400" alt="Activity" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                       <h4 className="font-bold text-lg mb-1">Excursion en pirogue traditionnelle</h4>
                       <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Dakar, Sénégal</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> 15 Mars 2026</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 09:00</span>
                       </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-2">
                       <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Confirmé</span>
                       <Button size="sm" variant="ghost" className="text-primary">Détails</Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-muted/50 border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center gap-4">
                   <Calendar className="h-12 w-12 text-muted-foreground" />
                   <h3 className="font-bold">Aucune réservation à venir</h3>
                   <p className="text-muted-foreground text-sm max-w-xs">Vous n'avez pas encore de réservations prévues. Explorez nos expériences pour commencer votre aventure !</p>
                   <Link to="/marketplace">
                      <Button className="rounded-xl px-8">Explorer</Button>
                   </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}