import { Link } from "react-router-dom";
import classes from "../../Styles/EditProfile.module.css";
import { useEffect, useRef, useState } from "react";
// Icons
import { FaLongArrowAltLeft } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import { Button } from "../Buttons";

const EditProfile = () => {
    // Form Input Section
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [bio, setBio] = useState("");

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, fullname, bio, selectedImage, selectedTag);
    };
    return (
        <div className={`${classes["EditProfile"]}`}>
            <div className={`${classes["page-header"]}`}>
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
                        <span className={fullname ? `${classes["valid"]}` : ""}>
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
                        <span className={email ? `${classes["valid"]}` : ""}>
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
                        <div className={`${classes["tag-selector-header"]}`}>
                            <h3>Favourite Tags</h3>
                            <input
                                type="text"
                                name="searchTag"
                                placeholder="Search Tag"
                                autoComplete="off"
                                value={searchTag}
                                onChange={(e) => setSearchTag(e.target.value)}
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
                        <div className={`${classes["submit-btn"]}`}>
                            <Button text={`Update Profile`} type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
