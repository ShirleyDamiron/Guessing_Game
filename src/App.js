import React from "react";
import Header from "./Components/Header/Header";
import "./SCSS/App.scss";

class App extends React.Component {
  state = {
    randomNumber: null,
    gameLevel: "",
    numberOfGuesses: 1,
    highScores: {
      standard: [],
      expert: []
    },
    userInput: null,
    hideInputField: false,
    userMessage: "",
    highScoreMessage: ""
  };

  generateStandardNumber = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    this.setState({
      randomNumber: randomNumber,
      gameLevel: "standard",
      hideInputField: true,
      userMessage: "",
      highScoreMessage: "",
      numberOfGuesses: 1
    });
  };

  generateExpertNumber = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    this.setState({
      randomNumber: randomNumber,
      gameLevel: "expert",
      hideInputField: true,
      userMessage: "",
      highScoreMessage: "",
      numberOfGuesses: 1
    });
  };

  onChangeUserInput = event => {
    this.setState({
      userInput: Number(event.target.value)
    });
  };

  compareValues = () => {
    const { userInput, randomNumber, numberOfGuesses, highScores, gameLevel } = this.state;
    const status = userInput > randomNumber ? "Lower" : "Higher";
    const highscoreArray = highScores[gameLevel];
    if (userInput === randomNumber) {
      highscoreArray.push(numberOfGuesses);
      const minHighScore = Math.min(...highscoreArray);
      this.setState({
        hideInputField: false,
        userMessage: `You Guessed It! Out of ${numberOfGuesses} Tries!`,
        highScoreMessage: `Your High Score Is ${minHighScore}`
      });
    } else {
      this.setState({
        numberOfGuesses: this.state.numberOfGuesses + 1,
        userMessage: `You Need To Go ${status}`
      });
    }
  };

  resetGame = () => {
    this.setState({
      randomNumber: null,
      gameLevel: "",
      numberOfGuesses: 1,
      highScores: {
        standard: [],
        expert: []
      },
      userInput: null,
      hideInputField: false,
      userMessage: "",
      highScoreMessage: ""
    });
  };

  render() {
    return (
      <>
        <div className="App">
          <Header />
        </div>
        <div className="buttons-container">
          <button onClick={this.generateStandardNumber}>Standard</button>
          <button onClick={this.generateExpertNumber}>Expert</button>
        </div>
        <form className="submission">
          {this.state.hideInputField === true && ( // if hideInputField is true then the inputs will appear
            <>
              <input
                className="enter-text"
                type="text"
                name="randomNumber"
                placeholder="Enter a Number!"
                onChange={this.onChangeUserInput}
              />
              <input
                className="submit-button"
                type="button"
                value="Submit"
                onClick={this.compareValues}
              />
            </>
          )}
        </form>
        <p className="higherLowerMessage">{this.state.userMessage}</p>
        <p className="highScoreMessage">{this.state.highScoreMessage}</p>
        <button className="restart-button" onClick={this.resetGame}>Restart</button>
      </>
    );
  }
}

export default App;
