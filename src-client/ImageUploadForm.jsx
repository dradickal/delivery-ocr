import './imageUploadForm.css';
import ImageUploadInput from './ImageUploadInput';
import { useState } from 'react';


function ImageUploadForm() {
    const [files, setFiles] = useState([]);
    const [definedTimes, setDefinedTimes] = useState ({});

    function handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.target);

        for (const file of files) {
            data.append('images', file);
        }

        data.append("userDefinedTimes", JSON.stringify(definedTimes));

        const request = new Request("http://localhost:3001/image/upload", {
            method: "POST",
            body: data,
        });

        fetch(request).then((response) => {
            if(!response.ok) {
                console.log('Form Submit - ERROR:', response.status);
            }

            console.log('Form Submit - SUCCESS:', response.body);
        })
    }

    return (
        <>
            <h1>Upload Delivery Actions</h1>
            <ImageUploadInput files={files} definedTimes={definedTimes} setFiles={setFiles} setDefinedTimes={setDefinedTimes} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input type='radio' name='serviceId' value="1" required defaultChecked />
                        Grubhub
                    </label>
                    <label>
                        <input type='radio' name='serviceId' value="2" disabled />
                        DoorDash
                    </label>
                </div>
                <br />
                <label>
                    Date of Work <br />
                    <input type='date' name='associatedDate'/>
                </label>
                <br />
                <button type="submit">Upload</button>
            </form>
        </>
    )
};

export default ImageUploadForm;
