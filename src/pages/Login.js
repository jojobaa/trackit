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
    const { setUsuario, usuario } = useContext(ContextAPI);

    useEffect(() => {
        const localData = usuario;
        if (Object.keys(localData).length !== 0) {
            navigate("/today");
        }
    });

    function dadosUsuario(e) {
        e.preventDefault();
        setCarregando(true);

        const promise1 = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            {
                email: email,
                password: senha,
            }
        );
        promise1.then((answer) => {
            setUsuario(answer.data);
            navigate("/today", {});
        });

        promise1.catch((error) => {
            alert(error.response.data.message);
            setCarregando(false);
        });
    }

    return (
        <LoginInputs>
            <Header><img src={track} alt='' /></Header>
            <FormContainer>
                <form onSubmit={dadosUsuario}>
                    <input
                        data-identifier="input-email"
                        type={'text'}
                        placeholder={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={carregando}
                        color={"#DBDBDB"}>
                    </input>
                    <input
                        data-identifier="input-password"
                        type={'text'}
                        placeholder={"senha"}
                        onChange={(e) => setSenha(e.target.value)}
                        disabled={carregando}>
                    </input>
                    <button data-identifier="login-btn" text={"Entrar"} disabled={carregando}>Entrar</button>
                    <Link to="/cadastre"><p data-identifier="sign-up-action">Não tem uma conta? Cadastre-se!</p></Link>
                </form>
            </FormContainer>
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
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 70vh;
form{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
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
    padding-top: 20px;
}
`
const FormContainer = styled.div`
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
`