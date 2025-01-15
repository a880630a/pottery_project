import styles from "./App.module.scss";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // 修正 Router 的引入
import Home from "./pages/Home";
import Works from "./pages/Works";
import Story from "./pages/Story";
import Contact from "./pages/Contact";

const App = () => {
    return (
        <div className={styles.container}>
            <Router>
                <div className={styles.navBar}>
                    <NavBar />
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
