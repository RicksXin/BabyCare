import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import FeedingForm from '@/components/RecordForms/FeedingForm'

import './feeding.scss'

export default function FeedingPage() {
  return (
    <View className='feeding-page'>
      <FeedingForm onSuccess={() => Taro.navigateBack()} />
    </View>
  )
}
