import styled from '@emotion/native'
import { useEffect, useRef, useState, memo } from 'react'
import { View, Animated, Easing } from 'react-native'
import { TextFieldProps } from './types'
import Text from '../Text'

const Container = styled.View`
  // Layout
`

const Content = styled.View`
  // Layout
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`

const FieldRow = styled.View<{
  focused: boolean
  hasError?: boolean
  disabled?: boolean
}>(({ focused, hasError, disabled }) => ({
  // Layout
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  // Content 컨테이너가 align-items: flex-start 이라 부모가 가로로 늘어나지 않아
  // 자식이 flex: 1 만 있는 경우 너비가 0이 되는 문제가 있어 명시적으로 100%로 확장합니다.
  width: '100%',
  minHeight: 52,
  paddingVertical: 4,
  gap: 8,

  // Style
  borderBottomWidth: 2,
  borderBottomColor: hasError ? '#F04438' : focused ? '#111' : '#E5E5EC',
  backgroundColor: '#FFF',
  opacity: disabled ? 0.6 : 1,
}))

const AccessoryText = styled(Text)`
  color: #666;
`

const StyledInput = styled.TextInput`
  // Layout
  flex: 1;
  min-height: 44px;
  padding: 0;
  
  // Style
  color: #111;
  background-color: transparent;
`

function TextField({
  value,
  defaultValue,
  onChangeText,
  onSubmitEditing,
  label,
  help,
  hasError,
  disabled = false,
  prefix,
  suffix,
  right,
  placeholder,
  keyboardType = 'default',
  maxLength,
  editable = true,
  returnKeyType,
  secureTextEntry,
  inputRef,
}: TextFieldProps) {
  const [focused, setFocused] = useState(false)
  const finalEditable = editable && !disabled
  // help가 유무와 관계없이 높이가 일정하도록 예약 패딩을 둡니다
  const HELP_RESERVE = 22 // caption3 lineHeight(16) + marginTop(6)
  const showHelp = !!help && !hasError

  return (
    <Container style={{ paddingBottom: showHelp ? 0 : HELP_RESERVE }}>
      <Content>
        {!!label && (
          <Text type="caption1" color={hasError ? '#F04438' : '#666'}>
            {label}
          </Text>
        )}

        {/* 에러 시 좌우 흔들림 애니메이션 */}
        <ShakeWrapper hasError={!!hasError}>
          <FieldRow focused={focused} hasError={hasError} disabled={disabled}>
            {!!prefix && (
              <AccessoryText type="body2" color="#666">
                {prefix}
              </AccessoryText>
            )}

          <StyledInput
            ref={inputRef}
            value={typeof value === 'number' ? String(value) : value}
            defaultValue={defaultValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor="#A3A3A3"
            keyboardType={keyboardType}
            maxLength={maxLength}
            editable={finalEditable}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
          />

          {!!suffix && (
            <AccessoryText type="body2" color="#666">
              {suffix}
            </AccessoryText>
          )}

          {!!right && <View>{right}</View>}
          </FieldRow>
        </ShakeWrapper>
      </Content>
      {showHelp && (
        <Text
          type={'caption3'}
          color={hasError ? '#F04438' : '#666'}
          style={{ marginTop: 6 }}
        >
          {help}
        </Text>
      )}
    </Container>
  )
}

export default memo(TextField)

// 내부 전용: 에러 시 shake 애니메이션을 적용하는 래퍼
function ShakeWrapper({ children, hasError }: { children: React.ReactNode; hasError: boolean }) {
  const shakeAV = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!hasError) return
    // 좌우 흔들림 시퀀스
    const seq = [
      -6, 6, -4, 4, -2, 2, 0
    ].map((to) =>
      Animated.timing(shakeAV, {
        toValue: to,
        duration: 36,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    Animated.sequence(seq).start()
  }, [hasError, shakeAV])

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAV }] }}>
      {children}
    </Animated.View>
  )
}