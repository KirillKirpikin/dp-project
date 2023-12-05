import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../store/api/api';
import { ReactComponent as PlusSvg } from '../../img/Group.svg';
import styled from './Task.module.scss';
import CreateTask from '../CreateTask/CreateTask';
import ListTask from '../ListTask/ListTask';

const Tasks = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, isFetching, isSuccess}= useGetProjectQuery({id});
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        if(!isFetching && !isLoading && !isSuccess){
            navigate('/cabinet');    
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching, isLoading, isSuccess])

    return (
        <div className={styled.container}>
            
            {isLoading ?
                <div>Loading...</div>
                : data ?(
                    <div className={styled.task}>
                        
                        <h3>Задачі проекта: {data.title}</h3>
                        <button onClick={()=>setOpen(!open)} className={`${styled.btn} ${open && styled.btnActive}`}><PlusSvg/></button>
                        {open && <CreateTask idProj={id} setOpen={setOpen}/>}
                        {console.log(data.tasks)}
                        {data.tasks.length > 0 ? data.tasks.map((item)=>(
                           <ListTask key={item._id} item={item}/>
                        )) : <div>Нема задач</div>
                    }
                    </div>                    
                ):<div>Not found</div> 
            }
        </div>
    );
};

export default Tasks;