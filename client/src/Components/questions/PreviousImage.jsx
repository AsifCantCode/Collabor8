import classes from "../../Styles/AskQuestion.module.css";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
const PreviousImage = ({ previousImages, setPreviousImages }) => {
    const handleDeleteImage = (index) => {
        console.log(index);
        const newImages = previousImages.filter((image, i) => i !== index);
        setPreviousImages(newImages);
    };
    return (
        <div className={`${classes["attachments"]}`}>
            <p>Previous Image</p>
            <div className={`${classes["images"]}`}>
                {previousImages &&
                    previousImages.length > 0 &&
                    previousImages.map((image, index) => (
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
            </div>
        </div>
    );
};

export default PreviousImage;
