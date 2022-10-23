import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import track from "../img/track.png";
import ContextAPI from "./ContextAPI";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const { setUsuario } = useContext(ContextAPI);

    useEffect(() => {
        const infoUser = localStorage.getItem("user info");
        if (infoUser !== "[]") {
            // navigate("/today");
        }
    });

    function dadosUsuario(e) {
        e.preventDefault();
        setCarregando(true);

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            {
                email: email,
                password: senha,
            }
        );
        promise.then((answer) => {
            setUsuario(answer.data);
            navigate("/today", {});
        });

        promise.catch((error) => {
            alert(error.response.data.message);
            setCarregando(false);
        });
    }

    return (
        <LoginInputs>
            <Header><img src={track} alt='' /></Header>
            <form onSubmit={dadosUsuario}>
                <input
                    type={'text'}
                    placeholder={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={carregando}
                    color={"#DBDBDB"}>
                </input>
                <input
                    type={'text'}
                    placeholder={"senha"}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={carregando}>
                </input>
                <button text={"Entrar"} disabled={carregando}></button>
                <Link to="/cadastre"><p>Já tem uma conta? Faça login!</p></Link>
            </form>
            
        </LoginInputs>
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
const LoginInputs = styled.div`
form{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

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