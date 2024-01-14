import classes from "../../Styles/Faq.module.css";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const Faq = () => {
    const items = [
        {
            heading: "What is Collabor8?",
            content:
                "We’re glad you’re interested. Collabor8 is a platform where anyone can be a student in this diverse land of knowledge and anyone can be a mentor with the proper eligibility as well. Together we aim to bring the treasure of knowledge to a single platform, mostly for free.",
        },
        {
            heading: "How does the Points system work?",
            content: (
                <div>
                    <p>
                        For the points, every user will be starting with 0
                        points and the points will be maintained in the
                        following manners:
                    </p>
                    <table>
                        <tr>
                            <td>Each Question</td>
                            <td>1 point</td>
                        </tr>
                        <tr>
                            <td>Each Answer</td>
                            <td>2 points</td>
                        </tr>
                        <tr>
                            <td>Solved Question</td>
                            <td>
                                Question Author: 5 points, Answer Author: 10
                                points
                            </td>
                        </tr>
                        <tr>
                            <td>Upvote</td>
                            <td>2 points</td>
                        </tr>
                        <tr>
                            <td>Downvote</td>
                            <td>-1 point</td>
                        </tr>
                    </table>
                </div>
            ),
        },
        {
            heading: "Want to be a part of this community? Join us!",
            content:
                'Hurry up and jump into helping the community to gain more than 3000 points and ultimately being eligible for the "Instructor" posts\' applications where you can earn money by giving services to the customers and also by making the community more knowledgeable by sharing your knowledge.',
        },
        {
            heading: "Let's Learn about the badges, shall we?",
            content: (
                <div>
                    <table>
                        <tr>
                                <td><b>Points</b></td>
                                <td><b>Badge</b></td>
                                <td><b>Action</b></td>
                        </tr>
                        <tr>
                            <td>&ge; 1</td>
                            <td>Newbie</td>
                            <td>Upgrade to beginner if point exists,<br></br>Can add 2 images</td>
                        </tr>
                        <tr>
                            <td>&ge; 500</td>
                            <td>Intermediate</td>
                            <td>Upgrade badge<br></br>Can add 3 images</td>
                        </tr>
                        <tr>
                            <td>&ge; 1500</td>
                            <td>Expert</td>
                            <td>Upgrade badge<br></br>Able to add new tags,<br></br>Can add 5 images</td>
                        </tr>
                        <tr>
                            <td>&ge; 3000</td>
                            <td>Master (REQ FOR INS)</td>
                            <td>Upgrade badge<br></br>Ask for being an instructor,<br></br>Take 10 Requests a week.<br></br>Add 8 Images</td>
                        </tr>
                        <tr>
                            <td>&ge; 5000</td>
                            <td>Legend</td>
                            <td>Upgrade badge<br></br>Can add unlimited images.<br></br>Can take 20 Requests a week<br></br>Get message service free</td>
                        </tr>

                    </table>
                </div>
            ),
        },
        // {
        //     heading: "How do I edit my profile?",
        //     content:
        //         "You can edit your profile by clicking on the 'Edit Profile' button in the sidebar. You will be redirected to a page where you can edit your profile.",
        // },
        // {
        //     heading: "How do I view my profile?",
        //     content:
        //         "You can view your profile by clicking on the 'Profile' button in the sidebar. You will be redirected to a page where you can view your profile.",
        // },
        // {
        //     heading: "How do I view my questions?",
        //     content:
        //         "You can view your questions by clicking on the 'My Questions' button in the sidebar. You will be redirected to a page where you can view your questions.",
        // },
        // {
        //     heading: "How do I view my collections?",
        //     content:
        //         "You can view your collections by clicking on the 'Collections' button in the sidebar. You will be redirected to a page where you can view your collections.",
        // },
        // {
        //     heading: "How do I view all tags?",
        //     content:
        //         "You can view all tags by clicking on the 'Tags' button in the sidebar. You will be redirected to a page where you can view all tags.",
        // },
        // {
        //     heading: "How do I view all questions?",
        //     content:
        //         "You can view all questions by clicking on the 'Home' button in the sidebar. You will be redirected to a page where you can view all questions.",
        // },
        // {
        //     heading: "How do I view a question?",
        //     content:
        //         "You can view a question by clicking on the 'View Question' button on the question card. You will be redirected to a page where you can view the question.",
        // },
    ];
    return (
        <div className={`${classes["Faq"]}`}>
            <div
                className={`${classes["page-header"]} global-single-page-header`}
            >
                <Link to={`/`}>
                    <FaLongArrowAltLeft />
                    Go to Home
                </Link>
            </div>
            <div className={`${classes["faq-list"]}`}>
                <h2>Frequently Asked Questions</h2>
                <Accordion allowZeroExpanded>
                    {items.map((item, index) => (
                        <AccordionItem key={index}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {item.heading}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                {item.content}
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Faq;
