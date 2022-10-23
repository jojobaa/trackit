import Login from "./pages/Login";
import Cadastre from "./pages/Cadastre";
import Habits from "./pages/Habits";
import Today from "./pages/Today";
import Historic from "./pages/Historic";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextAPI } from "./pages/ContextAPI";

export default function App() {
    return (
        <ContextAPI>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastre" element={<Cadastre />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/today" element={<Today />} />
                    <Route path="/historic" element={<Historic />} />
                </Routes>
            </BrowserRouter>
        </ContextAPI>
    )
}