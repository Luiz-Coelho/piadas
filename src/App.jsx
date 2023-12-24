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
    <>
      <Navbar />
      <main className={styles.main_container}>
        <Routes>
          <Route path="/piadas" element={<Home />} />
          <Route path="/piadas/jokes" element={<Jokes />} />
          <Route path="/piadas/login" element={<Login />} />
          <Route path="/piadas/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/piadas/favorites" element={<Favorites />} />
            <Route path="/piadas/user/:id" element={<UserProfile />} />
          </Route>
          <Route path="/piadas/*" element={<Missing />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
