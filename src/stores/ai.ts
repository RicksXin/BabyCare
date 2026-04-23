import { makeAutoObservable } from 'mobx'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  imageUrl?: string
  timestamp: number
}

class AIStore {
  messages: ChatMessage[] = []
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  addMessage(msg: ChatMessage) {
    this.messages.push(msg)
  }

  setLoading(val: boolean) {
    this.loading = val
  }

  async sendMessage(content: string, imageUrl?: string) {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      imageUrl,
      timestamp: Date.now(),
    }
    this.addMessage(userMsg)
    this.setLoading(true)

    try {
      // TODO: 调用云函数获取 AI 回复
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '我是 AI 助手，暂时还在开发中，稍后就能为您提供专业的育儿建议~',
        timestamp: Date.now(),
      }
      this.addMessage(reply)
    } finally {
      this.setLoading(false)
    }
  }

  clearHistory() {
    this.messages = []
  }
}

export const aiStore = new AIStore()
