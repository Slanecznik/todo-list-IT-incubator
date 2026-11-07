import type { TasksState} from '../App'
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit'


const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })

        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })

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

        .addCase(createTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId]

            if (!tasks) return

            tasks.unshift(action.payload.task)
        })

        .addCase(changeTaskStatusAC, (state, action) => {
            // Получаем массив задач нужного TodoList
            const tasks = state[action.payload.todolistId]

            // Если такого списка нет, прекращаем обработку
            if (!tasks) return

            // Ищем задачу по её ID
            const task = tasks.find(
                task => task.id === action.payload.taskId
            )

            // Если задача найдена, меняем её статус
            if (task) {
                task.isDone = action.payload.isDone
            }
        })

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

export const deleteTaskAC = createAction<{
    todolistId: string
    taskId: string
}>('tasks/deleteTask')

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

export const changeTaskStatusAC = createAction<{
    todolistId: string
    taskId: string
    isDone: boolean
}>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{
    todolistId: string
    taskId: string
    title: string
}>('tasks/changeTaskTitle')

