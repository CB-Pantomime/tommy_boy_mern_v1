import React, { useState, useEffect } from 'react';
import Alert from '../components/Alert';
import { useAuthContext } from "../hooks/useAuthContext"

export default function Upload() {
    const {user} = useAuthContext();

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        console.log('this is handleFileInputChange func')
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
        console.log('handling preview file')
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        console.log('handling submit file')
        if (!selectedFile) return;
        const reader = new FileReader();
        console.log(`This is the reader: ${reader}`)
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {

        try {
            console.log('uploadImage(), inside TRY block')
            // THE ISSUE IS HERE SOMEWHERE
            await fetch('/api/v1/blogs', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                 },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.log(`This is a frontend catch error: ${err}`);
            setErrMsg('Something went wrong!');
        }
    };
    return (
        <div>
            <h1 className="title">Upload an Image</h1>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
}