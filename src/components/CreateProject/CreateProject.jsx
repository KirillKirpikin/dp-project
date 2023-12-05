import React, { useMemo, useState } from 'react';
import styled from './CreateProject.module.scss'
import { useForm } from 'react-hook-form';
import Seelct from '../Select/Seelct';
import DropZone from '../DropZone/DropZone';
import { useCreateProjectMutation } from '../../store/api/api';
import { useSelector } from 'react-redux';

const CreateProject = ({setOpen}) => {
    const options= useMemo(()=>['Низька', 'Середня', 'Висока'], []);
    const [selected, setSelected] = useState(options[0]);
    const {currentUser} = useSelector(({user})=> user);
    const [files, setFiles] = useState([]);
    const [createProject] = useCreateProjectMutation();
    

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
        formData.append('criticality', selected)       
        formData.append('user', currentUser._id)        
        for(let i=0; i<files.length; i++){
            formData.append('img', files[i])
        }

        createProject(formData).unwrap()
            .then((data)=>{
                alert(data.message)
                setOpen(false)
            })
    }

    return (
        <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
            <h3>Новий проект</h3>
            <div className={styled.input}>
                <input placeholder='Назва' type="text" {...register('title', {required: true})}/>
            </div>
            <div className={styled.input}>
                <input placeholder='Опис проекту' type="text" {...register('description', {required: true})}/>
            </div>
            <div>
                <DropZone files={files} setFiles={setFiles} title={'Картинки'}/>
            </div>
            <div className={styled.select}>
                <h5>Критичність: </h5>
                <Seelct arr={options} selected={selected} setSelected = {setSelected}/>
            </div>
            
            <div className={styled.btn}>
                <button type='submit'>Создати</button>
            </div>
        </form>
    );
};

export default CreateProject;