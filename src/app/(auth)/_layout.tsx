import { Redirect, Stack } from 'expo-router'
import { useAuth } from 'providers/AuthProvider'
import { theme } from 'styles/theme'

export default function AuthLayout() {
  const { signedIn } = useAuth()
  if (signedIn) return <Redirect href='/(tabs)/home' />
  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        contentStyle: { backgroundColor: theme.bg },
      }}
    >
      <Stack.Screen
        name='login/index'
      />
    </Stack>
  )
}