import { Redirect, Tabs } from 'expo-router'
import { useAuth } from 'providers/AuthProvider'
import { Color } from 'styles'
import { House, Calendar, Buildings, User } from 'phosphor-react-native'

export default function TabLayout() {
  const { signedIn } = useAuth()
  if (!signedIn) return <Redirect href="/(auth)/login" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.text,
        tabBarInactiveTintColor: '#9E9E9E',
      }}
    >
      {/* 인덱스는 직접 접근하지 않도록 숨김 (리디렉션 전용) */}
      <Tabs.Screen name="index" options={{ href: null }} />
      {/* 홈 탭 */}
      <Tabs.Screen
        name="home"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size, focused }) => (
            <House color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      {/* 시간표 탭 */}
      <Tabs.Screen
        name="timetable"
        options={{
          title: '시간표',
          tabBarIcon: ({ color, size, focused }) => (
            <Calendar color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      {/* 학교생활 탭 */}
      <Tabs.Screen
        name="life"
        options={{
          title: '학교생활',
          tabBarIcon: ({ color, size, focused }) => (
            <Buildings color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      {/* 마이페이지 탭 */}
      <Tabs.Screen
        name="my"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color, size, focused }) => (
            <User color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
    </Tabs>
  )
}
