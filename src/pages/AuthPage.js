import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const registerHandler = async () => {
        try {
            const data = await request('/users/users/register', 'POST', {...form})
            message('Created user!')
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/users/users/jwt/login', 'POST', {...form})
            message('Login!')
            auth.login(data.loken, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s4 offset-s4">
                <h1>Auth Page</h1>
                <div className="card #e3f2fd blue lighten-5">
                    <div className="card-content black-text">
                        {/*<span className="card-title">Авторизация</span>*/}
                        <div>
                            <div className="input-field">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="validate"
                                    onChange={changeHandler}

                                />
                                <label htmlFor="email">Email</label>
                                {/*<span class="helper-text" data-error="wrong" data-success="right"></span>*/}
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="validate"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                                {/*<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>*/}
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn blue darken-4 login-button"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                        <button
                            className="btn blue darken-4"
                            disabled={loading}
                            onClick={registerHandler}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
