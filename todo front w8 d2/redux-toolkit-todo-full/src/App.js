import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SignInPage from "./components/pages/SignInPage";
import SignUpPage from "./components/pages/SignUpPage";

function App() {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/" element={<Navigate to="/SignInPage" />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/SignInPage" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
