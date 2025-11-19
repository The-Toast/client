import { Text, ButtonCTA } from 'components'
import {View} from "react-native";
import { SafeArea } from 'components/layout'

/**
 * components/layout/SafeArea.tsx 코드 테스트중
 * */

export default function LoginScreen() {
  return (
    <SafeArea style={{ justifyContent: 'space-between', flex: 1 }}>
      <Text type={'title1'}>Login</Text>
      <View>
        <ButtonCTA disabled={false}>다음</ButtonCTA>
      </View>
    </SafeArea>
  )
}