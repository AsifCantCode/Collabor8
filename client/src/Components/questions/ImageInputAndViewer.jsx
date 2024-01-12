import classes from "../../Styles/AskQuestion.module.css";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ImageInputAndViewer = ({
    selectedImage = [],
    setSelectedImage,
    imageViewer,
    setImageViewer,
    previousImages = [],
    imageInputRef,
    fileError,
    setFileError,
    width = "15rem",
    height = "15rem",
}) => {
    const { newUser } = useAuthContext();
    const { badgeCheck } = useGlobalContext();
    const navigate = useNavigate();

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
        console.log(selectedImage?.length, previousImages?.length);
        if (
            newUser?.subscription?.status ||
            badgeCheck[newUser?.badge]?.imageLimit >
                selectedImage?.length + previousImages?.length
        )
            imageInputRef.current.click();
        else {
            // NotificationManager.info("This is a notification message.");
            toast.error(
                "You have reached your image limit. Please take subscription."
            );
            console.log("You have reached your image limit");
        }
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
                            style={{ width: width, height: height }}
                        >
                            <span className={`${classes["delete-btn"]}`}>
                                <RiDeleteBin5Fill />
                            </span>
                            <img src={image} alt="Selected" />
                        </div>
                    ))}
                <div
                    style={{ width: width, height: height }}
                    className={classes.imageBox}
                    onClick={handleImageClick}
                >
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
