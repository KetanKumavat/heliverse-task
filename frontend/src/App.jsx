// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";
// import UserList from "./components/Users";
import { HoverEffect } from "./components/ui/card-hover-effect";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold">Users</h1>
      {/* <UserList /> */}
      <HoverEffect />
    </>
  );
}

export default App;
