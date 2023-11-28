import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Ui Testing Component Import
import Navbar from "./UI_Testing/Navbar";
import Button from "./UI_Testing/Button";
import FinalNav from "./UI_Testing/FinalNav";
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ui Test Routes  */}
                <Route path="/ui-test/navbar" element={<Navbar />} />
                <Route path="/ui-test/button" element={<Button />} />
                <Route path="/ui-test/finalnav" element={<FinalNav />} />
            </Routes>
        </Router>
    );
};

export default App;
