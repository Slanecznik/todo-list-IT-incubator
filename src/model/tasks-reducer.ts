
import type { TasksState } from '../App'
import { createTodolistAC, deleteTodolistAC } from './todolists-reducer.ts'
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'

// Начальное состояние
const initialState: TasksState = {}

// 1. Action Creators

// Удаление задачи
export const deleteTaskAC = createAction<{
    todolistId: string
    taskId: string
}>('tasks/deleteTask')

// Создание задачи
export const createTaskAC = createAction(
    'tasks/createTask',
    (payload: { todolistId: string; title: string }) => {
        return {
            payload: {
                todolistId: payload.todolistId,
                task: {
                    id: nanoid(),
                    title: payload.title,
                    isDone: false,
                },
            },
        }
    }
)

// Изменение статуса задачи
export const changeTaskStatusAC = createAction<{
    todolistId: string
    taskId: string
    isDone: boolean
}>('tasks/changeTaskStatus')

// Изменение названия задачи
export const changeTaskTitleAC = createAction<{
    todolistId: string
    taskId: string
    title: string
}>('tasks/changeTaskTitle')

// 2. Reducer

export const tasksReducer = createReducer(initialState, builder => {
    builder
        // Создание TodoList
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })

        // Удаление TodoList
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })

        // Удаление задачи
        .addCase(deleteTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId]

            if (!tasks) return

            const index = tasks.findIndex(
                task => task.id === action.payload.taskId
            )

            if (index !== -1) {
                tasks.splice(index, 1)
            }
        })

        // Создание задачи
        .addCase(createTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId]

            if (!tasks) return

            tasks.unshift(action.payload.task)
        })

        // Изменение статуса задачи
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId]

            if (!tasks) return

            const task = tasks.find(
                task => task.id === action.payload.taskId
            )

            if (task) {
                task.isDone = action.payload.isDone
            }
        })

        // Изменение названия задачи
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId]

            if (!tasks) return

            const task = tasks.find(
                task => task.id === action.payload.taskId
            )

            if (task) {
                task.title = action.payload.title
            }
        })
})
