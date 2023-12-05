import React, { useState } from 'react';
import styled from './Auth.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createUser, loginUser } from '../../store/user/userSlice';

const AuthPage = () => {
    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const [reject, setReject] = useState('')
    const {
        register,
        formState:{
            errors,
        }, handleSubmit
    } = useForm();

    const deleteReject = ()=>{
        if(reject){
            setReject('')
        }
    }

    const onSubmit = (data)=>{
        const payload = {
            ...data
        }
        if(isLogin){
            dispatch(loginUser(payload))
                .unwrap()
                .then(()=>{navigate('/cabinet')})
                .catch((err)=>{setReject(err)})
        }else{
            dispatch(createUser(payload))
                .unwrap()
                .then(()=>{navigate('/cabinet')})
                .catch((err)=>{setReject(err)})
        }
    }

    return (
        <section>
            <div className={styled.container}>
                <form onSubmit={handleSubmit(onSubmit)} className={styled.form} action="">
                    <h2>{isLogin ? 'Вхід' : 'Регістрація'}</h2>
                    {reject && <h4 className={styled.reject}>{reject}</h4>}
                    <div className={`${styled.input} ${errors?.email && styled.inputError}`}>
                        <input onFocus={()=>deleteReject()} {...register('email', {required: true})} placeholder='Email' type="text" />
                    </div>
                    <div  className={`${styled.input} ${errors?.password && styled.inputError}`}>
                        <input onFocus={()=>deleteReject()} {...register('password', {required: true})} placeholder='Пароль' type="text" />
                    </div>
                    <div className={styled.bottom}>
                        <button type='submit'>{isLogin ? 'Вхід' : 'Регістрація'}</button>
                        {isLogin ? <Link to='/registration'>Я не маю акаунт</Link> : <Link to='/login'>Я вже маю акаунт</Link>}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AuthPage;