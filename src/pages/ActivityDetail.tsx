import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft, Check, Info, ShieldCheck } from 'lucide-react'
import { blink } from '../lib/blink'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-hot-toast'

interface Activity {
  id: string
  title: string
  description: string
  type: string
  price: number
  duration: string
  location: string
  images: string[]
  rating?: number
  guideId: string
}

export function ActivityDetail() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated, login, user } = useAuth()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState(1)
  const [bookingDate, setBookingDate] = useState('')

  useEffect(() => {
    fetchActivity()
  }, [id])

  const fetchActivity = async () => {
    setLoading(true)
    try {
      if (id) {
        const data = await blink.db.activities.get(id)
        if (data) {
          setActivity({
            ...data,
            images: JSON.parse(data.images || '[]'),
            rating: 4.8 // Mock rating for now
          })
          setLoading(false)
          return
        }
      }
      
      // Mock data for MVP if not in DB
      const mockActivity: Activity = {
        id: id || '1',
        title: 'Excursion en pirogue traditionnelle',
        description: 'Embarquez pour une aventure inoubliable sur les eaux cristallines de Dakar. Nos guides locaux expérimentés vous feront découvrir des paysages époustouflants, des villages de pêcheurs authentiques et des plages secrètes accessibles uniquement par bateau. Cette excursion inclut une dégustation de produits locaux sur une île isolée.\n\nPoints forts :\n- Navigation en pirogue traditionnelle motorisée\n- Guide local francophone et anglophone\n- Arrêt baignade dans des eaux turquoises\n- Dégustation de poissons grillés (optionnel)',
        type: 'Excursion bateau',
        price: 45,
        duration: '4h',
        location: 'Dakar, Sénégal',
        images: [
          'https://images.unsplash.com/photo-1735293221044-60ac95fb197f?q=80&w=1200',
          'https://images.unsplash.com/photo-1711802536786-149a0d0c5879?q=80&w=1200',
          'https://images.unsplash.com/photo-1630510590519-0976dc4cc250?q=80&w=1200'
        ],
        rating: 4.8,
        guideId: 'guide_1'
      }
      setActivity(mockActivity)
    } catch (error) {
      // Fallback to mock data when DB is unavailable or user is unauthenticated
      const mockActivity: Activity = {
        id: id || '1',
        title: 'Excursion en pirogue traditionnelle',
        description: 'Embarquez pour une aventure inoubliable sur les eaux cristallines de Dakar. Nos guides locaux expérimentés vous feront découvrir des paysages époustouflants, des villages de pêcheurs authentiques et des plages secrètes accessibles uniquement par bateau.',
        type: 'Excursion bateau',
        price: 45,
        duration: '4h',
        location: 'Dakar, Sénégal',
        images: [
          'https://images.unsplash.com/photo-1735293221044-60ac95fb197f?q=80&w=1200',
          'https://images.unsplash.com/photo-1711802536786-149a0d0c5879?q=80&w=1200',
          'https://images.unsplash.com/photo-1630510590519-0976dc4cc250?q=80&w=1200'
        ],
        rating: 4.8,
        guideId: 'guide_1'
      }
      setActivity(mockActivity)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!isAuthenticated) {
      login()
      return
    }

    if (!bookingDate) {
      toast.error('Veuillez sélectionner une date')
      return
    }

    try {
      const booking = await blink.db.bookings.create({
        activityId: activity!.id,
        travelerId: user!.id,
        date: bookingDate,
        participants,
        status: 'pending',
        totalPrice: activity!.price * participants
      })
      toast.success('Demande de réservation envoyée !')
      // Redirect or show success UI
    } catch (error) {
      toast.error('Erreur lors de la réservation')
      console.error(error)
    }
  }

  if (loading) return <div className="container mx-auto px-4 py-20 text-center animate-pulse">Chargement de l'expérience...</div>
  if (!activity) return <div className="container mx-auto px-4 py-20 text-center">Expérience introuvable.</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/marketplace" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Retour aux activités
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
              <MapPin className="h-4 w-4" /> {activity.location}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">{activity.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-foreground">{activity.rating}</span>
                <span>(24 avis)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {activity.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" /> Jusqu'à 8 personnes
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] md:h-[500px]">
            <div className="rounded-2xl overflow-hidden h-full">
              <img src={activity.images[0]} alt={activity.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="grid grid-rows-2 gap-4 h-full">
              <div className="rounded-2xl overflow-hidden">
                <img src={activity.images[1]} alt={activity.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={activity.images[2]} alt={activity.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <h2 className="text-2xl font-bold border-b pb-4">À propos de cette expérience</h2>
            <div className="whitespace-pre-line text-muted-foreground leading-relaxed text-lg">
              {activity.description}
            </div>
          </div>

          {/* Includes */}
          <div className="bg-primary/5 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-primary">
                   <Check className="h-5 w-5" /> Ce qui est inclus
                </h3>
                <ul className="flex flex-col gap-2 text-muted-foreground">
                   <li>• Guide local certifié</li>
                   <li>• Équipement de sécurité</li>
                   <li>• Rafraîchissements</li>
                   <li>• Transport vers le site</li>
                </ul>
             </div>
             <div>
                <h3 className="font-bold mb-4 flex items-center gap-2 text-muted-foreground">
                   <Info className="h-5 w-5" /> Non inclus
                </h3>
                <ul className="flex flex-col gap-2 text-muted-foreground">
                   <li>• Repas complets</li>
                   <li>• Pourboires personnels</li>
                   <li>• Assurances voyages spécifiques</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Right Content - Booking Card */}
        <aside className="relative">
          <div className="sticky top-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background rounded-3xl border shadow-xl p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-primary">{activity.price}F CFA <span className="text-sm text-muted-foreground font-normal">/ personne</span></div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Date de l'expérience</label>
                  <Input 
                    type="date" 
                    className="rounded-xl" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Nombre de participants</label>
                  <div className="flex items-center justify-between border rounded-xl p-2 px-4">
                     <button 
                       onClick={() => setParticipants(Math.max(1, participants - 1))}
                       className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center font-bold"
                     > - </button>
                     <span className="font-bold">{participants}</span>
                     <button 
                       onClick={() => setParticipants(participants + 1)}
                       className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center font-bold"
                     > + </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t">
                 <div className="flex justify-between items-center text-lg">
                    <span>Total</span>
                    <span className="font-bold">{activity.price * participants}F CFA</span>
                 </div>
                 <Button size="lg" className="w-full rounded-xl py-6 text-lg font-bold" onClick={handleBooking}>
                    {isAuthenticated ? 'Réserver maintenant' : 'Se connecter pour réserver'}
                 </Button>
                 <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" /> Paiement 100% sécurisé
                 </p>
              </div>
            </motion.div>

            <div className="mt-8 flex flex-col gap-4 p-6 border rounded-3xl bg-muted/30">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">M</div>
                  <div>
                     <div className="font-bold">Modou Sarr</div>
                     <div className="text-xs text-muted-foreground">Guide Local • 5 ans d'expérience</div>
                  </div>
               </div>
               <p className="text-sm text-muted-foreground italic">"Je serai ravi de vous faire découvrir ma ville et ses secrets."</p>
               <Button variant="ghost" className="w-full text-primary font-bold">Contacter le guide</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}