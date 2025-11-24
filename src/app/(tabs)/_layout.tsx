import {Redirect, Tabs} from 'expo-router'
import {useAuth} from 'providers/AuthProvider'

export default function TabLayout() {
  const { signedIn } = useAuth()
  if (!signedIn) return <Redirect href="/(auth)/login" />

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* 인덱스는 직접 접근하지 않도록 숨김 (리디렉션 전용) */}
      <Tabs.Screen name="index" options={{ href: null }} />
      {/* 홈 탭 */}
      <Tabs.Screen name="home" options={{ title: '홈' }} />
    </Tabs>
  )
}
