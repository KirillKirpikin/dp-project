import React from 'react';
import Modal from '../Modal/Modal';
import {ReactComponent as UpdateSvg} from '../../img/update.svg';
import {ReactComponent as TrashSvg} from '../../img/trash.svg';

import styled from './List.module.scss';
import { BASE_URL_IMG } from '../../utils/constants';
import { Link } from 'react-router-dom';

const ListComponent = ({item, deleteModal, setDeleteModal, handleDelete}) => {
    return (
        <>
            <div className={styled.project}>
                <div className={styled.img}>
                    <img src={BASE_URL_IMG + item.imgs[0]} alt="#"/>
                </div>                  
                <p className='px-2'>{item.title}</p>
                <div className={styled.btns}>
                    <Link to={`/cabinet/task/${item._id}`}>Задачі</Link>
                    <Link to={`/cabinet/update-proj/${item._id}`} ><UpdateSvg/></Link>
                    <button onClick={()=>setDeleteModal(true)}><TrashSvg/></button>
                </div>                
            </div>
            <Modal active={deleteModal} setActive={setDeleteModal}>
                <div className={styled.modal}>
                    <h3>Удалить</h3>
                    <p>Вы уверены что хотите удалить: <br /> <br /> <span> {item.title}</span></p>
                    <div className={styled.modal__btns}>
                        <button onClick={()=> setDeleteModal(false)}>Отменить</button>
                        <button onClick={()=>handleDelete(item._id)} >Удалить</button>
                    </div> 
                </div>
            </Modal>
        </>

    );
};

export default ListComponent;