import classes from "../../Styles/AnswerBox.module.css";

const AnswerBox = () => {
    return (
        <div className={`${classes["AnswerBox"]}`}>
            <div className={`${classes["component-header"]}`}>
                <h3>Answers</h3>
            </div>
            <div className={`${classes["answers"]}`}>
                <div className={`${classes["answer"]}`}>
                    <div className={`${classes["info"]}`}>
                        <h4>Tanvir Hossain Dihan</h4>
                        <p>Answered 2 days ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerBox;
