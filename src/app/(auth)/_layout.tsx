import { Stack } from 'expo-router'
import { theme } from 'styles/theme'

export default function AuthLayout() {
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