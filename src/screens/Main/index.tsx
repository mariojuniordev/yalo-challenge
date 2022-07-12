import { useEffect, useState } from "react"
import styled from "styled-components";
import { Button } from "../../components/UI/Button/index";
import { Flex } from "../../components/UI/Flex/index";
import { Img } from "../../components/UI/Img/index";
import { Input } from "../../components/UI/Input/index";
import { Text } from "../../components/UI/Text/index";
import { api } from "../../services/api"

const Container = styled.div`
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

export default function Main() {
    const [deck, setDeck] = useState();
    const [currentCard, setCurrentCard] = useState();

    const [player1Points, setPlayer1Points] = useState(0);
    const [player2Points, setPlayer2Points] = useState(0);

    const [suitPlayer1, setSuitPlayer1] = useState('');
    const [cardValuePlayer1, setCardValuePlayer1] = useState('');

    const [suitPlayer2, setSuitPlayer2] = useState('');
    const [cardValuePlayer2, setCardValuePlayer2] = useState('');

    const cardImage = currentCard?.cards[0].image;
    const cardSuit = currentCard?.cards[0].suit;
    const cardValue = currentCard?.cards[0].value;

    console.log(`NAIPE: ${cardSuit}`);
    console.log(`TIPO: ${cardValue}`);

    console.log(`SUIT PLAYER 1: ${suitPlayer1}`)
    console.log(`VALUE PLAYER 1: ${cardValuePlayer1}`)

    console.log(`SUIT PLAYER 2: ${suitPlayer2}`)
    console.log(`VALUE PLAYER 2: ${cardValuePlayer2}`)

    function pointCounter() {
        if (suitPlayer1 === cardSuit) {
            setPlayer1Points(player1Points + 1)
        }

        if (cardValuePlayer1 === cardValue) {
            setPlayer1Points(player1Points + 3);
        }

        if (suitPlayer2 === cardSuit) {
            setPlayer2Points(player2Points + 1);
        }

        if (cardValuePlayer2 === cardValue) {
            setPlayer2Points(player2Points + 3);
        }
    };

    console.log(`PLAYER 1 POINTS: ${player1Points}`)
    console.log(`PLAYER 2 POINTS: ${player2Points}`)

    function hitCounter() {
        
    }

/* player1Points =+ 2;
    console.log( `PLAYER 1 POINTS: ${player1Points}`)
 */

    useEffect(() => {
        api.get('/deck/new/shuffle/?deck_count=1')
        .then(response => setDeck(response.data))
    }, []);

    async function drawACard() {
        await api.get('/deck/new/draw/?count=1')
        .then(response => setCurrentCard(response?.data));

        pointCounter();
    }

    useEffect(() => {
        api.get('/deck/new/draw/?count=1')
        .then(response => console.log(response.data))
    }, []);

    return (
        <Container>
            <Img
                src={cardImage}
                height="150px"
                width="200px"
                mb="16px"
            />
            <Button
                onClick={drawACard}
                p="15px"
                borderRadius="5px"
            >
                CLICK TO DRAW A CARD
            </Button>

            {/* PLAYER 1 */}

            <Flex
                flexDirection="column"
                border="1px solid white"
                mt="16px"
            >
                <Text>Player 1</Text>
                <Input
                    placeholder="Suit Player 1"
                    value={suitPlayer1}
                    onChange={e => setSuitPlayer1(e.target.value as any)}
                />

                <Input
                    placeholder="Value Player 1"
                    value={cardValuePlayer1}
                    onChange={e => setCardValuePlayer1(e.target.value as any)}
                />
            </Flex>

            {/* PLAYER 2 */}

            <Flex
                flexDirection="column"
                border="1px solid white"
                mt="16px"
            >
                <Text>Player 2</Text>
                <Input
                    placeholder="Suit Player 2"
                    value={suitPlayer2}
                    onChange={e => setSuitPlayer2(e.target.value as any)}
                />

                <Input
                    placeholder="Value Player 2"
                    value={cardValuePlayer2}
                    onChange={e => setCardValuePlayer2(e.target.value as any)}
                />
            </Flex>
        </Container>
    )
}