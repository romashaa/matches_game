import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import GameModeModal from "./components/GameModeModal";
import GameOverModal from "./components/GameOverModal";

const GamePage = () => {
   // const [matchesRemaining, setMatchesRemaining] = useState(25);
    const [newMatchesRemaining, setNewMatchesRemaining] = useState(25);
    const [playerOneMatches, setPlayerOneMatches] = useState(0);
    const [AIMatches, setAIMatches] = useState(0);
    const [modeModalShow, setModeModalShow] = useState(false);
    const [gameModalShow, setGameModalShow] = useState(false);
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
    const [gameMode, setGameMode] = useState(null);
    const [gameOver, setGameOver]= useState(false);

    const newGame= () =>{
        setPlayerOneMatches(0);
        setAIMatches(0);
        setNewMatchesRemaining(25);
        setGameModalShow(false);
    }

    const handleGameModeSelection = (selectedMode) => {
        setGameMode(selectedMode);
        setModeModalShow(false);
        setPlayerOneMatches(0);
        setAIMatches(0);
        setNewMatchesRemaining(25);
    }

        const handlePlayer1Move = (numMatches) => {
            if(newMatchesRemaining-numMatches===0){
                setGameOver(true);
                setGameModalShow(true);
                return;
            }
            let updatedMatches = newMatchesRemaining - numMatches
            console.log("set", updatedMatches )
            setNewMatchesRemaining(updatedMatches);
            setPlayerOneMatches(playerOneMatches + numMatches);
            setIsPlayer1Turn(false);

            // console.log(" updatedMatchesRemaining "+ updatedMatchesRemaining)
            setTimeout(() => {
                AIMove(updatedMatches);

            }, 3000);
        };


        const AIMove = (updatedMatches) => {

            let numMatches;
            if (updatedMatches % 4 === 0) {
                numMatches = 3;
            }
            if (updatedMatches % 4 === 1) {
                numMatches = 1;
            }
            if (updatedMatches % 4 === 2) {
                numMatches = 1;
            }
            if(updatedMatches % 4 === 3) {
                numMatches = 3;
            }
            setAIMatches(AIMatches+numMatches)
            setNewMatchesRemaining(updatedMatches - numMatches)
            setIsPlayer1Turn(true);

           console.log("I take:" + numMatches);
        };
        const isButtonDisabled = (numMatches) => {
            return numMatches > newMatchesRemaining;
        };


        return (
            <div className="game-container">
                <div className="player-container">
                    <h2>Player 1</h2>
                    You have: {playerOneMatches} matches<br/>
                    { isPlayer1Turn ?
                        <div>
                            <Button disabled={isButtonDisabled(1)} variant="outline-warning"
                                    onClick={() => handlePlayer1Move(1)}>Take 1</Button>
                            <Button disabled={isButtonDisabled(2)} variant="outline-warning"
                                    onClick={() => handlePlayer1Move(2)}>Take 2</Button>
                            <Button disabled={isButtonDisabled(3)} variant="outline-warning"
                                    onClick={() => handlePlayer1Move(3)}>Take 3</Button>
                        </div>:
                        <h4>Wait for your opponent move</h4>
                    }
                    {isPlayer1Turn ? <h2>It's your turn</h2> : <h2></h2>}
                </div>

                <div className="matches-container">
                    Matches Remaining: {newMatchesRemaining}<br/>
                    <Button variant='primary' onClick={() => setModeModalShow(true)}>Change the game mode</Button>
                </div>

                <div className="player-container">
                    <h2>Player 2 (AI)</h2>
                    You have: {AIMatches} matches<br/>
                    { !isPlayer1Turn ?
                        <div>
                            {/*<Button disabled={isButtonDisabled(1)} variant="outline-warning"*/}
                            {/*                                                       onClick={() => handleAIMove(1)}>Take 1</Button>*/}
                            {/*<Button disabled={isButtonDisabled(2)} variant="outline-warning"*/}
                            {/*        onClick={() => handleAIMove(2)}>Take 2</Button>*/}
                            {/*<Button disabled={isButtonDisabled(3)} variant="outline-warning"*/}
                            {/*        onClick={() => handleAIMove(3)}>Take 3</Button>*/}

                            <Button disabled>Take 1</Button>
                            <Button disabled>Take 2</Button>
                            <Button disabled>Take 3</Button>
                        </div>:
                        <h4>Wait for your opponent move</h4>
                    }
                    {!isPlayer1Turn ? <h2>It's my turn</h2> : <h2></h2>}
                </div>
                <GameModeModal show={modeModalShow} handleClose={() => setModeModalShow(false)}
                               onGameModeSelect={handleGameModeSelection}/>
                <GameOverModal newGame={newGame} show={gameModalShow} handleClose={() => setGameModalShow(false)}/>
            </div>
        );
}
export default GamePage;