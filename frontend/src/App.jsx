// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./App.css";
// import UserList from "./components/Users";
import { HoverEffect } from "./components/ui/card-hover-effect";
import { TeamCreation } from "./components/Teams";
import { Teams } from "./components/CreateTeam";
import  Adduser  from "./components/Adduser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import userData from "../public/users.json";

function App() {
  const [showMenu, setShowMenu] = React.useState(false);
  const [progress, setProgress] = useState(0);
  const setProgression = (progress) => {
    setProgress(progress);
  };

  return (
    <Router>
      <h1 className="font-bold text-3xl md:text-5xl text-white">Users</h1>
      <Routes>
        <Route path="/" element={<HoverEffect />} />
        <Route
          path="/create-team"
          element={
            <TeamCreation userData={userData} setShowMenu={setShowMenu} />
          }
        />
        <Route path="/teams" element={<Teams setProgress={setProgression} />} />
        <Route
          path="/add-user"
          element={<Adduser setProgress={setProgression} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
