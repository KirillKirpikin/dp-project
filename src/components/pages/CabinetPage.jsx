import React, { useState } from 'react';
import styled from './Cabinet.module.scss';
import { ReactComponent as PlusSvg } from '../../img/Group.svg';
import { useDispatch, useSelector } from 'react-redux';
import CreateProject from '../CreateProject/CreateProject';
import { useGetAllProjectUserQuery } from '../../store/api/api';
import { logOut } from '../../store/user/userSlice';
import ListProjUser from '../ListProjUser/ListProjUser';

const CabinetPage = () => {
    const {currentUser} = useSelector(({user})=> user)
    const dispathc = useDispatch()
    const [open, setOpen] = useState(false)
    const {isLoading ,data} = useGetAllProjectUserQuery(currentUser._id)
    return (
        <section>
            <div className={styled.container}>
                <h1 className={styled.title}>Ваш акаунт</h1>
                <div className={styled.user}>
                    <p>Email: {currentUser.email}</p>                    
                </div>
                <button onClick={()=>dispathc(logOut())}>Выйти</button>
                <button onClick={()=>setOpen(!open)} className={`${styled.btn} ${open && styled.btnActive}`}><PlusSvg/></button>
                {open && <CreateProject setOpen={setOpen}/>}
                {isLoading ? 
                    <div>Load...</div> 
                    : data && data.length > 0 ? (
                        data.map(item => (
                            <ListProjUser key={item._id} item={item}/>
                        ))
                    ) : (<div>У вас немає проектів</div>)}
                {}
            </div>
        </section>
    );
};

export default CabinetPage;