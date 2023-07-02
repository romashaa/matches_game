import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import GameModeModal from "./components/GameModeModal";
import GameOverModal from "./components/GameOverModal";

const GamePage = () => {
   // const [matchesRemaining, setMatchesRemaining] = useState(25);
    const [matchesRemaining, setMatchesRemaining] = useState(25);
    const [playerOneMatches, setPlayerOneMatches] = useState(0);
    const [AIMatches, setAIMatches] = useState(0);
    const [modeModalShow, setModeModalShow] = useState(false);
    const [gameModalShow, setGameModalShow] = useState(false);
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
    const [gameMode, setGameMode] = useState(null);
    const [gameOver, setGameOver]= useState(false);
    const [winner, setWinner] = useState('')

    const newGame= () =>{
        setPlayerOneMatches(0);
        setAIMatches(0);
        setMatchesRemaining(25);
        setGameModalShow(false);
    }

    const handleGameModeSelection = (selectedMode) => {
        setGameMode(selectedMode);
        if(selectedMode==='aiFirst'){
            setIsPlayer1Turn(false)
            setTimeout(() => {
                AIMove(matchesRemaining);
            }, 3000);
        }else{
            setIsPlayer1Turn(true)
        }
        setModeModalShow(false);
        setPlayerOneMatches(0);
        setAIMatches(0);
        setMatchesRemaining(25);
    }

        const handlePlayer1Move = (numMatches) => {
            if(matchesRemaining-numMatches===0){
                if((playerOneMatches+matchesRemaining)%2===0){
                    setWinner('Player1')
                }else{
                    setWinner("AI")
                }
                setGameOver(true);
                setGameModalShow(true);
                return;
            }
            let updatedMatches = matchesRemaining - numMatches
            console.log("set", updatedMatches )
            setMatchesRemaining(updatedMatches);
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
            if(updatedMatches-numMatches===0){
                if((playerOneMatches+matchesRemaining)%2===0){
                    setWinner('Player1')
                }else{
                    setWinner("AI")
                }
                setGameOver(true);
                setGameModalShow(true);
                return;
            }
            setAIMatches(AIMatches+numMatches)
            setMatchesRemaining(updatedMatches - numMatches)
            setIsPlayer1Turn(true);

           console.log("I take:" + numMatches);
        };
        const isButtonDisabled = (numMatches) => {
            return numMatches > matchesRemaining;
        };


        return (
            <div className="game-container">
                <div className="player-container">
                    <h2>Player 1</h2>
                    <h5>You have: {playerOneMatches} matches</h5>
                    { isPlayer1Turn ?
                        <div>
                            <Button disabled={isButtonDisabled(1)} variant="outline-warning"
                                    onClick={() => handlePlayer1Move(1)}>Take 1</Button>
                            <Button disabled={isButtonDisabled(2)} variant="outline-warning"
                                    onClick={() => handlePlayer1Move(2)}>Take 2</Button>
                            <Button disabled={isButtonDisabled(3)} variant="outline-warning"
                                    onClick={() => handlePlayer1Move(3)}>Take 3</Button>
                        </div>:
                        <h4 className='turn'>Wait for your opponent move</h4>
                    }
                    {isPlayer1Turn ? <h2 className='turn'>It's your turn</h2> : <h2></h2>}
                </div>

                <div className="matches-container">
                    <h4>Matches Remaining: {matchesRemaining}</h4>
                    <Button variant='primary' onClick={() => setModeModalShow(true)}>Change the game mode</Button>
                </div>

                <div className="player-container">
                    <h2>Player 2 (AI)</h2>
                    <h5>You have: {AIMatches} matches</h5>
                    { !isPlayer1Turn ?
                        <div>
                            <Button disabled variant='outline-success'>Take 1</Button>
                            <Button disabled variant='outline-success'>Take 2</Button>
                            <Button disabled variant='outline-success'>Take 3</Button>
                        </div>:
                        <h4 className='turn'>Wait for your opponent move</h4>
                    }
                    {!isPlayer1Turn ? <h2 className='turn'>It's my turn</h2> : <h2></h2>}
                </div>
                <GameModeModal show={modeModalShow} handleClose={() => setModeModalShow(false)}
                               onGameModeSelect={handleGameModeSelection}/>
                <GameOverModal winner={winner} newGame={newGame} show={gameModalShow} handleClose={() => setGameModalShow(false)}/>
            </div>
        );
}
export default GamePage;