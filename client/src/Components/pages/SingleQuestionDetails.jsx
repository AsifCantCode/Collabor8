import classes from "../../Styles/SingleQuestionDetails.module.css";
import RightSidebar from "../RightSidebar";
import PopularTagsCard from "../PopularTagsCard";

import img from "../../assets/Screenshot 2023-10-14 172945.png";
// Icons
import { FaCircleUser } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { useState } from "react";
import AnswerBox from "../questions/AnswerBox";
import { useGetSingleQuestion } from "../../Hooks/useGetSingleQuestion";
import { useParams } from "react-router-dom";
import {
    formatDateAndTimeFromString,
    makeQuestionImageURL,
} from "../../Utilities/utilities";
const SingleQuestionDetails = () => {
    const [upvote, setUpvote] = useState(0);
    const [downvote, setDownvote] = useState(0);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const handleUpvote = () => {
        if (upvoted) {
            setUpvote(upvote - 1);
            setUpvoted(false);
        } else {
            setUpvote(upvote + 1);
            setUpvoted(true);
        }
        if (downvoted) {
            setDownvote(downvote - 1);
            setDownvoted(false);
        }
    };
    const handleDownvote = () => {
        if (downvoted) {
            setDownvote(downvote - 1);
            setDownvoted(false);
        } else {
            setDownvote(downvote + 1);
            setDownvoted(true);
        }
        if (upvoted) {
            setUpvote(upvote - 1);
            setUpvoted(false);
        }
    };

    // Populate Data
    const { id } = useParams();
    const { question, loading, error } = useGetSingleQuestion(id);

    // {
    //     "_id": "6599528d62e67fa34bbf4508",
    //     "AuthorId": {
    //         "subscription": {
    //             "status": false
    //         },
    //         "badge": "newbie",
    //         "points": 10,
    //         "followers": 0,
    //         "_id": "659635cee5a8a34b156eabdf",
    //         "fullname": "Tanvir Hossain Dihan",
    //         "email": "tanvirh.dihan@gmail.com",
    //         "password": "$2b$10$fuX1RkUdk7mZSYbyYPcPCez3/.c46bJs1IP3bRDW.yTIPIxpzFGVG",
    //         "favTags": [],
    //         "following": [],
    //         "__v": 0
    //     },
    //     "title": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quidem earum voluptas officia reprehenderit voluptates aperiam exercitationem ipsum quasi odit.",
    //     "textContent": "<p>Contrary to popular belief, <strong>Lorem Ipsum</strong> is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. <strong><em>Richard McClintock</em></strong>, a Latin professor at <em>Hampden-Sydney College</em> in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</p>\r\n<ul>\r\n    <li>ABCD&nbsp;</li>\r\n    <li>EFGS</li>\r\n</ul>\r\n<ol>\r\n    <li>ABCDDSD</li>\r\n    <li>SDG</li>\r\n</ol>\r\n<p>The standard chunk of <span style=\"font-family: georgia, palatino, serif;\">Lorem Ipsum used since the 1500s</span> is <span style=\"font-size: 30px;\">reproduced below</span> for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>\r\n<table style=\"border-collapse:collapse;width: 100%;\">\r\n    <tbody>\r\n        <tr>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">sdasgsdfsdcds</td>\r\n            <td style=\"width: 10%;\">3sdfsdfs</td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10%;\">1</td>\r\n            <td style=\"width: 10%;\">2</td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n        </tr>\r\n        <tr>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n            <td style=\"width: 10%;\"><br></td>\r\n        </tr>\r\n    </tbody>\r\n    \r\n</table>\r\n<p><br></p>\r\n<p><a href=\"http://localhost:5173\">Home Page Link</a></p>",
    //     "selectedImage": [
    //         "images_1704546957815.png",
    //         "images_1704546957817.png"
    //     ],
    //     "tagList": [
    //         "React",
    //         "MERN"
    //     ],
    //     "countUpVotes": 0,
    //     "countDownVotes": 0,
    //     "upVotes": [],
    //     "downVotes": [],
    //     "countAnswers": 0,
    //     "isSolved": false,
    //     "answers": [],
    //     "postTime": "2024-01-06T13:15:57.838Z",
    //     "updateTime": "2024-01-06T13:15:57.838Z",
    //     "__v": 0
    // }
    return (
        <div className={`${classes["SingleQuestionDetails"]}`}>
            <div className={`${classes["SingleQuestion"]}`}>
                <div className={`${classes["page-header"]}`}>
                    <div className={`${classes["creation-info"]}`}>
                        <p className={`${classes["author-name"]}`}>
                            <FaCircleUser />{" "}
                            <span>{question?.AuthorId?.fullname}</span>
                        </p>
                        <p className={`${classes["creation-date"]}`}>
                            {formatDateAndTimeFromString(question?.postTime)}
                        </p>
                    </div>
                    <div className={`${classes["up-down-votes"]}`}>
                        <p className={`${upvoted ? classes["upvote"] : ""}`}>
                            {upvote}
                        </p>
                        <FaThumbsUp
                            className={`${upvoted ? classes["upvote"] : ""}`}
                            onClick={handleUpvote}
                        />
                        <FaThumbsDown
                            className={`${
                                downvoted ? classes["downvote"] : ""
                            }`}
                            onClick={handleDownvote}
                        />
                        <p
                            className={`${
                                downvoted ? classes["downvote"] : ""
                            }`}
                        >
                            {downvote}
                        </p>
                    </div>
                </div>
                <div>
                    <div className={`${classes["title"]}`}>
                        <h3>{question?.title}</h3>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: question?.textContent,
                        }}
                        className={`${classes["description"]} post-description`}
                    ></div>
                    <div className={`${classes["attachments"]}`}>
                        {question?.selectedImage?.map((img, index) => (
                            <div
                                key={index}
                                className={`${classes["attachment"]}`}
                            >
                                <img src={makeQuestionImageURL(img)} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                <AnswerBox />
            </div>
            <RightSidebar>
                <PopularTagsCard />
                <PopularTagsCard />
                <PopularTagsCard />
            </RightSidebar>
        </div>
    );
};

export default SingleQuestionDetails;
