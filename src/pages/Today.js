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
                <h1> text={`${dayjs().locale("pt-br").format("dddd")}, ${dayjs().format(
                    "DD/MM"
                )}`}</h1>
                <p>color={percentual !== 0 && habitoHoje.length > 0 ? "#8FC549" : "#BABABA"} text={percentual !== 0 && habitoHoje.length > 0 ? `${percentual}% dos hábitos concluídos` : "Nenhum hábito concluído ainda"} </p>
            </Title>
            <CardHabit>
                {habitoHoje.map((habito) => (
                    <InfoHabitToday>
                        <h2>{habito.name}</h2>
                        <p>Sequência atual:<StyleP color={habito.done ? "#8FC549" : "#666666"}>{habito.currentSequence} dia(s)</StyleP></p>
                        <p>Seu recorde:<StyleP color={habito.done && habito.currentSequence === habito.highestSequence ? "#8FC549" : "#666666"}>{habito.highestSequence} dia(s)</StyleP></p>
                    </InfoHabitToday>
                ))}
                <CheckHabitToday
                    onClick={() => checkHabito(habitoHoje)}
                    backgroundcolor={habitoHoje.done ? "#8FC549" : "#EBEBEB"}>
                    <ion-icon name="checkmark-outline"></ion-icon>
                </CheckHabitToday>
            </CardHabit>
            <Footer />
        </ContainerToday>
    )
}

const ContainerToday = styled.div`
height: 100vh;
margin: 0 auto;
background-color: #F2F2F2;
margin-top: 90px;
`
const Title = styled.div`
margin-left: 10px;
h1{
    color: #126BA5;
    font-size: 22px;
    font-family: 'Lexend Deca', sans-serif;
}
p{
    margin-top: 5px;
    color: #BABABA;
    font-size: 17px;
    font-family: 'Lexend Deca', sans-serif;
}
`
const CardHabit = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
width: 340px;
height: 94px;
background-color: #FFFFFF;
margin-top: 10px;
margin-left: 15px;
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
    color: #666666;
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
const StyleP = styled.p`
  font-family: "Lexend Deca";
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  margin-left:4px;
  color: ${(props) => props.color};
`;