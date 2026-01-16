import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/index-page";
import CounterPage from "./pages/counter-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";

function AuthLayout() {
  return (
    <div>
      <h1>Auth Layout</h1>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/todoList" element={<T />} />

      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
