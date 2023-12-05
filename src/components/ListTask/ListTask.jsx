import React, { useState } from 'react';
import { useDeleteTaskMutation } from '../../store/api/task.api';
import ItemTask from './ItemTask';

const ListTask = ({item}) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteTask] = useDeleteTaskMutation();
    const handleDelete = async(id)=>{
        await deleteTask(id);
        setDeleteModal(false);
    }
    return (
        <ItemTask item={item} deleteModal={deleteModal} setDeleteModal={setDeleteModal} handleDelete={handleDelete}/>
    );
};

export default ListTask;