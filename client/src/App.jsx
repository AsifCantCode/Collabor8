import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginSignup from "./Components/pages/LoginSignup";
import Profile from "./Components/pages/Profile";
import AllQuestions from "./Components/pages/AllQuestions";
import AskQuestion from "./Components/pages/AskQuestion";
import Layout from "./Components/Layout";

// Ui Testing Component Import
import Navbar from "./UI_Testing/Navbar";
import Button from "./UI_Testing/Button";
import Button2 from "./UI_Testing/Button2";
import FinalNav from "./UI_Testing/FinalNav";
import TagBox from "./UI_Testing/TagBox";
import Tags from "./UI_Testing/Tags";
import QuestionBox from "./UI_Testing/QuestionBox";
import QcomponentDesk from "./UI_Testing/QcomponentDesk";
import EditProfile from "./Components/pages/EditProfile";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Main Routes  */}
                <Route path="/*" element={<Layout />}>
                    <Route path="" element={<AllQuestions />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="new-question" element={<AskQuestion />} />
                </Route>
                <Route path="/accounts" element={<LoginSignup />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                {/* Ui Test Routes  */}
                <Route path="/ui-test/navbar" element={<Navbar />} />
                <Route path="/ui-test/button" element={<Button />} />
                <Route path="/ui-test/finalnav" element={<FinalNav />} />
                <Route path="/ui-test/button2" element={<Button2 />} />
                <Route path="/ui-test/tagbox" element={<TagBox />} />
                <Route path="/ui-test/tags" element={<Tags />} />
                <Route path="/ui-test/questionbox" element={<QuestionBox />} />
                <Route
                    path="/ui-test/qcomponentdesk"
                    element={<QcomponentDesk />}
                />
            </Routes>
        </Router>
    );
};

export default App;
