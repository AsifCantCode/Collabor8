import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../Styles/EditProfile.module.css";
import { makeProfileImageURL } from "../../Utilities/utilities";
// Icons
import { FaLongArrowAltLeft } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { useAuthContext } from "../../Hooks/useAuthContext";
import UserApi from "../../apis/UserApi";
import { Button } from "../Buttons";
import { RiDeleteBin5Fill } from "react-icons/ri";

const EditProfile = () => {
    // Form Input Section
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [bio, setBio] = useState("");

    // Image Input Section
    const [selectedImage, setSelectedImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(null); // [
    const imageInputRef = useRef(null);
    const [fileError, setFileError] = useState(false);

    const handleImageChange = async (event) => {
        setFileError(false);
        const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
        const file = event.target.files[0];
        if (allowedImageTypes.includes(file.type)) {
            setSelectedImage([file]);
            console.log(file);
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    //   useEffect(() => {
    //     toast.onChange((payload) => {
    //       if (payload.status === "removed") {
    //         setLoading(false);
    //         navigate("/profile");
    //       }
    //     });
    //   }, [navigate]);

    // Tags Input Section
    const [tagList, setTagList] = useState([
        "programming",
        "javascript",
        "python",
        "java",
        "csharp",
        "html",
        "css",
        "webdevelopment",
        "algorithms",
        "datascience",
        "machinelearning",
        "frontend",
        "backend",
        "database",
        "softwareengineering",
        "mobiledevelopment",
        "android",
        "ios",
        "react",
        "angular",
        "vue",
        "nodejs",
        "express",
        "django",
        "flask",
        "ruby",
        "rails",
        "php",
        "laravel",
        "devops",
        "cloudcomputing",
        "docker",
        "kubernetes",
        "git",
        "versioncontrol",
        "testing",
        "qa",
        "security",
        "networking",
        "computergraphics",
        "artificialintelligence",
        "cybersecurity",
        "blockchain",
        "datastructures",
        "codinginterviews",
        "careeradvice",
        "technology",
        "programminglanguages",
    ]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [filteredTag, setFilteredTag] = useState([]);
    const [searchTag, setSearchTag] = useState("");

    useEffect(() => {
        if (searchTag.length > 0) {
            const tempTagList = tagList.filter((tag) =>
                tag.includes(searchTag)
            );
            setFilteredTag(tempTagList);
        } else {
            setFilteredTag(tagList);
        }
    }, [searchTag, tagList]);

    // const [tag, setTag] = useState("");

    const handleTagChange = (tag) => {
        const index = selectedTag.indexOf(tag);
        console.log(selectedTag, index);
        if (index === -1) setSelectedTag([...selectedTag, tag]);
        else setSelectedTag(selectedTag.filter((t) => t !== tag));
    };
    const checkSelected = (tag) => {
        return selectedTag.indexOf(tag) !== -1;
    };

    // Previous Data
    const [previousImage, setPreviousImage] = useState(false);
    const { newUser } = useAuthContext();
    useEffect(() => {
        if (newUser) {
            setEmail(newUser?.email);
            setFullname(newUser?.fullname);
            setBio(newUser?.bio);
            setPreviousImage([newUser?.image]);
            setSelectedTag(newUser?.favTags);

            // console.log("New User: ", newUser);
            // console.log("Previous Image: ", newUser?.image);
        }
    }, [newUser]);

    const handleImageDelete = (place) => {
        if (place === "previous") setPreviousImage(false);
        else {
            setSelectedImage(false);
            setImagePreview(null);
            console.log("Selected Image: ", selectedImage);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        if (!selectedTag.length) {
            setError("Please select add at least 1 tag");
            setLoading(false);
            return;
        }
        console.log(email, fullname, bio, selectedImage, selectedTag);
        const formData = new FormData();
        formData.append("email", email);
        formData.append("fullname", fullname);
        formData.append("bio", bio);
        formData.append("prevImage", previousImage);
        formData.append("images", selectedImage[0]);

        for (let i = 0; i < selectedTag.length; i++) {
            formData.append("tagList", selectedTag[i]);
        }
        try {
            const response = await UserApi.put("/update-profile", formData, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            setLoading(false);

            toast.success(
                "Profile Updated Successfully !! Navigating to profile page...",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500,
                }
            );
            console.log("Update Profile Response: ", response.data);
        } catch (err) {
            console.log("Update Profile ERROR: ", err);
            setLoading(false);
            setError(err.response.data.error);
        }
    };
    return (
        <>
            {" "}
            <div className={`${classes["EditProfile"]}`}>
                <div
                    className={`${classes["page-header"]} global-single-page-header`}
                >
                    <Link to={`/`}>
                        <FaLongArrowAltLeft />
                        Go to Home
                    </Link>
                </div>

                <div className={`${classes["edit-profile-area"]}`}>
                    <form
                        className={`${classes["edit-profile-form"]}`}
                        onSubmit={handleSubmit}
                    >
                        <div className={`${classes["image"]}`}>
                            {previousImage !== "undefined" &&
                                !selectedImage && (
                                    <>
                                        <div
                                            className={classes.imageBox}
                                            onClick={handleImageClick}
                                        >
                                            <LuImagePlus />
                                        </div>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: "none" }}
                                            ref={imageInputRef}
                                        />
                                    </>
                                )}
                            {typeof previousImage === "string" && (
                                <div className={classes.imageBox}>
                                    <img
                                        src={makeProfileImageURL(previousImage)}
                                        alt=""
                                    />
                                    <span
                                        className={`${classes["delete-btn"]}`}
                                    >
                                        <RiDeleteBin5Fill
                                            onClick={() =>
                                                handleImageDelete("previous")
                                            }
                                        />
                                    </span>
                                </div>
                            )}
                            {selectedImage && (
                                <div className={classes.imageBox}>
                                    <img src={imagePreview} alt="" />
                                    <span
                                        className={`${classes["delete-btn"]}`}
                                    >
                                        <RiDeleteBin5Fill
                                            onClick={() =>
                                                handleImageDelete("selected")
                                            }
                                        />
                                    </span>
                                </div>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="fullname"
                                id=""
                                autoComplete="off"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                            <span
                                className={
                                    fullname ? `${classes["valid"]}` : ""
                                }
                            >
                                Full Name
                            </span>
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                id=""
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span
                                className={email ? `${classes["valid"]}` : ""}
                            >
                                Email
                            </span>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="bio"
                                id=""
                                autoComplete="off"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                            <span className={bio ? `${classes["valid"]}` : ""}>
                                Bio
                            </span>
                        </div>

                        <div className={`${classes["tags"]}`}>
                            <div
                                className={`${classes["tag-selector-header"]}`}
                            >
                                <h3>Favourite Tags</h3>
                                <input
                                    type="text"
                                    name="searchTag"
                                    placeholder="Search Tag"
                                    autoComplete="off"
                                    value={searchTag}
                                    onChange={(e) =>
                                        setSearchTag(e.target.value)
                                    }
                                />
                            </div>
                            <div className={`${classes["tag-list"]}`}>
                                {filteredTag.length > 0 &&
                                    filteredTag.map((tag, index) => (
                                        <span
                                            className={`${
                                                checkSelected(tag)
                                                    ? classes["selectedTag"]
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                handleTagChange(tag);
                                            }}
                                            key={index}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                            </div>
                            {fileError && (
                                <p style={{ color: "red" }}>
                                    Only jpeg, jpg and png files allowed
                                </p>
                            )}
                            {error && (
                                <p style={{ color: "red", marginTop: "12px" }}>
                                    {error}
                                </p>
                            )}
                            <div className={`${classes["submit-btn"]}`}>
                                <Button text={`Update Profile`} type="submit" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </>
    );
};

export default EditProfile;
