import "./App.css";
import AddCard from "./components/Cards/AddCard";
import Cards from "./components/Cards/Cards";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rules from "./components/Rules/Rules";
import AddRule from "./components/Rules/AddRule";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Cards />} />
          <Route path="/card" element={<AddCard />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/addrule" element={<AddRule />} />
          <Route path="*" element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
