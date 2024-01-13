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
            heading: "What is Quinscape?",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit deserunt, cumque quae vitae blanditiis porro recusandae soluta, ullam illum molestiae autem, earum eveniet ut cupiditate atque! Inventore voluptatum, ipsa, dolores eum dolorem laborum aliquid animi suscipit incidunt ipsam in ad fugit reiciendis officiis perferendis fuga quia esse repellendus sed dolorum!",
        },
        {
            heading: "How do I ask a question?",
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas totam amet mollitia eum deleniti, ullam dignissimos neque tenetur quisquam consectetur ea doloremque asperiores error id unde. Nisi minus repudiandae labore at molestias dolor commodi esse dignissimos consectetur ducimus odit est quo provident placeat fugit nemo, corporis voluptates, unde, quas perferendis consequatur saepe ratione sed. Odio delectus dolorem natus minima ad consectetur suscipit laboriosam facere voluptate magni corporis veritatis, hic possimus eum, explicabo rem voluptates cumque perferendis impedit odit ullam aliquid reprehenderit officia fuga. Explicabo inventore minus corrupti vel, nihil quidem facilis laboriosam rem officiis natus, asperiores quaerat aliquid fugiat.",
        },
        {
            heading: "How do I answer a question?",
            content:
                "You can answer a question by clicking on the 'Answer' button on the question card. You will be redirected to a page where you can answer the question.",
        },
        {
            heading: "How do I edit my profile?",
            content:
                "You can edit your profile by clicking on the 'Edit Profile' button in the sidebar. You will be redirected to a page where you can edit your profile.",
        },
        {
            heading: "How do I view my profile?",
            content:
                "You can view your profile by clicking on the 'Profile' button in the sidebar. You will be redirected to a page where you can view your profile.",
        },
        {
            heading: "How do I view my questions?",
            content:
                "You can view your questions by clicking on the 'My Questions' button in the sidebar. You will be redirected to a page where you can view your questions.",
        },
        {
            heading: "How do I view my collections?",
            content:
                "You can view your collections by clicking on the 'Collections' button in the sidebar. You will be redirected to a page where you can view your collections.",
        },
        {
            heading: "How do I view all tags?",
            content:
                "You can view all tags by clicking on the 'Tags' button in the sidebar. You will be redirected to a page where you can view all tags.",
        },
        {
            heading: "How do I view all questions?",
            content:
                "You can view all questions by clicking on the 'Home' button in the sidebar. You will be redirected to a page where you can view all questions.",
        },
        {
            heading: "How do I view a question?",
            content:
                "You can view a question by clicking on the 'View Question' button on the question card. You will be redirected to a page where you can view the question.",
        },
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
