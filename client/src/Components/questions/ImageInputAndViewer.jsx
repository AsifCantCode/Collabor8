import classes from "../../Styles/AskQuestion.module.css";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
const ImageInputAndViewer = ({
    selectedImage,
    setSelectedImage,
    imageViewer,
    setImageViewer,
    imageInputRef,
    fileError,
    setFileError,
}) => {
    const handleImageChange = (event) => {
        setFileError(false);
        const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
        const file = event.target.files[0];
        if (allowedImageTypes.includes(file.type)) {
            setSelectedImage([...selectedImage, file]);
            console.log(file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageViewer([...imageViewer, reader.result]);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFileError(true);
        }
    };

    const handleImageClick = () => {
        // Trigger the file input when the box is clicked
        imageInputRef.current.click();
    };
    const handleDeleteImage = (index) => {
        console.log(index);
        const newImages = selectedImage.filter((image, i) => i !== index);
        const newImageViewer = imageViewer.filter((image, i) => i !== index);
        setImageViewer(newImageViewer);
        setSelectedImage(newImages);
    };
    return (
        <div className={`${classes["attachments"]}`}>
            <p>Attachment Image (Optional)</p>
            <div className={`${classes["images"]}`}>
                {imageViewer &&
                    imageViewer.length > 0 &&
                    imageViewer.map((image, index) => (
                        <div
                            key={index}
                            className={classes.imageBox}
                            onClick={() => {
                                handleDeleteImage(index);
                            }}
                        >
                            <span className={`${classes["delete-btn"]}`}>
                                <RiDeleteBin5Fill />
                            </span>
                            <img src={image} alt="Selected" />
                        </div>
                    ))}
                <div className={classes.imageBox} onClick={handleImageClick}>
                    <LuImagePlus />
                </div>
            </div>

            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={imageInputRef}
            />
        </div>
    );
};

export default ImageInputAndViewer;
