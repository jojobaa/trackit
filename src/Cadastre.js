import styled from "styled-components";
import { Link } from "react-router-dom";
import track from "./img/track.png";

export default function Cadastre() {
    return (
        <CadastreInputs>
            <Header><img src={track} alt='' /></Header>
            <input type='text' placeholder="email"></input>
            <input type='text' placeholder="senha"></input>
            <input type='text' placeholder="nome"></input>
            <input type='text' placeholder="foto"></input>
            <button>Cadastrar</button>
            <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
        </CadastreInputs>
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
const CadastreInputs = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
input{
    margin-top: 5px;
    border: none;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    width: 303px;
    height: 45px;
}
input::placeholder{
    color: #D4D4D4;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
}
button{
    width: 303px;
    height: 45px;
    margin-top: 5px;
    font-size: 20px;
    background-color:#52B6FF ;
    color: #FFFFFF;
    border: none;
    font-family: 'Lexend Deca', sans-serif;
    border-radius: 5px;
}
p{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: #52B6FF;
    text-decoration:underline;
}
`