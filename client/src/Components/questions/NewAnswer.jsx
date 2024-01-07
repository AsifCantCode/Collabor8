import classes from "../../Styles/AnswerBox.module.css";
import { SmallButtonLiteAc } from "../Buttons";
import ImageInputAndViewer from "./ImageInputAndViewer";
import PreviousImage from "./PreviousImage";
const NewAnswer = (props) => {
    const {
        selectedImage,
        setSelectedImage,
        imageViewer,
        setImageViewer,
        imageInputRef,
        fileError,
        setFileError,
        editMode,
        handleConfirmEdit,
        previousImages,
        setPreviousImages,
        handleConfirmAnswer,
        answerText,
        setAnswerText,
    } = props;
    return (
        <div className={`${classes["answer"]}`}>
            <textarea
                name=""
                id=""
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
            ></textarea>
            {editMode && (
                <PreviousImage
                    previousImages={previousImages}
                    setPreviousImages={setPreviousImages}
                    width="5rem"
                    height="5rem"
                />
            )}
            <ImageInputAndViewer
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                imageViewer={imageViewer}
                setImageViewer={setImageViewer}
                imageInputRef={imageInputRef}
                fileError={fileError}
                setFileError={setFileError}
                width="5rem"
                height="5rem"
            />
            <div className={`${classes["submit-btn"]}`}>
                <SmallButtonLiteAc
                    func={editMode ? handleConfirmEdit : handleConfirmAnswer}
                    text="Post Answer"
                />
            </div>
        </div>
    );
};

export default NewAnswer;
