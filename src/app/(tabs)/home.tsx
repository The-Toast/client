import { Button, Text } from "@/uikit";
import { SafeArea, Section } from "@/components/layout";
import { useAuth } from "providers/AuthProvider";
import { router } from "expo-router";

export default function HomeScreen() {
  const { logout } = useAuth()

  const onPressLogout = async () => {
    await logout()
    router.replace('/(auth)/login')
  }

  return (
    <SafeArea>
      <Section>
        <Text type={'title3'}>홈</Text>
        <Button onPress={onPressLogout}>
          로그아웃
        </Button>
      </Section>
    </SafeArea>
  )
}