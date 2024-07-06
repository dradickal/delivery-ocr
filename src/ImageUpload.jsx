import './imageUpload.css';
import {useState} from 'react';

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

function ImageUpload() {
    const [files, setFiles] = useState([]);
    const [ignoredFiles, setIgnoredFiles] = useState([]);
    const emptyUpload = 'No files selected for upload';


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

    function handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.target);
        console.log("event: ", event);
        console.log("Initial formData: ", data);

        console.log("files state: ", files);

        for (const file of files) {
            data.append('images', file);
        }

        console.log("Appended formData: ", data);

    }

    return (
        <>
            <h1>Upload Delivery Actions</h1>
            <div className="imageUpload">
                <label htmlFor="image-input">Choose Images to Upload</label>
                <input type="file" id="image-input" multiple name="images" accept="image/*" onChange={handleFileSelection}/>
                <br />
                <div id="preview">
                    {files.map(file => 
                        <img src={URL.createObjectURL(file)} title={file.name} alt={file.name} key={file.name} width="200"/>
                    )}
                </div> 
                <pre>{files.length ? '' : emptyUpload}</pre>
                <pre>{ignoredFiles.length ? `Selected files are already included for upload:\n ~ ${ignoredFiles.join("\n ~ ")}` : ''}</pre>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input type='radio' name='app-service' value="GH" required defaultChecked/>
                        Grubhub
                    </label>
                    <label>
                        <input type='radio' name='app-service' value="DD" disabled/>
                        DoorDash
                    </label>
                </div>
                
                <button type="submit">Upload</button>
            </form>
        </>
    )
};

export default ImageUpload;
