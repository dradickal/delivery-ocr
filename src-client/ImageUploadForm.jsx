import './imageUploadForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from "@fortawesome/pro-regular-svg-icons";
import ImageUploadInput from './ImageUploadInput';
import PageHeader from './PageHeader';
import { useRef, useState } from 'react';

function PostRequest(data, files, definedTimes) {
    for (const file of files) {
        data.append('images', file);
    }

    data.append('userDefinedTimes', JSON.stringify(definedTimes));

    return fetch('http://localhost:3001/image/upload', {
        method: "POST",
        body: data,
    })
}

function ImageUploadForm() {
    const [files, setFiles] = useState([]);
    const [definedTimes, setDefinedTimes] = useState ({});
    const [serviceId, setServiceId] = useState();
    const formEl = useRef();

    function handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.target);

        PostRequest(data, files, definedTimes).then((response) => {
            if(!response.ok) {
                console.log('Form Submit - ERROR:', response.status);
            }

            console.log('Form Submit - SUCCESS:', response.body);
        })
    }

    function updateService() {
        const radioEl = formEl.current.querySelector('input[name="serviceId"]:checked');
        if (radioEl) {
            setServiceId(radioEl.value);
        }
    }

    return (
        <>
            <PageHeader title="Upload Action Images" />
            <ImageUploadInput files={files} definedTimes={definedTimes} setFiles={setFiles} setDefinedTimes={setDefinedTimes} />
            <form onSubmit={handleSubmit} ref={formEl}>
                <div className='serviceInput' onChange={updateService}>
                    <span>Delivery Service</span><br />
                    <label className={serviceId === '1' ? 'selected' : ''} for='gh-service'>
                        {serviceId === '1' ? <FontAwesomeIcon icon={faLocationDot} /> : ''}
                        Grubhub
                    </label>
                    <label className={serviceId === '2' ? 'selected' : ''} for='dd-service'>
                        {serviceId === '2' ? <FontAwesomeIcon icon={faLocationDot} /> : ''}
                        DoorDash
                    </label>
                    <input id='gh-service' type='radio' name='serviceId' value='1' required />
                    <input id='dd-service' type='radio' name='serviceId' value='2' />
                       
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
