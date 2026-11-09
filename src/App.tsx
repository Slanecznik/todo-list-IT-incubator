import {
    deleteTaskAC,
    createTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
} from '@/model/tasks-reducer'

import { TodolistItem } from '@/TodolistItem'
import CreateItemForm from '@/CreateItemForm'
import type { Task } from '@/model/tasks-reducer'

import {
    createTodolistAC,
    deleteTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
} from '@/model/todolists-reducer'

import type { FilterValues } from '@/model/todolists-reducer'

import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useAppSelector } from '@/common/hooks/useAppSelector'

import { selectTasks } from '@/model/tasks-selectors'
import { selectTodolists } from '@/model/todolists-selectors'
import { selectThemeMode } from '@/app/app-selectors'

import { getTheme } from '@/common/theme/theme'
import { Header } from '@/common/components/Header/Header'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


export const App = () => {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({ id: todolistId, filter }))
    }

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({ id: todolistId }))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({ id: todolistId, title }))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({ todolistId, taskId }))
    }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({ todolistId, title }))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({ todolistId, taskId, title }))
    }

    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Header />

            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
                    <CreateItemForm onCreateItem={createTodolist} />
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(todolist => {
                        const todolistTasks = tasks[todolist.id]
                        let filteredTasks = todolistTasks

                        if (todolist.filter === 'active') {
                            filteredTasks = todolistTasks.filter((task: Task) => !task.isDone)
                        }

                        if (todolist.filter === 'completed') {
                            filteredTasks = todolistTasks.filter((task: Task) => task.isDone)
                        }

                        return (
                            <Grid key={todolist.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
                                    <TodolistItem
                                        todolist={todolist}
                                        tasks={filteredTasks}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        createTask={createTask}
                                        changeTaskStatus={changeTaskStatus}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}