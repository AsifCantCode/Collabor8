import classes from "../../Styles/AskQuestion.module.css";
const TitleInput = ({ title, setTitle }) => {
    return (
        <div className={`${classes["title"]}`}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                id=""
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    );
};

export default TitleInput;
