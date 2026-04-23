import { View, Text } from '@tarojs/components'

import './index.scss'

interface FABProps {
  onClick: () => void
}

export default function FloatingActionButton({ onClick }: FABProps) {
  return (
    <View className='fab' onClick={onClick}>
      <Text className='fab-icon'>+</Text>
    </View>
  )
}
