import React, {useState} from 'react';
import './HeadsOrTails.css';

const HeadsOrTails = () => {
    //flipLogic randomizes the coin and must be initialized first
    const flipLogic = () => {
        return Math.floor(Math.random() * 2)
    }
    
    /// CSS variable functions


    // Hooks
    const [sideChosen, setSideChosen] = useState(null) // tracks which side of the coin the user has selected
    const [sideUp, setSideUp] = useState(flipLogic()) // tracks which side of the coin is face up
    const [wager, setWager] = useState(null) // tracks the users selected wager
    const [balance, setBalance] = useState(10) // tracks the users funds, initialized at 10, no maximum.
    const [gameState, setGameState] = useState(0) // tracks the state of the game, this variable simplifies the progression sequence 
    const [userInput, setUserInput] = useState(null) // updates the value of the input box

    //handleClick functions to change the gamestate
    const handleHeadsClick = () => {
        setSideChosen(0)
    }
    
    const handleTailsClick = () => {
        setSideChosen(1)
    }

    const handleChange = (event) => {
       setUserInput(event.target.value)
    }

    const handleWagerClick = () => {
        setWager(userInput)
        if (sideChosen == null) {
            setGameState(0)
        } else if ((userInput > balance) || (userInput <= 0) ) {
            setGameState(4)
        }else {
            setGameState(1)
        }
        
    }

    const handleYesClick = () => {
        console.log(wager, typeof(wager))
        if (wager > balance) {
            setGameState(5)
        } else if (isNaN(wager) || (wager == null)) {
            setGameState(4)
        } else if (sideUp == sideChosen) {
            setGameState(2)
        } else {
            setGameState(3)
        }
    }

    const handleNoClick = () => {
        setGameState(0)
    }

    const handleWinClick = () => {
        setBalance(parseInt(balance) + parseInt(wager))
        setSideChosen(null)
        setSideUp(flipLogic())
        setGameState(0)
    }

    const handleLoseClick = () => {
        setBalance(parseInt(balance) - parseInt(wager))
        setSideChosen(null)
        setSideUp(flipLogic())
        setGameState(0)
    }

    const handleGameOver = () => {
        setBalance(10)
        setWager(null)
        setGameState(0)
    }
    // Conditional statement to return various interfaces based on gamestate
    if (balance <= 0) {
        return (
            <div class="background">
                <div class="container">
                    <h3>You are out of coins! Better luck next time.</h3>
                    <p>Play Again?</p>
                    <div>
                        <button class='flipper-button' onClick={handleGameOver}>Start</button>
                    </div>
                </div>
            </div>
        )
    } else if (gameState == 0) {
        return (
            <div class="background">
                <div class="container">
                    <div><p3>you have {balance} coins</p3></div>
                    <button class={(sideChosen == 0) ? 'button-pressed' : 'flipper-button'} onClick={handleHeadsClick}>Heads</button> <button class={(sideChosen == 1) ? 'button-pressed' : 'flipper-button'} onClick={handleTailsClick}>Tails</button>
                    <div><input
                    type="text"
                    id="input"
                    name="input"
                    onChange={handleChange}
                    value={userInput}
                    /></div>
                    <button class='flipper-button' onClick={handleWagerClick}>Wager</button>
                </div>
            </div>
        )
    } else if (gameState == 1) {
        return (
            <div class="background">
                <div class="container">
                    <h3>Wager {wager}?</h3>
                    <div><button class='flipper-button' onClick={handleYesClick}>Yes</button><button class='flipper-button' onClick={handleNoClick}>No</button></div>
                </div>
            </div>
        )
    } else if (gameState == 2) {
        return (
            <div class="background">
                <div class="container">
                    <h3>You won {wager} coins!</h3>
                    <button class='flipper-button' onClick={handleWinClick}>Claim</button>
                </div>
            </div>
        )
    } else if (gameState == 3) {
        return (
            <div class="background">
                <div class="container">
                    <h3>You lose!</h3>
                    <button class='flipper-button' onClick={handleLoseClick}>Play Again?</button>
                </div>
            </div>
        )
    } else if (gameState == 4) {
        return (
            <div class="background">
                <div class="container">
                    <div><h3>Please wager an amount between 1 and {balance}</h3></div>
                    <div class='start-screen'><p3>you have {balance} coins</p3></div>
                    <button class={(sideChosen == 0) ? 'button-pressed' : 'flipper-button'} onClick={handleHeadsClick}>Heads</button> <button class={(sideChosen == 1) ? 'button-pressed' : 'flipper-button'} onClick={handleTailsClick}>Tails</button>
                    <div><input
                    type="text"
                    id="input"
                    name="input"
                    onChange={handleChange}
                    value={userInput}
                    /></div>
                    <button class='flipper-button' onClick={handleWagerClick}>Wager</button>
                </div>
            </div>
        )
    } else if (gameState == 5) {
        return (
            <div class="background">
                <div class="container">
                    <div><h3>You cannot wager more than your current balance.</h3></div>
                    <button onClick={setWager(0) + setGameState(0)}>OK</button>
                </div>
            </div>
        )
    }
    
    
}

export default HeadsOrTails;