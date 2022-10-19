import styled from "styled-components";
import Login from "./Login";
import track from "./img/track.png";
import Cadastre from "./Cadastre";
// import MovieSession from "./MovieSession";
// import MovieSuccess from "./MovieSuccess";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Header><img src={track} alt='' /></Header>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/cadastre" element={<Cadastre/>}/> 
                {/* <Route path="/movie-success" element={<MovieSuccess/>}/>    */} 
            </Routes>
        </BrowserRouter>
    )
}

const Header = styled.div`
display: flex;
align-items: center;
justify-content: center;
img{
    width: 180px;
    height: 180px;
}

`