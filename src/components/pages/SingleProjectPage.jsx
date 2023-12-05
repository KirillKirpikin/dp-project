import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from './Single.module.scss'
import { useGetAllProjectQuery, useGetProjectQuery } from '../../store/api/api';
import { BASE_URL_IMG } from '../../utils/constants';
import { formatDateTime } from '../../utils/formData';

const SingleProjectPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, isFetching, isSuccess} = useGetProjectQuery({id});

    useEffect(()=>{
        if(!isFetching && !isLoading && !isSuccess){
            navigate('/');    
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoading, isFetching, isSuccess])
    return (
        <section>
            <div className={styled.container}>
                {isLoading ? 
                    <div>Loading...</div>
                    : data ? (
                        <>
                        {console.log(data)}
                            <h2 className={styled.title}>Проект: {data.title}</h2>
                            <div className={styled.top}>
                                <div className={styled.img}>
                                    <img src={BASE_URL_IMG + data.imgs[0]} alt="#"/>
                                </div>
                                <div className={styled.info}>                                    
                                    <p><span>Дата:</span>{formatDateTime(data.projDate)}</p>
                                    <p> <span>Назва:</span>{data.title}</p>
                                    <p><span>Опис:</span>{data.description}</p>
                                </div>
                            </div>
                            <div className={styled.criticality}>
                                <h4>Критичність:</h4>
                                <div className={styled.scale}>
                                    {data.criticality === 'Низька' && <div className={styled.scale__green}><span>{data.criticality}</span></div>}
                                    {data.criticality === 'Середня' && <div className={styled.scale__yellow}><span>{data.criticality}</span></div>}
                                    {data.criticality === 'Висока' && <div className={styled.scale__red}><span>{data.criticality}</span></div>}
                                </div>
                            </div>
                            <div className={styled.task}>
                                <h4>Задачі</h4>
                                {data.tasks.length > 0 
                                    ? data.tasks.map((item)=>(
                                        <div className={styled.task__main}>                                            
                                            <div className={styled.task__img}>
                                                <img src={BASE_URL_IMG + item.imgs[0]} alt="#"/>
                                            </div>
                                            <div className={styled.task__info}>
                                                <p><span>Назва задачі:</span>{item.title}</p>
                                                <p><span>Опис задачі:</span>{item.description}</p>
                                            </div>
                                        </div>
                                    )) : (<div>Немає задач</div>) 
                                 }
                                

                            </div>

                        </>

                    ):<div>Not found</div>
                }
            </div>            
        </section>
    );
};

export default SingleProjectPage;