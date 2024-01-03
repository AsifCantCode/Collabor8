import { useRef, useState } from "react";
import classes from "../../Styles/AskQuestion.module.css";

import { Button } from "../Buttons";

// Icons
import { ImCross } from "react-icons/im";
import { LuImagePlus } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useAuthContext } from "../../Hooks/useAuthContext";
import UserApi from "../../apis/UserApi";
import Jodit from "../Jodit";
const AskQuestion = () => {
  // Text Input Section

  const [textContent, setTextContent] = useState("");

  // Image Input Section
  const [selectedImage, setSelectedImage] = useState([]);
  const imageInputRef = useRef(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage([...selectedImage, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    // Trigger the file input when the box is clicked
    imageInputRef.current.click();
  };
  const handleDeleteImage = (index) => {
    console.log(index);
    const newImages = selectedImage.filter((image, i) => i !== index);
    setSelectedImage(newImages);
  };

  // Tags Input Section
  const [joditEditor, setJoditEditor] = useState(true);
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();

  const handleTagChange = (event) => {
    console.log("Tag Change");
    setJoditEditor(false);
    event.stopPropagation();
    const value = event.target.value;
    // console.log(event.target.value);
    if (value[value.length - 1] === ",") {
      setTagList([...tagList, tag]);
      setTag("");
      console.log("Comma found");
      console.log([...tagList, tag]);
    } else {
      setTag(event.target.value);
    }
  };

  const handleTagDelete = (index) => {
    const newTagList = tagList.filter((tag, i) => i !== index);
    setTagList(newTagList);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    setError(false);
    console.log("TEXT: ".textContent);
    console.log("IMAGEL ", selectedImage);
    console.log("TAG: ", tagList);

    const formData = new FormData();
    formData.append("textContent", textContent);
    formData.append("image", selectedImage);
    formData.append("tagList", tagList);

    try {
      const response = await UserApi.post("/add-question", formData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      setLoading(false);

      //   toast.success("Signup Successful !! Navigating to edit profile page...", {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 1500,
      //   });
      console.log("ASK QUESTION Response: ", response.data);
    } catch (err) {
      console.log("ASK QUESTION ERROR: ", err);
      setLoading(false);
      setError(err.response.data.error);
    }
  };
  return (
    <div className={`${classes["AskQuestion"]}`}>
      <div className={`${classes["page-header"]}`}>
        <h2>Ask a Question</h2>
      </div>

      <div className={`${classes["new-question"]}`}>
        <Jodit textContent={textContent} setTextContent={setTextContent} />
      </div>

      <div className={`${classes["attachments"]}`}>
        <p>Attachment Image (Optional)</p>
        <div className={`${classes["images"]}`}>
          {selectedImage &&
            selectedImage.length > 0 &&
            selectedImage.map((image, index) => (
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

      <div className={`${classes["tags"]}`}>
        <label htmlFor="tags">Tags</label>
        <div className={`${classes["tag-list"]}`}>
          {tagList.length > 0 &&
            tagList.map((tag, index) => (
              <span key={index}>
                {tag}{" "}
                <ImCross
                  onClick={() => {
                    handleTagDelete(index);
                  }}
                />
              </span>
            ))}

          <input
            type="text"
            name="tag"
            id=""
            placeholder="Tag with comma"
            value={tag}
            onChange={handleTagChange}
          />
        </div>
      </div>
      <div className={`${classes["submit-btn"]}`}>
        <Button func={handleSubmit} text="Confirm Post" />
      </div>
    </div>
  );
};

export default AskQuestion;
