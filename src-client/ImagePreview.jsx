import './imagePreview.css';

function ImagePreview({file, handleRemove}) {
    return (
        <span className="imagePreview">
            <img src={URL.createObjectURL(file)} title={file.name} alt={file.name} />
            <button className='remove' data-filename={file.name} onClick={handleRemove}>Remove</button>
        </span>
    )
}

export default ImagePreview;