import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskQuery, useUpdateTaskMutation } from '../../store/api/task.api';
import { useForm } from 'react-hook-form';
import styled from './UpdateTask.module.scss';
import DropZoneUpdate from '../DropZone/DropZoneUpdate';

const UpdateTask = () => {
    const {id} = useParams();
    const {data, isLoading} = useGetTaskQuery({id});
    const navigate = useNavigate();
    const [updateTask] = useUpdateTaskMutation();
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit
    } = useForm();
    const [files, setFiles] = useState([]);
    const [oldImgs, setOldImgs] = useState([]); 
    const onSubmit = async (dataInp)=>{
        const proj = data.project
        if(files.length < 1 && oldImgs < 1){
            return alert('Добавьте изображение');
        }
        let formData = new FormData();
        formData.append('title', dataInp.title);
        formData.append('description', data.description)
        formData.append('project', data.project)
        if(files.length > 0){
            for(let i=0; i<files.length; i++){
                formData.append('img', files[i])
            }  
        }
        formData.append('oldImgs', JSON.stringify(oldImgs))
        await updateTask({id, formData, proj}).unwrap()
        .then((data)=>{
            alert(data.message);
            navigate(-1);
        })


    }
    useEffect(()=>{
        if(!isLoading){
            setOldImgs(data.imgs)
        }
    },[isLoading, data])
    return (
        <div className={styled.container}>
               {isLoading ? 
                <div>Loading...</div>
            :(
                <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Обновтит задачу: {data.title}</h3>
                    <div className={styled.input}>
                        <input placeholder='Назва' type="text" {...register('title', {required: true})} defaultValue={data.title}/>
                    </div>
                    <div className={styled.input}>
                        <input placeholder='Опис проекту' type="text" {...register('description', {required: true})} defaultValue={data.description}/>
                    </div>
                    <div>
                        <DropZoneUpdate files={files} setFiles={setFiles} title={'Картинки'} old={oldImgs} setOld={setOldImgs}/>
                    </div>                    
                    <div className={styled.btn}>
                        <button type='submit'>Создати</button>
                    </div>
                </form>

            )}
        </div>
    );
};

export default UpdateTask;