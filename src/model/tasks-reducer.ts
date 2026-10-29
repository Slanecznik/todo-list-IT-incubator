import type { TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";


const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return { ...state, [action.payload.id]: [] }
        }
        case 'delete_todolist': {
            const newState = { ...state }
            delete newState[action.payload.id]
            return newState
        }
        case 'delete_task': {
            const tasks = state[action.payload.todolistId]

            if (!tasks) return state

            return {
                ...state,
                [action.payload.todolistId]: tasks.filter(
                    task => task.id !== action.payload.taskId
                ),
            }
        }
        case 'create_task': {
            const todolistId = action.payload.todolistId
            const tasks = state[todolistId]

            if (!tasks) return state

            return {
                ...state,
                [todolistId]: [
                    action.payload.task,
                    ...tasks,
                ],
            }
        }
        case 'change_task_status': {
            const todolistId = action.payload.todolistId
            const tasks = state[todolistId]

            if (!tasks) return state

            return {
                ...state,
                [todolistId]: tasks.map(task =>
                    task.id === action.payload.taskId
                        ? { ...task, isDone: action.payload.isDone }
                        : task
                ),
            }
        }
        case 'change_task_title': {
            const todolistId = action.payload.todolistId
            const tasks = state[todolistId]

            if (!tasks) return state

            return {
                ...state,
                [todolistId]: tasks.map(task =>
                    task.id === action.payload.taskId
                        ? { ...task, title: action.payload.title }
                        : task
                ),
            }
        }
        default:
            return state
    }
}

export const deleteTaskAC = (payload: {
    todolistId: string
    taskId: string
}) => ({
    type: 'delete_task',
    payload,
} as const)

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

export const createTaskAC = (payload: {
    todolistId: string
    title: string
}) => ({
    type: 'create_task',
    payload: {
        todolistId: payload.todolistId,
        task: {
            id: v1(),
            title: payload.title,
            isDone: false,
        },
    },
} as const)

export type CreateTaskAction = ReturnType<typeof createTaskAC>

export const changeTaskStatusAC = (payload: {
    todolistId: string
    taskId: string
    isDone: boolean
}) => ({
    type: 'change_task_status',
    payload,
} as const)

export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (payload: {
    todolistId: string
    taskId: string
    title: string
}) => ({
    type: 'change_task_title',
    payload,
} as const)

export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions =
    | CreateTodolistAction
    | DeleteTodolistAction
    | DeleteTaskAction
    | CreateTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction