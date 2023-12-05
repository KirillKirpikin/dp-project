import React, { useState } from 'react';
import ListComponent from './ListComponent';
import { useDeleteProjectMutation } from '../../store/api/api';

const ListProjUser = ({item}) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletedProject] = useDeleteProjectMutation();
    const handleDelete = async(id)=>{
        await deletedProject(id);
        setDeleteModal(false);
    }  
    return (
        <ListComponent item={item} deleteModal={deleteModal} setDeleteModal={setDeleteModal} handleDelete={handleDelete}/>
    );
};

export default ListProjUser;