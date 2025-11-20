import { Stack } from 'expo-router'
import { Color } from 'styles'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        contentStyle: { backgroundColor: Color.bg },
      }}
    >
      <Stack.Screen
        name='login/index'
      />
    </Stack>
  )
}