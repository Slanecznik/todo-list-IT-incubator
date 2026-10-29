import {useReducer, useState} from "react";
import {
    tasksReducer,
    deleteTaskAC,
    createTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
} from './model/tasks-reducer'
import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import CreateItemForm from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {NavButton} from "./NavButton.ts"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    todolistsReducer,
    createTodolistAC,
    deleteTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
} from './model/todolists-reducer'

type ThemeMode = 'dark' | 'light'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const [todolists, dispatchToTodolists] =
        useReducer(todolistsReducer, [])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)

        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(deleteTaskAC({ todolistId, taskId }))
    }


    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatchToTodolists(
            changeTodolistFilterAC({id: todolistId, filter})
        )
    }

    const createTask = (todolistId: string, title: string) => {
        dispatchToTasks(createTaskAC({ todolistId, title }))
    }

    const changeTaskStatus = (
        todolistId: string,
        taskId: string,
        isDone: boolean
    ) => {
        dispatchToTasks(changeTaskStatusAC({ todolistId, taskId, isDone }))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId))
        dispatchToTasks(deleteTodolistAC(todolistId))
    }

    const changeTaskTitle = (
        todolistId: string,
        taskId: string,
        title: string
    ) => {
        dispatchToTasks(changeTaskTitleAC({ todolistId, taskId, title }))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(
            changeTodolistTitleAC({id: todolistId, title})
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar>
                    <Container maxWidth={'lg'}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch
                                checked={themeMode === 'dark'}
                                onChange={changeMode}
                            />
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(todolist => {
                        const todolistTasks = tasks[todolist.id]
                        let filteredTasks = todolistTasks
                        if (todolist.filter === 'active') {
                            filteredTasks = todolistTasks.filter(task => !task.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            filteredTasks = todolistTasks.filter(task => task.isDone)
                        }

                        return (
                            <Grid key={todolist.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
                                    <TodolistItem
                                        key={todolist.id}
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

