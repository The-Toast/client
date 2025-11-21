import { View, TextInput } from 'react-native'
import { TextFieldProps } from './types'
import Text from '../Text'

export default function TextField(
  { value, defaultValue, onChangeText, label, help, hasError, disabled = false, prefix, suffix, right, placeholder, keyboardType = 'default', maxLength, editable = true }: TextFieldProps
) {
  return (
    <View style={{ gap: 6 }}>
      {!!label && (
        <Text type="caption1" color="#666">
          {label}
        </Text>
      )}
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
      />
    </View>
  )
}