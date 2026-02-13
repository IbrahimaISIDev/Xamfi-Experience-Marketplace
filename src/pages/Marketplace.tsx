import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search, Filter, MapPin, Calendar, Star, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { blink } from '../lib/blink'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

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
}

export function Marketplace() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const types = ['All', 'Visite guidée', 'Excursion bateau', 'Safari', 'Plongée', 'Culturel']

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    setLoading(true)
    try {
      // For MVP, we'll fetch from DB and supplement with mock if empty
      const results = await blink.db.activities.list()
      if (results.length > 0) {
        setActivities(results.map(r => ({
          ...r,
          images: JSON.parse(r.images || '[]'),
          rating: 4.5 + Math.random() * 0.5 // Mock rating
        })))
      } else {
        // Fallback to mock data for presentation
        setActivities([
          { 
            id: '1', 
            title: 'Excursion en pirogue traditionnelle', 
            location: 'Dakar, Sénégal', 
            price: 45000, 
            rating: 4.8, 
            images: ['https://images.unsplash.com/photo-1735293221044-60ac95fb197f?q=80&w=800'],
            duration: '4h',
            type: 'Excursion bateau',
            description: 'Une balade authentique le long de la côte dakaroise.'
          },
          { 
            id: '2', 
            title: 'Safari authentique en brousse', 
            location: 'Kenya', 
            price: 120000, 
            rating: 4.9, 
            images: ['https://images.unsplash.com/photo-1758881534566-fd5c54d7e7c8?q=80&w=800'],
            duration: 'Journée',
            type: 'Safari',
            description: 'Observez la faune sauvage dans son habitat naturel.'
          },
          { 
            id: '3', 
            title: 'Tour des îles au coucher du soleil', 
            location: 'Sénégal', 
            price: 35000, 
            rating: 4.7, 
            images: ['https://images.unsplash.com/photo-1630510590519-0976dc4cc250?q=80&w=800'],
            duration: '3h',
            type: 'Excursion bateau',
            description: 'Profitez d\'un moment magique sur l\'eau.'
          },
          { 
            id: '4', 
            title: 'Visite historique de Gorée', 
            location: 'Dakar, Sénégal', 
            price: 25000, 
            rating: 4.9, 
            images: ['https://images.unsplash.com/photo-1759252973832-617895b7ef4d?q=80&w=800'],
            duration: '5h',
            type: 'Culturel',
            description: 'Découvrez l\'histoire poignante de l\'île de Gorée.'
          },
          { 
            id: '5', 
            title: 'Plongée dans les récifs coralliens', 
            location: 'Mombasa, Kenya', 
            price: 80000, 
            rating: 4.6, 
            images: ['https://images.unsplash.com/photo-1711802536786-149a0d0c5879?q=80&w=800'],
            duration: '4h',
            type: 'Plongée',
            description: 'Explorez les fonds marins exceptionnels de l\'Océan Indien.'
          },
        ])
      }
    } catch (error) {
      // Fallback to mock data when DB is unavailable or user is unauthenticated
      setActivities([
        { id: '1', title: 'Excursion en pirogue traditionnelle', location: 'Dakar, Sénégal', price: 45000, rating: 4.8, images: ['https://images.unsplash.com/photo-1735293221044-60ac95fb197f?q=80&w=800'], duration: '4h', type: 'Excursion bateau', description: 'Une balade authentique le long de la côte dakaroise.' },
        { id: '2', title: 'Safari authentique en brousse', location: 'Kenya', price: 120000, rating: 4.9, images: ['https://images.unsplash.com/photo-1758881534566-fd5c54d7e7c8?q=80&w=800'], duration: 'Journée', type: 'Safari', description: 'Observez la faune sauvage dans son habitat naturel.' },
        { id: '3', title: 'Tour des îles au coucher du soleil', location: 'Sénégal', price: 35000, rating: 4.7, images: ['https://images.unsplash.com/photo-1630510590519-0976dc4cc250?q=80&w=800'], duration: '3h', type: 'Excursion bateau', description: 'Profitez d\'un moment magique sur l\'eau.' },
        { id: '4', title: 'Visite historique de Gorée', location: 'Dakar, Sénégal', price: 25000, rating: 4.9, images: ['https://images.unsplash.com/photo-1759252973832-617895b7ef4d?q=80&w=800'], duration: '5h', type: 'Culturel', description: 'Découvrez l\'histoire poignante de l\'île de Gorée.' },
        { id: '5', title: 'Plongée dans les récifs coralliens', location: 'Mombasa, Kenya', price: 80000, rating: 4.6, images: ['https://images.unsplash.com/photo-1711802536786-149a0d0c5879?q=80&w=800'], duration: '4h', type: 'Plongée', description: 'Explorez les fonds marins exceptionnels de l\'Océan Indien.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'All' || activity.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Explorer les Expériences</h1>
            <p className="text-muted-foreground">{filteredActivities.length} activités trouvées</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher par destination, activité..." 
                  className="pl-10 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <Button 
               variant="outline" 
               className="rounded-xl gap-2 md:hidden"
               onClick={() => setShowFilters(!showFilters)}
             >
                <Filter className="h-4 w-4" />
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Catégories
              </h3>
              <div className="flex flex-col gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedType === type ? 'bg-primary text-white font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold">Prix</h3>
              <div className="flex flex-col gap-4">
                 <input type="range" min="0" max="500" className="w-full accent-primary" />
                 <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0F CFA</span>
                    <span>500F CFA+</span>
                 </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold">Notation</h3>
              <div className="flex flex-col gap-2">
                 {[4, 3, 2].map(rating => (
                    <label key={rating} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                       <input type="checkbox" className="rounded border-border" />
                       <div className="flex items-center gap-1">
                          {rating}+ <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                       </div>
                    </label>
                 ))}
              </div>
            </div>
          </aside>

          {/* Activities Grid */}
          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse" />
                 ))}
              </div>
            ) : filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredActivities.map((activity) => (
                    <Link to={`/activity/${activity.id}`} key={activity.id}>
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-background rounded-2xl overflow-hidden shadow-md border border-border/50 hover:shadow-xl transition-all group cursor-pointer h-full"
                      >
                        <div className="relative h-56">
                          <img src={activity.images[0]} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {activity.rating}
                          </div>
                          <div className="absolute bottom-4 left-4 bg-primary/90 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                             {activity.type}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col h-full">
                          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </div>
                          <h3 className="text-lg font-bold mb-2 line-clamp-1">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{activity.description}</p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t">
                            <div className="text-xl font-bold text-primary">{activity.price}F CFA<span className="text-xs text-muted-foreground font-normal">/pers</span></div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                               <Calendar className="h-3 w-3" /> {activity.duration}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                 <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-10 w-10 text-muted-foreground" />
                 </div>
                 <h3 className="text-xl font-bold">Aucun résultat trouvé</h3>
                 <p className="text-muted-foreground max-w-xs">Essayez de modifier vos critères de recherche ou de changer de catégorie.</p>
                 <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedType('All'); }}>Réinitialiser les filtres</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
