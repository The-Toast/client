import React from 'react'
import {
  SafeAreaView as RNSafeAreaView,
  useSafeAreaInsets,
  type SafeAreaViewProps,
} from 'react-native-safe-area-context'

type Props = SafeAreaViewProps & { adjustBottomInset?: boolean }

export default function SafeArea({ adjustBottomInset = false, style, edges, ...rest }: Props) {
  const insets = useSafeAreaInsets()
  const shouldAdjust = adjustBottomInset && insets.bottom === 34

  const finalStyle = shouldAdjust ? [style, { paddingBottom: 14 }] : style
  const finalEdges: SafeAreaViewProps['edges'] = shouldAdjust
    ? edges
      ? { ...edges, bottom: 'off' }
      : { bottom: 'off' }
    : edges

  return <RNSafeAreaView style={finalStyle} edges={finalEdges} {...rest} />
}
