import styled from '@emotion/native'
import { useState, memo } from 'react'
import { View } from 'react-native'
import { TextFieldProps } from './types'
import Text from '../Text'

const Container = styled.View`
  // Layout
  gap: 6px;
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
}: TextFieldProps) {
  const [focused, setFocused] = useState(false)
  const finalEditable = editable && !disabled

  return (
    <Container>
      <Content>
        {!!label && (
          <Text type="caption1" color="#666">
            {label}
          </Text>
        )}

        <FieldRow focused={focused} hasError={hasError} disabled={disabled}>
          {!!prefix && (
            <AccessoryText type="body2" color="#666">
              {prefix}
            </AccessoryText>
          )}

          <StyledInput
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
      </Content>
      {!!help && (
        <Text type={'caption3'} color={hasError ? '#F04438' : '#666'}>
          {help}
        </Text>
      )}
    </Container>
  )
}

export default memo(TextField)