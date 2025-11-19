import { useEffect } from 'react'
import { router } from 'expo-router'
import { useAuth } from 'providers/AuthProvider'

export default function SplashScreen() {
  const { signedIn, hydrated } = useAuth()

  useEffect(() => {
    if (!hydrated) return

    const to = setTimeout(() => {
      router.replace(signedIn ? '/(tabs)/home' : '/(auth)/login')
    }, 2000)

    return () => clearTimeout(to)
  }, [signedIn, hydrated])

  return null
}