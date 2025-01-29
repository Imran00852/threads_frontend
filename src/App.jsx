import React from "react";
import Loader from "./components/common/Loader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/protected/Home";
import Search from "./pages/protected/Search";
import Error from "./pages/Error";
import Register from "./pages/Register";
import { Box } from "@mui/material";
import ProtectedLayout from "./pages/protected/ProtectedLayout";
import ProfileLayout from "./pages/protected/profile/ProfileLayout";
import Threads from "./pages/protected/profile/Threads";
import Replies from "./pages/protected/profile/Replies";
import Reposts from "./pages/protected/profile/Reposts";
import SinglePost from "./pages/protected/SinglePost";
import { useSelector } from "react-redux";
import { useMyInfoQuery } from "./redux/service";

const App = () => {
  const { darkmode } = useSelector((state) => state.service);
  const { data, error, isLoading } = useMyInfoQuery();
  if (isLoading) return <Loader />;
  if (!data || error) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Box minHeight={"100vh"} className={darkmode ? "mode" : ""}>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/profile" element={<ProfileLayout />}>
              <Route path="threads/:id" element={<Threads />} />
              <Route path="replies/:id" element={<Replies />} />
              <Route path="reposts/:id" element={<Reposts />} />
            </Route>
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
