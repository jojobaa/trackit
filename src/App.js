import Login from "./Login";
import Cadastre from "./Cadastre";
import Habits from "./Habits";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/cadastre" element={<Cadastre/>}/> 
                <Route path="/habits" element={<Habits/>}/>    
            </Routes>
        </BrowserRouter>
    )
}