import React from 'react';
import styled from './modal.module.scss';

const Modal = ({active, setActive, children}) => {
    return (
        <div className={`${styled.modal} ${active && styled.active}`} onClick={()=> setActive(false)}>
            <div className={styled.container}>
                <div className={styled.content} onClick={(e)=>e.stopPropagation()}>
                    {children}
                </div>                
            </div>
             
        </div>
    );
};

export default Modal;