import PageHeader from "./layouts/PageHeader";
import ImageUploadForm from "./elements/ImageUploadForm";

function Upload() {
    return (
        <>
            <PageHeader title="Upload Activity Images" />
            <ImageUploadForm />
        </>
    );
}

export default Upload;