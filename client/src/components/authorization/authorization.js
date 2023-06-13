import './authorization.css'
import { useForm } from "react-hook-form";
import { checkAuthorization, setAuthToken } from '../api/api'
import { useEffect, useState } from 'react'
import './authorization.css'
import { useNavigate } from 'react-router-dom';
import { useStores } from '../../store/rootstore';

const Authorization = () => {

    const [errors, setErrors] = useState()
    const { register, handleSubmit } = useForm({});

    const { authStore } = useStores()

    const navigate = useNavigate()
    

    const signIn = (data, e) => {
        e.preventDefault()
        checkAuthorization(data).then(({token, role}) => {
            authStore.setToken(token)
            authStore.setUsername(data.username)
            authStore.setRole(role)
            console.log('role: ',role)
            navigate('/diary')
        }).catch(() => setErrors('Неверный логин или пароль'))
    }



    return (
        <div className='authorization'>
            <form className='container'>
                <div className="mb-3">
                    <label className="form-label">Логин</label>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Login" k
                        {...register('username', { required: 'Поле обязательное к заполению' })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input type="password"
                        className="form-control new-post-label"
                        placeholder="Password"
                        {...register('password', { required: 'Поле обязательное к заполению' })}
                    />
                </div>
                {errors && <p style={{ color: 'red' }}>{errors}</p>}
                <button type="submit" className="btn btn-primary" onClick={handleSubmit((data, e) => signIn(data, e))}>Войти</button>
            </form>
        </div>
    )
}

export default Authorization