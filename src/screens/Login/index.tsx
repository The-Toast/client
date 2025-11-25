import { SafeArea, Section } from 'components/layout'
import { FixedBottomCTA, Text, TextField } from 'uikit'
import { useRef, useState } from 'react'
import { Animated, Easing, Pressable, View, TextInput } from 'react-native'
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
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  // Animations
  const idTranslateY = useRef(new Animated.Value(0)).current
  const pwdTranslateY = useRef(new Animated.Value(-20)).current
  const pwdOpacity = useRef(new Animated.Value(0)).current
  // 기본 필드 높이(레이블+필드, help 미포함)
  const defaultFieldH = 76
  // help를 항상 예약한다고 가정할 때의 추가 높이: caption3 lineHeight(16) + marginTop(6) = 22
  const HELP_RESERVE = 22
  // 컨테이너 높이: 항상 help 영역이 있다고 가정한 높이로 시작
  const containerHeightAV = useRef(new Animated.Value(defaultFieldH + HELP_RESERVE)).current
  const pwdInputRef = useRef<TextInput>(null)

  const proceedToPassword = () => {
    if (!studentId) {
      setIdError('학번을 입력해주세요')
      return
    }
    if (transitioning) return
    setTransitioning(true)
    setStep('password')
    setIdError(null)

    // 측정값과 무관하게 항상 help가 있다고 가정하여 애니메이션 거리를 계산
    const assumed = (h: number | null) => {
      // 실제 높이가 더 크면(예: help가 2줄) 그 값을 사용하고, 아니라면 예약 높이를 사용
      return Math.max(h ?? defaultFieldH, defaultFieldH + HELP_RESERVE)
    }

    const downBy = assumed(pwdHeight) + 24
    const targetHeight = assumed(pwdHeight) + 24 + assumed(idHeight)

    // 컨테이너 높이, 필드 이동/페이드 동시 진행 + 소폭 스태거
    Animated.parallel([
      Animated.spring(idTranslateY, {
        toValue: downBy,
        stiffness: 180,
        damping: 20,
        mass: 1,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(60),
        Animated.timing(pwdOpacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(pwdTranslateY, {
        toValue: 0,
        stiffness: 180,
        damping: 20,
        mass: 1,
        useNativeDriver: true,
      }),
      Animated.timing(containerHeightAV, {
        toValue: targetHeight,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start(() => {
      // 전환 완료 후 비밀번호 자동 포커스
      pwdInputRef.current?.focus()
      setTransitioning(false)
    })
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
      setLoading(true)
      // 모의 API 대기 시간 (디자인 상 로딩 피드백 제공)
      setTimeout(() => {
        if (id === '1234' && pwd === '1234') {
          setPwdError(null)
          // 테스트 로그인 성공 시 즉시 메인 탭으로 이동
          setSignedIn(true)
          router.replace('/(tabs)/home')
        } else {
          setPwdError('학번 또는 비밀번호가 올바르지 않습니다')
        }
        setLoading(false)
      }, 600)
    }
  }

  const ctaDisabled = loading || transitioning || (step === 'id' ? studentId.length === 0 : password.length === 0)

  return (
    <SafeArea style={{ width: '100%', height: '100%' }}>
      <Section>
        {/* 상단 브랜딩/카피 영역 */}
        <View style={{ gap: 6 }}>
          <Text type="title2" color="#111">
            {step === 'id'
              ? '학번을 입력하세요'
              : '비밀번호를 입력하세요'}
          </Text>
        </View>

        {(() => {
          return (
            <Animated.View
              style={{ height: containerHeightAV, marginTop: 8, width: '100%' }}
            >
              {/* 비밀번호 입력창 (처음에는 숨김, 위에서 내려옴) */}
              <Animated.View
                // 비밀번호 단계에서만 터치 가능하도록 제한
                onLayout={(e) => {
                  const h = e.nativeEvent.layout.height
                  setPwdHeight(h)
                  // 비밀번호 단계에서 help 표시로 높이가 변하면 컨테이너 높이도 부드럽게 갱신
                  if (step === 'password' && !transitioning) {
                    const assumed = (x: number | null) => Math.max(x ?? defaultFieldH, defaultFieldH + HELP_RESERVE)
                    const total = assumed(h) + 24 + assumed(idHeight)
                    Animated.timing(containerHeightAV, {
                      toValue: total,
                      duration: 240,
                      easing: Easing.out(Easing.cubic),
                      useNativeDriver: false,
                    }).start()
                  }
                }}
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
                  secureTextEntry={!showPassword}
                  returnKeyType={'done'}
                  onSubmitEditing={onPressCTA}
                  hasError={!!pwdError}
                  help={pwdError ?? undefined}
                  inputRef={pwdInputRef}
                  right={
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => setShowPassword((v) => !v)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text type="caption1" color="#666">
                        {showPassword ? '숨기기' : '보기'}
                      </Text>
                    </Pressable>
                  }
                  editable={!loading}
                />
              </Animated.View>

              {/* 학번 입력창 (처음에 보이고, 아래로 내려가 비밀번호와 24px 간격 정렬) */}
              <Animated.View
                // 학번 단계에서만 터치 가능하도록 제한
                onLayout={(e) => {
                  const h = e.nativeEvent.layout.height
                  setIdHeight(h)
                  if (step === 'id' && !transitioning) {
                    const assumedH = Math.max(h ?? defaultFieldH, defaultFieldH + HELP_RESERVE)
                    // 학번 단계에서도 help가 있다고 가정한 높이로 컨테이너를 유지
                    Animated.timing(containerHeightAV, {
                      toValue: assumedH,
                      duration: 240,
                      easing: Easing.out(Easing.cubic),
                      useNativeDriver: false,
                    }).start()
                  }
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  transform: [{ translateY: idTranslateY }],
                }}
                pointerEvents={step === 'id' ? 'auto' : 'none'}
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
                  editable={!loading}
                />
              </Animated.View>
            </Animated.View>
          )
        })()}

        {/* 보조 액션 */}
        <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable accessibilityRole="button" onPress={() => {}}>
            <Text type="caption1" color="#666">비밀번호를 잊으셨나요?</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => {}}>
            <Text type="caption1" color="#666">회원가입</Text>
          </Pressable>
        </View>
      </Section>
      <FixedBottomCTA disabled={ctaDisabled} onPress={onPressCTA}>
        {loading ? '처리 중...' : step === 'id' ? '다음' : '시작하기'}
      </FixedBottomCTA>
    </SafeArea>
  )
}