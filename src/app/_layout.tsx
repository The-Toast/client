import 'react-native-reanimated'
import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { Color } from 'styles'
import { ThemeProvider } from '@emotion/react'
import { AuthProvider } from 'providers/AuthProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Medium': require('../../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('../../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('../../assets/fonts/Pretendard-SemiBold.otf')
  })

  useEffect(() => {
    if (fontsLoaded) {
      (async () => {
        try {
          await SplashScreen.hideAsync()
        } catch {
          // ignored
        }
      })()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider theme={Color}>
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
