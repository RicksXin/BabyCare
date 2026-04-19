import { makeAutoObservable } from 'mobx'
import type { Reminder } from '@/types/models'

class ReminderStore {
  reminders: Reminder[] = []
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  get activeReminders(): Reminder[] {
    return this.reminders.filter(r => r.enabled)
  }

  setReminders(reminders: Reminder[]) {
    this.reminders = reminders
  }

  addReminder(reminder: Reminder) {
    this.reminders.push(reminder)
  }

  toggleReminder(id: string) {
    const r = this.reminders.find(item => item._id === id)
    if (r) r.enabled = !r.enabled
  }

  removeReminder(id: string) {
    this.reminders = this.reminders.filter(r => r._id !== id)
  }
}

export const reminderStore = new ReminderStore()
