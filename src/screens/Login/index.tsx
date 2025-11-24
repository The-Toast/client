import { SafeArea, Section } from 'components/layout'
import { FixedBottomCTA, Text, TextField } from 'uikit'
import { useRef, useState } from 'react'
import { Animated, Easing, View } from 'react-native'
import { useAuth } from 'providers/AuthProvider'
import { router } from 'expo-router'

export default function LoginScreen() {
  const { setSignedIn } = useAuth()
  const [step, setStep] = useState<'id' | 'password'>('id')
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [idError, setIdError] = useState<string | null>(null)
  const [pwdError, setPwdError] = useState<string | null>(null)
  const [idHeight, setIdHeight] = useState<number | null>(null)
  const [pwdHeight, setPwdHeight] = useState<number | null>(null)

  // Animations
  const idTranslateY = useRef(new Animated.Value(0)).current
  const pwdTranslateY = useRef(new Animated.Value(-20)).current
  const pwdOpacity = useRef(new Animated.Value(0)).current

  const proceedToPassword = () => {
    if (!studentId) {
      setIdError('학번을 입력해주세요')
      return
    }
    setStep('password')
    setIdError(null)

    const downBy = (pwdHeight ?? 76) + 24

    Animated.parallel([
      Animated.timing(idTranslateY, {
        toValue: downBy,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(pwdTranslateY, {
        toValue: 0,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(pwdOpacity, {
        toValue: 1,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()
  }

  const onPressCTA = () => {
    if (step === 'id') {
      proceedToPassword()
    } else {
      // 비밀번호 검증 및 테스트 로그인 로직 (1234 / 1234)
      if (!password) {
        setPwdError('비밀번호를 입력해주세요')
        return
      }

      const id = studentId.trim()
      const pwd = password.trim()
      if (id === '1234' && pwd === '1234') {
        setPwdError(null)
        // 테스트 로그인 성공 시 즉시 메인 탭으로 이동
        setSignedIn(true)
        router.replace('/(tabs)/home')
      } else {
        setPwdError('학번 또는 비밀번호가 올바르지 않습니다')
      }
    }
  }

  const ctaDisabled = step === 'id' ? studentId.length === 0 : password.length === 0

  return (
    <SafeArea style={{ width: '100%', height: '100%' }}>
      <Section>
        <Text type={'title2'}>{step === 'id' ? '학번을 입력하세요' : '비밀번호를 입력하세요'}</Text>

        {(() => {
          const defaultFieldH = 76
          const containerHeight =
            step === 'password'
              ? (pwdHeight ?? defaultFieldH) + 24 + (idHeight ?? defaultFieldH)
              : Math.max(idHeight ?? defaultFieldH, defaultFieldH + 20)
          return (
            <View style={{ height: containerHeight, marginTop: 8 }}>
              {/* 비밀번호 입력창 (처음에는 숨김, 위에서 내려옴) */}
              <Animated.View
                onLayout={(e) => setPwdHeight(e.nativeEvent.layout.height)}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  transform: [{ translateY: pwdTranslateY }],
                  opacity: pwdOpacity,
                }}
                pointerEvents={step === 'password' ? 'auto' : 'none'}
              >
                <TextField
                  label={'비밀번호'}
                  placeholder={''}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text)
                    if (pwdError) setPwdError(null)
                  }}
                  secureTextEntry={true}
                  returnKeyType={'done'}
                  onSubmitEditing={onPressCTA}
                  hasError={!!pwdError}
                  help={pwdError ?? undefined}
                />
              </Animated.View>

              {/* 학번 입력창 (처음에 보이고, 아래로 내려가 비밀번호와 24px 간격 정렬) */}
              <Animated.View
                onLayout={(e) => setIdHeight(e.nativeEvent.layout.height)}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  transform: [{ translateY: idTranslateY }],
                }}
              >
                <TextField
                  label={'학번'}
                  placeholder={''}
                  value={studentId}
                  onChangeText={(text) => {
                    setStudentId(text)
                    if (idError) setIdError(null)
                  }}
                  onSubmitEditing={proceedToPassword}
                  returnKeyType={'next'}
                  keyboardType={'numeric'}
                  hasError={!!idError}
                  help={idError ?? undefined}
                />
              </Animated.View>
            </View>
          )
        })()}
      </Section>
      <FixedBottomCTA disabled={ctaDisabled} onPress={onPressCTA}>
        {step === 'id' ? '다음' : '시작하기'}
      </FixedBottomCTA>
    </SafeArea>
  )
}