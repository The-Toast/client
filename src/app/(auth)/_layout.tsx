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
      {/* expo-router에서는 폴더명만 지정하면 index가 기본 엔트리입니다 */}
      <Stack.Screen name="login" />
      {/* 스플래시가 존재하는 경우 함께 등록(필요 시) */}
      <Stack.Screen name="splash" options={{ href: null }} />
    </Stack>
  )
}