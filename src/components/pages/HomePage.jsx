import React, { useEffect, useMemo, useState } from 'react';
import Seelct from '../Select/Seelct';
import styled from './Home.module.scss';
import Project from '../Project/Project';
import { useGetAllProjectQuery } from '../../store/api/api';


const HomePage = () => {
    const options= useMemo(()=>['Більш раніші', 'Більш пізні', 'Від А до Я', 'Від Я до А'], []);
    const [selected, setSelected] = useState(options[0]);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const {isLoading, data } = useGetAllProjectQuery(useMemo(() => ({search, selected}), [search, selected]))

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setSearch(searchInput)
        }, 700);

        return () => clearTimeout(delayTimer);
    }, [searchInput]);


    return (
        <section>
            <div className={styled.container}>
                <div className={styled.top}>
                    <h1 className={styled.title}>Проекти</h1>                
                    <div className={styled.filter}>
                        <Seelct arr={options} selected={selected} setSelected = {setSelected}/>
                        <input 
                            placeholder='Пошук...' 
                            type="text" 
                            value={searchInput}
                            onChange={(e) =>setSearchInput(e.target.value)} />                        
                    </div>
                </div>
                <div className={styled.projects}>
                    {isLoading ?
                        <div>Loading...</div>
                        : data && data.length > 0 ?(
                            data.map(item=>(
                                <Project key={item._id} item={item}/>
                            ))
                        ): (<div>Not Found</div>)
                    }                 
                </div>
            </div>
            
        </section>
    );
};

export default HomePage;