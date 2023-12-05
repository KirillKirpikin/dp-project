import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {ReactComponent as CloseSvg} from '../../img/close.svg'
import { BASE_URL_IMG } from '../../utils/constants';
import styled from './DropZone.module.scss'

const DropZoneUpdate = ({files,setFiles, title, old, setOld}) => {

    const onDrop = (acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        // console.log(acceptedFiles);
    };   

    const removeFile = (fileToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    };

    const removeServerFiles = (fileRem) =>{
        setOld((prev) => prev.filter((file) => file !== fileRem))
    }

    const { getRootProps, getInputProps, } = useDropzone({ onDrop });

    return (
        <div className={styled.dropzone}>
            <div {...getRootProps()} className={styled.zona}>
                <input {...getInputProps()} />
                <h2>Для {title}</h2>                
                <p>Перетягніть файл або клацніть, щоб вибрати файл</p>                        
            </div>
            {old.length > 0 && (
                <div className={styled.files}>
                    <h4>Файлы с сервера:</h4>
                    <ul className={styled.list}>
                        {old.map((file) => (
                        <li className={styled.item} key={file}>
                            <img
                                src={BASE_URL_IMG + file}
                                alt={file}                                
                            />
                            <button onClick={() => removeServerFiles(file)}><CloseSvg/></button>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
            {files.length > 0 && (
                <div className={styled.files}>
                    <h4>Загруженные файлы:</h4>
                    <ul className={styled.list}>
                        {files.map((file) => (
                        <li className={styled.item} key={file.name}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}                                
                            />
                            <button onClick={() => {
                                removeFile(file)
                                URL.revokeObjectURL(URL.createObjectURL(file));
                            }}><CloseSvg/></button>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
                        
        </div>
    );
};

export default DropZoneUpdate;
