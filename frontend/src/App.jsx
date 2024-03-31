// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";
// import UserList from "./components/Users";
import { HoverEffect } from "./components/ui/card-hover-effect";
import { TeamCreation } from "./components/Teams";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import userData from "../public/users.json";

function App() {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HoverEffect />} />
        <Route
          path="/create-team"
          element={
            <TeamCreation userData={userData} setShowMenu={setShowMenu} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
