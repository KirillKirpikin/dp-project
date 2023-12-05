import React, { useState } from 'react';

import styled from './CreateTask.module.scss'
import { useForm } from 'react-hook-form';
import DropZone from '../DropZone/DropZone';
import { useCreateTaskMutation } from '../../store/api/task.api';

const CreateTask = ({ idProj ,setOpen}) => {
    const [files, setFiles] = useState([]);
    const [createTask] = useCreateTaskMutation();
    const {
        register,
        formState:{
            errors,
        }, handleSubmit
    } = useForm();

    const onSubmit = (data)=>{
        if(files.length < 1){
            return alert('Добавьте изображение')
        }
        let formData = new FormData();
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('project', idProj)
        for(let i=0; i<files.length; i++){
            formData.append('img', files[i])
        }

        createTask(formData).unwrap()
            .then((data)=>{
                alert(data.message)
                setOpen(false)
            })

    }
    return (
        <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Нова задача</h3>
        <div className={styled.input}>
            <input placeholder='Назва задачі' type="text" {...register('title', {required: true})}/>
        </div>
        <div className={styled.input}>
            <input placeholder='Опис задачі' type="text" {...register('description', {required: true})}/>
        </div>
        <div>
            <DropZone files={files} setFiles={setFiles} title={'Зображення задачі'}/>
        </div>        
        
        <div className={styled.btn}>
            <button type='submit'>Создати</button>
        </div>
    </form>
    );
};

export default CreateTask;