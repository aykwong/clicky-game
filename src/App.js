import React, { Component } from "react";
import PokemonCard from "./components/PokemonCard";
// import Nav from "./components/Nav";
import { Col, Row, Container } from "./components/Grid";
import { Jumbotron, Title, Score } from "./components/Jumbotron";
import pokemon from "./pokemon.json";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {

  state = {
    pokemon,
    currentScore: 0,
    topScore: 0,
    message: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.setState({ message: "" });
      this.setState({ clicked: this.state.clicked.concat(id) });
      this.handleIncrement();
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    console.log(newScore);
    this.setState({
      currentScore: newScore,
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    if (newScore === 12) {
      console.log("Are we running this?")
      this.setState({ message: "Congratulations! You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      message: "Try again next time",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffled = shuffle(pokemon);
    this.setState({ pokemon: shuffled });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="12">
            <Jumbotron>
              <Title>
                <h1>
                  Gotta Catch 'em All!
              </h1>
              </Title>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="6">
            <Score>
              <h2>
                Score: {this.state.currentScore}
              </h2>
            </Score>
          </Col>
          <Col size="6">
            <Score>
              <h2 className="text-right">
                Top Score: {this.state.topScore}
              </h2>
            </Score>
          </Col>
        </Row>
        <Row>
          <Col size="12">
            <Score>
              <h3 className="text-center">
                {this.state.message}
              </h3>
            </Score>
          </Col>
        </Row>
        <Row>
          {this.state.pokemon.map(pokemon => (
            <Col size="md-3 sm-6">
              <PokemonCard
                key={pokemon.id}
                handleClick={this.handleClick}
                handleIncrement={this.handleIncrement}
                handleReset={this.handleReset}
                handleShuffle={this.handleShuffle}
                id={pokemon.id}
                image={pokemon.image}
              />
            </Col>
          ))}
        </Row>
      </Container >
    );
  }
}

export default App;
