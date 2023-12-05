import React, { useEffect, useMemo, useState } from 'react';
import styled from './UpdateProject.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectQuery, useUpdateProjectMutation } from '../../store/api/api';
import { useForm } from 'react-hook-form';
import DropZoneUpdate from '../DropZone/DropZoneUpdate';
import Seelct from '../Select/Seelct';
import { useSelector } from 'react-redux';

const UpdateProject = () => {
    const {id} = useParams();
    const options= useMemo(()=>['Низька', 'Середня', 'Висока'], []);
    const {currentUser} = useSelector(({user})=> user);
    const [selected, setSelected] = useState(options[0]);
    let {data, isLoading} = useGetProjectQuery({id});
    const navigate = useNavigate();
    const [updateProject] = useUpdateProjectMutation();
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
        if(files.length < 1 && oldImgs < 1){
            return alert('Добавьте изображение');
        }
        let formData = new FormData();
        formData.append('title', dataInp.title);
        formData.append('description', data.description)
        formData.append('criticality', selected)  
        formData.append('user', currentUser._id)  
        if(files.length > 0){
            for(let i=0; i<files.length; i++){
                formData.append('img', files[i])
            }  
        }
        formData.append('oldImgs', JSON.stringify(oldImgs))
        await updateProject({id, formData}).unwrap()
            .then((data)=>{
                alert(data.message);
                navigate(-1);
            })
    }

    useEffect(()=>{
        if(!isLoading){
            setSelected(data.criticality);
            setOldImgs(data.imgs)
        }
    }, [isLoading, data])

    return (
        <div className={styled.container}>
            {isLoading ? 
                <div>Loading...</div>
            :(
                <form className={styled.form} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Обновтит проект: {data.title}</h3>
                    <div className={styled.input}>
                        <input placeholder='Назва' type="text" {...register('title', {required: true})} defaultValue={data.title}/>
                    </div>
                    <div className={styled.input}>
                        <input placeholder='Опис проекту' type="text" {...register('description', {required: true})} defaultValue={data.description}/>
                    </div>
                    <div>
                        <DropZoneUpdate files={files} setFiles={setFiles} title={'Картинки'} old={oldImgs} setOld={setOldImgs}/>
                    </div>
                    <div className={styled.select}>
                        <h5>Критичність: </h5>
                        <Seelct arr={options} selected={selected} setSelected = {setSelected}/>
                    </div>
                    
                    <div className={styled.btn}>
                        <button type='submit'>Создати</button>
                    </div>
                </form>

            )}
        </div>

    );
};

export default UpdateProject;