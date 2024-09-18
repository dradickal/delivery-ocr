import './imagePreview.css';
import {useState, useRef} from 'react';

function ImagePreview({file, isDuplicate, handleRemove, handleAddTime}) {
    const [time, setTime] = useState();
    const [showTimeInput, setShowTimeInput] = useState(false);
    const inputRef = useRef(null);

    function saveTime(event) {
        const target = event.currentTarget;
        const filename = target.dataset?.filename;
        const inputTime = inputRef.current.value;

        setTime(inputTime);
        setShowTimeInput(false);

        handleAddTime(filename, `${inputTime}:00`);
    }

    function imagePreviewClasses() {
        let str = showTimeInput ? 'imagePreview inputTime' : 'imagePreview';
        if (isDuplicate) {
            str = str + ' duplicateErr';
        }
        return str;
    }

    return (
        <span className={imagePreviewClasses()}>
            <img src={URL.createObjectURL(file)} title={file.name} alt={file.name} />
            
            <div className='previewWrapper fileData'>
                <p>{file.name}</p>
                <p>{time}</p>
            </div>
            
            <div className='previewWrapper buttons'>
                <button className='previewButton addTime' onClick={() => setShowTimeInput(true)}>
                    {time ? 'Edit Image Time' : 'Add Image Time'}
                </button>
                <button className='previewButton remove' data-filename={file.name} onClick={handleRemove}>
                    Remove
                </button>
            </div>
            
            <div className='previewWrapper timeBlock'>
                <input type='time' className='imageTime' ref={inputRef} defaultValue={time}/>
                <button className='previewButton saveTime' data-filename={file.name} onClick={saveTime}>
                    Set Image Time
                </button>
            </div>
        </span>
    )
}

export default ImagePreview;