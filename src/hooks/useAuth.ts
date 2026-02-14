import { useEffect, useState } from 'react'

// Mock user type for testing
interface MockUser {
  id: string
  email: string
  name: string
}

export function useAuth() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check for mock user in localStorage
    const storedUser = localStorage.getItem('mockUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (redirectUrl?: string) => {
    // Mock login - in real app, this would open auth modal
    const mockUser: MockUser = {
      id: 'user_1',
      email: 'test@example.com',
      name: 'Test User'
    }
    setUser(mockUser)
    localStorage.setItem('mockUser', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mockUser')
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  }
} 
