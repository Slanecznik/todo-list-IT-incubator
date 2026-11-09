import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Switch from '@mui/material/Switch'

import { NavButton } from '@/NavButton'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { selectThemeMode } from '@/app/app-selectors'
import { changeThemeModeAC } from '@/app/app-reducer'
import { getTheme } from '@/common/theme/theme'

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({
            themeMode: themeMode === 'light' ? 'dark' : 'light'
        }))
    }

    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar>
                <Container maxWidth={'lg'}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>

                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>
                            Faq
                        </NavButton>

                        <Switch
                            checked={themeMode === 'dark'}
                            onChange={changeMode}
                        />
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}