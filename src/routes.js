import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ProfilePage} from './pages/ProfilePage'
import {StudyWordsPage} from './pages/StudyWordsPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/profile' exect>
                    <ProfilePage />
                </Route>
                <Route path='/study-words' exect>
                    <StudyWordsPage />
                </Route>
                <Redirect to='/profile' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exect>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}


