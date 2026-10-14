import type {Todolist} from '../App'
import {v1} from "uuid";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all',
            }

            return [...state, newTodolist]
        }
        case 'change_todolist_title': {
            return state.map(todolist =>
                todolist.id === action.payload.id
                    ? { ...todolist, title: action.payload.title }
                    : todolist
            )
        }
        case 'change_todolist_filter': {
            return state.map(todolist =>
                todolist.id === action.payload.id
                    ? { ...todolist, filter: action.payload.filter }
                    : todolist
            )
        }
        default:
            return state
    }
}

type Actions =
    | DeleteTodolistAction
    | CreateTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export const createTodolistAC = (title: string) => {
    return {
        type: 'create_todolist',
        payload: {
            id: v1(),
            title,
        },
    } as const
}

export type CreateTodolistAction =
    ReturnType<typeof createTodolistAC>

export const changeTodolistTitleAC = (payload: {
    id: string
    title: string
}) => {
    return {
        type: 'change_todolist_title',
        payload,
    } as const
}
export type ChangeTodolistTitleAction =
    ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistFilterAC = (payload: {
    id: string
    filter: 'all' | 'active' | 'completed'
}) => {
    return {
        type: 'change_todolist_filter',
        payload,
    } as const
}

export type ChangeTodolistFilterAction =
    ReturnType<typeof changeTodolistFilterAC>