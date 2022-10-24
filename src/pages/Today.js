import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContextAPI from "./ContextAPI";
import ContextPercentual from "./ContextPercentual";
import styled from "styled-components";

export default function Today() {

    const { usuario } = useContext(ContextAPI);
    const { percentual, setPercentual } = useContext(ContextPercentual)
    const [habitoHoje, setHabitosHoje] = useState([]);
    const [habitosCompletados, sethabitosCompletos] = useState(0)
    setPercentual(parseInt((habitosCompletados / habitoHoje.length) * 100));
    console.log(habitoHoje)

    useEffect(() => {
        const promise1 = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            {
                headers: { Authorization: "Bearer " + usuario.token },
            }
        );
        promise1.then((answer) => {
            let completouHabitos = 0;

            for (let i = 0; i < answer.data.length; i++) {
                if (answer.data[i].done === true) {
                    completouHabitos += 1
                }
            }
            sethabitosCompletos(completouHabitos)
            setHabitosHoje(answer.data);
        });
    }, []);

    function checkHabito(habitoDeHoje) {
        console.log(habitoDeHoje);
        if (habitoDeHoje.done === false) {
            const promise2 = axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitoDeHoje.id}/check`,
                {},
                {
                    headers: { Authorization: "Bearer " + usuario.token },
                }
            );
            promise2.then(() => {
                sethabitosCompletos(habitosCompletados + 1)
            })
        } else {
            const promise3 = axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitoDeHoje.id}/uncheck`,
                {},
                {
                    headers: { Authorization: "Bearer " + usuario.token },
                }
            );
            promise3.then(() => {
                sethabitosCompletos(habitosCompletados - 1)
            })
        }
        const promise4 = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            {
                headers: { Authorization: "Bearer " + usuario.token },
            }
        );
        promise4.then((answer) => {
            setHabitosHoje(answer.data);
        });

    }

    return (
        <ContainerToday>
            <Header />
            <Title>
                <h1 data-identifier="today-infos">{`${dayjs().locale("pt-br").format("dddd")}, ${dayjs().format(
                    "DD/MM"
                )}`}</h1>
                <StyledSubtitle data-identifier="today-infos" color={percentual !== 0 && habitoHoje.length > 0 ? "#8FC549" : "#BABABA"}>
                    {percentual !== 0 && habitoHoje.length > 0 ? `${percentual}% dos hábitos concluídos` : "Nenhum hábito concluído ainda"}
                </StyledSubtitle>
            </Title>
            <CardHabit>
                {habitoHoje.map((habito) => (
                    <ContainerHabito data-identifier="today-infos">
                        <InfoHabitToday>
                            <h2>{habito.name}</h2>
                            <StyleP>Sequência atual: <p color={habito.done ? "#8FC549" : "#666666"}> {habito.currentSequence} dia</p>
                            </StyleP>
                            <StyleP>Seu recorde: <p color={habito.done && habito.currentSequence === habito.highestSequence ? "#8FC549" : "#666666"}>
                                {habito.highestSequence} dia</p>
                            </StyleP>
                        </InfoHabitToday>
                        <CheckHabitToday
                            data-identifier="done-habit-btn"
                            onClick={() => checkHabito(habito)}
                            backgroundcolor={habito.done ? "#8FC549" : "#EBEBEB"}>
                            <ion-icon name="checkmark-outline"></ion-icon>
                        </CheckHabitToday>
                    </ContainerHabito>
                ))}
            </CardHabit>
            <Footer />
        </ContainerToday >
    )
}

const ContainerToday = styled.div`
height: 100vh;
margin: 0 auto;
background-color: #F2F2F2;
margin-top: 60px;
`
const ContainerHabito = styled.div`
width: 340px;
height: 94px;
display: flex;
align-items: center;
justify-content: space-around;
background-color: #FFFFFF;
margin-bottom: 10px;
border-radius: 5px;
`
const Title = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
margin-left:20px;
margin-bottom: 20px;
padding-top: 40px;
h1{
    color: #126BA5;
    font-size: 22px;
    font-family: 'Lexend Deca', sans-serif;
}
`
const StyledSubtitle = styled.div`
margin-top: 5px;
color: ${(props) => props.color};
font-size: 17px;
font-family: 'Lexend Deca', sans-serif;
`
const CardHabit = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
flex-direction: column;
margin-top: 10px;
`
const InfoHabitToday = styled.div`
background-color: #FFFFFF;
  h2{
    color: #666666;
    font-size: 20px;
    font-family: 'Lexend Deca', sans-serif;
    margin-bottom: 10px;
}
p{
    font-size: 15px;
    font-family: 'Lexend Deca', sans-serif;
}
`
const CheckHabitToday = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 70px;
height: 70px;
border-radius: 5px;
color: #FFFFFF;
font-size: 50px;
background-color: ${(props) => props.backgroundcolor};
`
const StyleP = styled.div`
display: flex;
background-color: ${(props) => props.backgroundcolor};
font-family: "Lexend Deca";
font-size: 13px;
font-weight: 400;
line-height: 16px;
margin-left:4px;
color: ${(props) => props.color};
`;