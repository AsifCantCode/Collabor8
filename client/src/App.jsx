import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Ui Testing Component Import
import Navbar from "./UI_Testing/Navbar";
import Button from "./UI_Testing/Button";
import Button2 from "./UI_Testing/Button2";
import FinalNav from "./UI_Testing/FinalNav";
import TagBox from "./UI_Testing/TagBox";
import Tags from "./UI_Testing/Tags";
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ui Test Routes  */}
                <Route path="/ui-test/navbar" element={<Navbar />} />
                <Route path="/ui-test/button" element={<Button />} />
                <Route path="/ui-test/finalnav" element={<FinalNav />} />
                <Route path="/ui-test/button2" element={<Button2 />} />
                <Route path="/ui-test/tagbox" element={<TagBox />} />
                <Route path="/ui-test/tags" element={<Tags />} />
            </Routes>
        </Router>
    );
};

export default App;
