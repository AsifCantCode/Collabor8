import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useGetSingleQuestion } from "../../Hooks/useGetSingleQuestion";
import classes from "../../Styles/AskQuestion.module.css";
import UserApi from "../../apis/UserApi";
import { Button } from "../Buttons";
import DescriptionInput from "../questions/DescriptionInput";
import ImageInputAndViewer from "../questions/ImageInputAndViewer";
import PreviousImage from "../questions/PreviousImage";
import TagInput from "../questions/TagInput";
import TitleInput from "../questions/TitleInput";

const EditQuestion = () => {
    // Text Input Section
    const [title, setTitle] = useState("");
    const [textContent, setTextContent] = useState("");

    // Image Input Section
    const [selectedImage, setSelectedImage] = useState([]);
    const [imageViewer, setImageViewer] = useState([]);
    const imageInputRef = useRef(null);
    const [fileError, setFileError] = useState(false);
    const [previousImages, setPreviousImages] = useState([]);

    // Tags Input Section
    const [tagList, setTagList] = useState([]);
    const [tag, setTag] = useState("");

    // Previous Data Load
    const { id } = useParams();
    const {
        question,
        loading: questionLoading,
        error: questionError,
    } = useGetSingleQuestion(id);

    useEffect(() => {
        if (question) {
            setTitle(question?.title);
            setTextContent(question?.textContent);
            setPreviousImages(
                question?.selectedImage[0] !== "" ? question?.selectedImage : []
            );
            setTagList(question?.tagList);
        }
    }, [question]);

    // Submit Section
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    // useEffect(() => {
    //     toast.onChange((payload) => {
    //         if (payload.status === "removed") {
    //             setLoading(false);
    //             navigate("/");
    //         }
    //     });
    // }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        if (!tagList.length) {
            setError("Please select add at least 1 tag");
            setLoading(false);
            return;
        }
        console.log("TITLE: ", title);
        console.log("TEXT: ", textContent);
        console.log("Previous Images: ", previousImages);
        console.log("IMAGEs ", selectedImage);
        console.log("TAGLIST: ", tagList);

        const formData = new FormData();
        formData.append("textContent", textContent);
        formData.append("previousImages", previousImages);
        formData.append("title", title);
        formData.append("questionId", question._id);

        for (let i = 0; i < selectedImage.length; i++) {
            formData.append("images", selectedImage[i]);
        }

        // Append each tag to the formData
        for (let i = 0; i < tagList.length; i++) {
            formData.append("tagList", tagList[i]);
        }

        try {
            const response = await UserApi.put("/update-question", formData, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            setLoading(false);

            toast.success(
                "Question Added Successfully !! Navigating to home page...",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                }
            );
            console.log("ASK QUESTION Response: ", response.data);
        } catch (err) {
            console.log("ASK QUESTION ERROR: ", err);
            setLoading(false);
            setError(err.response.data.error);
        }
    };

    return (
        <>
            <div className={`${classes["AskQuestion"]}`}>
                <div className={`${classes["page-header"]} global-page-header`}>
                    <h2>Edit Your Question</h2>
                </div>

                <TitleInput title={title} setTitle={setTitle} />
                {/* Text Box Section */}
                <DescriptionInput
                    textContent={textContent}
                    setTextContent={setTextContent}
                />

                {/* Image Attachment  */}
                {previousImages && previousImages.length > 0 && (
                    <PreviousImage
                        previousImages={previousImages}
                        setPreviousImages={setPreviousImages}
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
                    previousImages={previousImages}
                />

                {/* Tags Section  */}
                <TagInput
                    tagList={tagList}
                    setTagList={setTagList}
                    tag={tag}
                    setTag={setTag}
                />

                {fileError && (
                    <p style={{ color: "red" }}>
                        Only jpeg, jpg and png files allowed
                    </p>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {/* Submit Button */}
                <div className={`${classes["submit-btn"]}`}>
                    <Button func={handleUpdate} text="Update Post" />
                </div>
            </div>
        </>
    );
};

export default EditQuestion;
