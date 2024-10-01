import ImagePreview from './ImagePreview';
import {useContext, useState} from 'react';
import { ErrorContext } from './ErrorContext';

function getIntersectingFilenames(currentFiles, newFiles) {
    const currentFilenames = new Set(currentFiles.map((file) => file.name));
    const newFilenames = new Set(newFiles.map((file) => file.name));

    return currentFilenames.intersection(newFilenames);
}

// filenames is of type Set
function removeFilesByName(files, filenames) {
    return filenames.size 
        ? files.filter(file => !filenames.has(file.name))
        : files;
}

function ImageUploadInput({files, definedTimes, setFiles, setDefinedTimes}) {
    const [ignoredFiles, setIgnoredFiles] = useState([]);
    const emptyUpload = 'No files selected for upload';
    const submitError = useContext(ErrorContext);

    function handleFileSelection(filesEvent) {
        console.log("file change triggered");
        // convert FileList to Array<File>
        const newFiles = [...filesEvent.target.files];
        
        if (files.length) {
            const duplicateNames = getIntersectingFilenames(files, newFiles);
            const uniqueFiles = removeFilesByName(newFiles, duplicateNames);
            setFiles([...files, ...uniqueFiles]);
            setIgnoredFiles([...duplicateNames]);
        } else {
            setFiles(newFiles);
        }
    }

    function handleAddTime(filename, time) {
        const newTimes = Object.assign({}, definedTimes);
        newTimes[filename] = time;

        setDefinedTimes(newTimes);
    }

    function handleRemove(event) {
        const target = event.currentTarget;
        const filename = target.dataset?.filename;
        const updatedFiles = removeFilesByName(files, new Set([filename]));

        setFiles(updatedFiles);        
    }

    return (
        <div className="imageUploadInput">
            <label className="button" htmlFor="upload-input">Select Images</label>
            <input type="file" id="upload-input" multiple name="images" accept="image/*" onChange={handleFileSelection}/>
            <br />
                <pre>
                    {!files.length && emptyUpload}
                    {!!ignoredFiles.length && `Selected files are already included for upload:\n ~ ${ignoredFiles.join("\n ~ ")}`}
                    {!!submitError.hasOwnProperty('message') && submitError.message }
                </pre>
            <div id="preview">
                {files.map(file => 
                    <ImagePreview 
                        file={file} 
                        handleRemove={handleRemove} 
                        handleAddTime={handleAddTime} 
                        key={file.name} />
                )}
            </div> 
        </div>
    )
}

export default ImageUploadInput;
