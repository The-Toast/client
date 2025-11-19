import 'react-native-reanimated'
import { Stack } from 'expo-router'
import { theme } from 'styles/theme'
import { ThemeProvider } from '@emotion/react'
import { AuthProvider } from 'providers/AuthProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
