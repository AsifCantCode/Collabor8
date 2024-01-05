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
    const text = `<p>Contrary to popular belief, <strong>Lorem Ipsum</strong> is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. <strong><em>Richard McClintock</em></strong>, a Latin professor at <em>Hampden-Sydney College</em> in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
<ul>
    <li>ABCD&nbsp;</li>
    <li>EFGS</li>
</ul>
<ol>
    <li>ABCDDSD</li>
    <li>SDG</li>
</ol>
<p>The standard chunk of <span style="font-family: georgia, palatino, serif;">Lorem Ipsum used since the 1500s</span> is <span style="font-size: 30px;">reproduced below</span> for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
<table style="border-collapse:collapse;width: 100%;">
    <tbody>
        <tr>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">sdasgsdfsdcds</td>
            <td style="width: 10%;">3sdfsdfs</td>
        </tr>
        <tr>
            <td style="width: 10%;">1</td>
            <td style="width: 10%;">2</td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
        </tr>
        <tr>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
        </tr>
        <tr>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
        </tr>
        <tr>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
            <td style="width: 10%;"><br></td>
        </tr>
    </tbody>
</table>
<p><br></p>
<p><a href="http://localhost:5173">Home Page Link</a></p>`;
    return (
        <div className={`${classes["SingleQuestionDetails"]}`}>
            <div className={`${classes["SingleQuestion"]}`}>
                <div className={`${classes["page-header"]}`}>
                    <div className={`${classes["creation-info"]}`}>
                        <p className={`${classes["author-name"]}`}>
                            <FaCircleUser /> <span>Tanvir Hossain Dihan</span>
                        </p>
                        <p className={`${classes["creation-date"]}`}>
                            12/12/2021
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
                        <h3>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Sit quidem earum voluptas officia
                            reprehenderit voluptates aperiam exercitationem
                            ipsum quasi odit.
                        </h3>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{ __html: text }}
                        className={`${classes["description"]} post-description`}
                    ></div>
                    <div className={`${classes["attachments"]}`}>
                        <div className={`${classes["attachment"]}`}>
                            <img src={img} alt="" />
                        </div>
                        <div className={`${classes["attachment"]}`}>
                            <img src={img} alt="" />
                        </div>
                    </div>
                </div>
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
