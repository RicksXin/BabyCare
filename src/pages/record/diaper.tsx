import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import DiaperForm from '@/components/RecordForms/DiaperForm'

import './diaper.scss'

export default function DiaperPage() {
  return (
    <View className='diaper-page'>
      <DiaperForm onSuccess={() => Taro.navigateBack()} />
    </View>
  )
}
