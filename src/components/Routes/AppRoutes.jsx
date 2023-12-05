import React, {lazy} from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';

const HomePage = lazy(()=>import('../pages/HomePage'));
const AuthPage = lazy(()=>import('../pages/AuthPage'));
const CabinetPage = lazy(()=>import('../pages/CabinetPage'));
const Tasks = lazy(()=>import('../pages/Tasks'));
const SingleProjectPage = lazy(()=>import('../pages/SingleProjectPage'));
const UpdateProject = lazy(()=>import('../UpdateProject/UpdateProject'));
const UpdateTask = lazy(()=>import('../UpdateTask/UpdateTask'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path='registration' element={<AuthPage/>}/>
            <Route path='login' element={<AuthPage/>}/>
            <Route path=':id' element={<SingleProjectPage/>}/>
            <Route path='cabinet' element={
                <PrivateRoute>
                    <CabinetPage/>
                </PrivateRoute>
            }/>
            <Route path='cabinet/task/:id' element={
                <PrivateRoute>
                    <Tasks/>
                </PrivateRoute>
            }/>
            <Route path='cabinet/update-proj/:id' element={
                <PrivateRoute>
                    <UpdateProject/>
                </PrivateRoute>
            }/>
            <Route path='cabinet/update-task/:id' element={
                <PrivateRoute>
                    <UpdateTask/>
                </PrivateRoute>
            }/>
        </Routes>
    );
};

export default AppRoutes;