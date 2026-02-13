import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search, MapPin, Calendar, Users, Star, ArrowRight, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function Home() {
  const destinations = [
    { name: 'Dakar, Sénégal', image: 'https://images.unsplash.com/photo-1735293221044-60ac95fb197f?q=80&w=800', activities: 12 },
    { name: 'Lamu, Kenya', image: 'https://images.unsplash.com/photo-1711802536786-149a0d0c5879?q=80&w=800', activities: 8 },
    { name: 'Banana Islands, Sierra Leone', image: 'https://images.unsplash.com/photo-1630510590519-0976dc4cc250?q=80&w=800', activities: 5 },
    { name: 'Okavango Delta, Botswana', image: 'https://images.unsplash.com/photo-1758881534566-fd5c54d7e7c8?q=80&w=800', activities: 15 },
  ]

  const featuredActivities = [
    {
      id: '1',
      title: 'Excursion en pirogue traditionnelle',
      location: 'Dakar',
      price: 45000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1735293221044-60ac95fb197f?q=80&w=800',
      duration: '4h'
    },
    {
      id: '2',
      title: 'Safari authentique en brousse',
      location: 'Kenya',
      price: 120000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1758881534566-fd5c54d7e7c8?q=80&w=800',
      duration: 'Journée'
    },
    {
      id: '3',
      title: 'Tour des îles au coucher du soleil',
      location: 'Sénégal',
      price: 35000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1630510590519-0976dc4cc250?q=80&w=800',
      duration: '3h'
    },
  ]

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1711802536786-149a0d0c5879?q=80&w=1600"
            alt="Africa Landscape"
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        <div className="container relative z-10 px-4 text-center text-white flex flex-col items-center gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold max-w-4xl"
          >
            Découvrez l'Afrique <span className="text-primary font-extrabold italic">Authentique</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl"
          >
            Réservez des expériences uniques avec des guides locaux et des propriétaires de bateaux passionnés.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="flex flex-col items-start gap-1 px-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Destination</label>
              <div className="flex items-center gap-2 w-full text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <Input placeholder="Où allez-vous ?" className="h-8 p-0 border-none focus-visible:ring-0 bg-transparent" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 px-2 border-l border-border/50">
              <label className="text-xs font-bold text-muted-foreground uppercase">Date</label>
              <div className="flex items-center gap-2 w-full text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <Input type="date" className="h-8 p-0 border-none focus-visible:ring-0 bg-transparent" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1 px-2 border-l border-border/50">
              <label className="text-xs font-bold text-muted-foreground uppercase">Voyageurs</label>
              <div className="flex items-center gap-2 w-full text-foreground">
                <Users className="h-4 w-4 text-primary" />
                <Input type="number" placeholder="2" className="h-8 p-0 border-none focus-visible:ring-0 bg-transparent" />
              </div>
            </div>
            <Button size="lg" className="h-full rounded-xl gap-2 text-lg">
              <Search className="h-5 w-5" />
              Rechercher
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">Destinations Populaires</h2>
            <p className="text-muted-foreground">Explorez les joyaux cachés de l'Afrique</p>
          </div>
          <Link to="/destinations" className="text-primary font-medium flex items-center gap-1 hover:underline">
            Voir tout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md"
            >
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{dest.name}</h3>
                <p className="text-sm text-white/80">{dest.activities} activités</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Activities Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Activités Vedettes</h2>
              <p className="text-muted-foreground">Les meilleures expériences recommandées par nos voyageurs</p>
            </div>
            <Link to="/marketplace" className="text-primary font-medium flex items-center gap-1 hover:underline">
              Voir tout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredActivities.map((activity) => (
              <div key={activity.id} className="bg-background rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-shadow group">
                <div className="relative h-64">
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    {activity.rating}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase mb-2">
                    <MapPin className="h-3 w-3" />
                    {activity.location}
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{activity.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Disponible</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {activity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-sm text-muted-foreground">À partir de</span>
                      <div className="text-2xl font-bold text-primary">{activity.price}F CFA</div>
                    </div>
                    <Link to={`/activity/${activity.id}`}>
                      <Button variant="outline" className="rounded-xl">Voir détails</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4">Pourquoi choisir Xamfi ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Nous simplifions vos aventures africaines tout en soutenant l'économie locale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-primary/5">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-2">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Expériences Authentiques</h3>
            <p className="text-muted-foreground">Nous sélectionnons avec soin des guides locaux passionnés qui vous feront découvrir le vrai visage de l'Afrique.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-primary/5">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-2">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Réservation Facile</h3>
            <p className="text-muted-foreground">Un moteur de recherche intuitif et un système de paiement sécurisé pour réserver en quelques clics.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-primary/5">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-2">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Impact Local</h3>
            <p className="text-muted-foreground">Xamfi reverse une part importante aux guides locaux, contribuant directement au développement des communautés.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="relative rounded-3xl bg-primary overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="absolute top-0 right-0 h-full w-1/2 bg-white/10 -skew-x-12 translate-x-1/2" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Vous êtes un guide ou propriétaire de bateau ?</h2>
            <p className="text-white/80 text-lg mb-8">Rejoignez notre communauté et commencez à proposer vos expériences à des voyageurs du monde entier.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="rounded-xl text-primary font-bold">Devenir partenaire</Button>
              <Button variant="outline" size="lg" className="rounded-xl border-white text-white hover:bg-white hover:text-primary">En savoir plus</Button>
            </div>
          </div>
          <div className="relative z-10 hidden md:block">
            <div className="h-64 w-64 rounded-full border-8 border-white/20 flex items-center justify-center">
              <Globe className="h-32 w-32 opacity-50" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 
