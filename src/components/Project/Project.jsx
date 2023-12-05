import React from 'react';
import styled from './Project.module.scss';
import { BASE_URL_IMG } from '../../utils/constants';
import { formatDateTime } from '../../utils/formData';
import { Link } from 'react-router-dom';


const Project = ({item}) => {
    let date = formatDateTime(item.projDate)
    return (
        <Link to={`${item._id}`} className={styled.project}>
            <div className={styled.img}>
                <img src={BASE_URL_IMG + item.imgs[0]} alt="#"/>
            </div>                  
            <p className='px-2'>{date}</p>
            <p className='px-2'>{item.title}</p>
            <p>{item.description}</p>
            
        </Link>
    );
};

export default Project;