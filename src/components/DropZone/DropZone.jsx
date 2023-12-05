import React from 'react';
import { useDropzone } from 'react-dropzone';
import {ReactComponent as CloseSvg} from '../../img/close.svg'
import styled from './DropZone.module.scss'


const DropZone = ({files, setFiles, title}) => {
    const onDrop = (acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const removeFile = (fileToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    };

    const { getRootProps, getInputProps, } = useDropzone({ onDrop });

    return (
        <div className={styled.dropzone}>
            <div {...getRootProps()} className={styled.zona}>
                <input {...getInputProps()} />
                <h2>Для {title}</h2>                
                <p>Перетягніть файл або клацніть, щоб вибрати файл</p>                        
            </div>
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
                            <button onClick={() => removeFile(file)}><CloseSvg/></button>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropZone;