import Taro from '@tarojs/taro'

/** 初始化云开发 */
export function initCloud() {
  if (process.env.TARO_ENV === 'weapp') {
    Taro.cloud.init({
      env: 'baby-care-cloud', // TODO: 替换为实际云开发环境 ID
    })
  }
}

/** 调用云函数 */
export async function callFunction<T = any>(name: string, data?: Record<string, any>): Promise<T> {
  const res = await Taro.cloud.callFunction({
    name,
    data,
  })
  const result = res.result as any
  if (result?.code !== 0) {
    throw new Error(result?.message || '请求失败')
  }
  return result.data as T
}

/** 上传文件到云存储 */
export async function uploadFile(filePath: string, cloudPath: string): Promise<string> {
  const res = await Taro.cloud.uploadFile({
    filePath,
    cloudPath,
  })
  return res.fileID
}

/** 获取临时文件链接 */
export async function getTempFileURL(fileID: string): Promise<string> {
  const res = await Taro.cloud.getTempFileURL({
    fileList: [fileID],
  })
  return res.fileList[0]?.tempFileURL || ''
}
