import type { Todolist } from '@/App'
import type { RootState } from '@/app/store'

export const selectTodolists = (state: RootState): Todolist[] => state.todolists