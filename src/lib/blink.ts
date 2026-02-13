import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID,
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY,
  auth: { mode: 'managed' },
})

export async function seedData() {
  const activities = await blink.db.activities.list({ limit: 1 })
  if (activities.length > 0) return

  const mockGuideId = 'guide_1' // This would normally be a real user ID

  await blink.db.activities.createMany([
    { 
      id: '1', 
      title: 'Excursion en pirogue traditionnelle', 
      location: 'Dakar, Sénégal', 
      price: 45000, 
      images: JSON.stringify(['https://images.unsplash.com/photo-1735293221044-60ac95fb197f?q=80&w=800']),
      duration: '4h',
      type: 'Excursion bateau',
      description: 'Une balade authentique le long de la côte dakaroise.',
      guideId: mockGuideId
    },
    { 
      id: '2', 
      title: 'Safari authentique en brousse', 
      location: 'Kenya', 
      price: 120000, 
      images: JSON.stringify(['https://images.unsplash.com/photo-1758881534566-fd5c54d7e7c8?q=80&w=800']),
      duration: 'Journée',
      type: 'Safari',
      description: 'Observez la faune sauvage dans son habitat naturel.',
      guideId: mockGuideId
    },
    { 
      id: '3', 
      title: 'Tour des îles au coucher du soleil', 
      location: 'Sénégal', 
      price: 35000, 
      images: JSON.stringify(['https://images.unsplash.com/photo-1630510590519-0976dc4cc250?q=80&w=800']),
      duration: '3h',
      type: 'Excursion bateau',
      description: 'Profitez d\'un moment magique sur l\'eau.',
      guideId: mockGuideId
    }
  ])
}