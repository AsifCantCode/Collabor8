import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout";
import AllQuestions from "./Components/pages/AllQuestions";
import AskQuestion from "./Components/pages/AskQuestion";
import LoginSignup from "./Components/pages/LoginSignup";
import Profile from "./Components/pages/Profile";

// Ui Testing Component Import
import EditProfile from "./Components/pages/EditProfile";
import { AuthContextProvider } from "./Contexts/AuthContext";
import Button from "./UI_Testing/Button";
import Button2 from "./UI_Testing/Button2";
import FinalNav from "./UI_Testing/FinalNav";
import Navbar from "./UI_Testing/Navbar";
import QcomponentDesk from "./UI_Testing/QcomponentDesk";
import QuestionBox from "./UI_Testing/QuestionBox";
import TagBox from "./UI_Testing/TagBox";
import Tags from "./UI_Testing/Tags";
import AllTags from "./Components/pages/AllTags";
import Subscription from "./Components/pages/Subscription";
import EditQuestion from "./Components/pages/EditQuestion";
import SingleQuestion from "./Components/questions/SingleQuestion";
import SingleQuestionDetails from "./Components/pages/SingleQuestionDetails";
import Chat from "./Components/pages/Chat";
import { ChatContextProvider } from "./Contexts/ChatContext";
import LayoutWithSidebar from "./Components/LayoutWithSidebar";
import { GlobalContextProvider } from "./Contexts/GlobalContext";

const App = () => {
    return (
        <AuthContextProvider>
            <GlobalContextProvider>
                <ChatContextProvider>
                    <Router>
                        <Routes>
                            {/* Main Routes  */}
                            <Route path="/question/*" element={<Layout />}>
                                <Route
                                    path="new-question"
                                    element={<AskQuestion />}
                                />
                                <Route
                                    path="edit-question/:id"
                                    element={<EditQuestion />}
                                />
                                <Route path="all-tags" element={<AllTags />} />
                            </Route>
                            <Route path="/*" element={<LayoutWithSidebar />}>
                                <Route path="" element={<AllQuestions />} />
                                <Route path="" element={<AllQuestions />} />
                                <Route
                                    path="profile/:userId"
                                    element={<Profile />}
                                />
                                <Route
                                    path="single-question/:id"
                                    element={<SingleQuestionDetails />}
                                />
                            </Route>
                            <Route path="/accounts" element={<LoginSignup />} />
                            <Route
                                path="/edit-profile"
                                element={<EditProfile />}
                            />
                            <Route
                                path="/subscription"
                                element={<Subscription />}
                            />
                            <Route path="/chat" element={<Chat />} />
                            {/* Ui Test Routes  */}
                            <Route
                                path="/ui-test/navbar"
                                element={<Navbar />}
                            />
                            <Route
                                path="/ui-test/button"
                                element={<Button />}
                            />
                            <Route
                                path="/ui-test/finalnav"
                                element={<FinalNav />}
                            />
                            <Route
                                path="/ui-test/button2"
                                element={<Button2 />}
                            />
                            <Route
                                path="/ui-test/tagbox"
                                element={<TagBox />}
                            />
                            <Route path="/ui-test/tags" element={<Tags />} />
                            <Route
                                path="/ui-test/questionbox"
                                element={<QuestionBox />}
                            />
                            <Route
                                path="/ui-test/qcomponentdesk"
                                element={<QcomponentDesk />}
                            />
                        </Routes>
                    </Router>
                </ChatContextProvider>
            </GlobalContextProvider>
        </AuthContextProvider>
    );
};

export default App;
