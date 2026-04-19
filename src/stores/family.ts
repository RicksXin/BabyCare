import { makeAutoObservable, runInAction } from 'mobx'
import type { Family, FamilyMember, Baby } from '@/types/models'
import { setStorage, getStorage, KEYS } from '@/utils/storage'

class FamilyStore {
  family: Family | null = null
  members: FamilyMember[] = []
  babies: Baby[] = []
  currentBabyId: string | null = null
  loading = false

  constructor() {
    makeAutoObservable(this)
    this.currentBabyId = getStorage<string>(KEYS.CURRENT_BABY)
  }

  get currentBaby(): Baby | null {
    if (!this.currentBabyId) return this.babies[0] || null
    return this.babies.find(b => b._id === this.currentBabyId) || this.babies[0] || null
  }

  setFamily(family: Family) {
    this.family = family
    setStorage(KEYS.FAMILY_ID, family._id)
  }

  setMembers(members: FamilyMember[]) {
    this.members = members
  }

  setBabies(babies: Baby[]) {
    this.babies = babies
    if (!this.currentBabyId && babies.length > 0) {
      this.switchBaby(babies[0]._id)
    }
  }

  switchBaby(babyId: string) {
    this.currentBabyId = babyId
    setStorage(KEYS.CURRENT_BABY, babyId)
  }

  addBaby(baby: Baby) {
    this.babies.push(baby)
    if (this.babies.length === 1) {
      this.switchBaby(baby._id)
    }
  }

  reset() {
    this.family = null
    this.members = []
    this.babies = []
    this.currentBabyId = null
  }
}

export const familyStore = new FamilyStore()
