import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Jokes from "./Jokes";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Favorites from "./Favorites";

import RequireAuth from "./components/RequireAuth";
import Missing from "./Missing";
import UserProfile from "./UserProfile";

export default function App() {
  return (
    <div className={styles.main_container}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jokes" element={<Jokes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}
