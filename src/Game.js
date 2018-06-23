import React, { Component } from 'react';
import _ from 'lodash';

const Stars = ({numberOfStars}) => {
  console.log(numberOfStars)
  let starArr = [];
  for (let i=0; i < numberOfStars; i++) {
    starArr.push(<i key={i} className="fa fa-star"></i>);
  }
  return (
    <div className="row">
      {starArr}
    </div>
  )
}

const Numbers = ({selectedNumbers, selectNumber}) => {
  const numberClassName = (num) => {
    if (selectedNumbers.indexOf(num) >= 0) {
      return 'selected';
    }
  }

  return (
    <div className="row">
      <div>
        {Numbers.list.map((num, i) => <span key={i} onClick={() => selectNumber(num)} className={numberClassName(num)}>{num}</span>)}
      </div>
    </div>
  )
}

Numbers.list = _.range(1, 10)

const Answer = ({ selectedNumbers, unselectNumber }) => {
  return (
    <div className="row">
      {selectedNumbers.map((num, i) => <span onClick={() => unselectNumber(num)} key={i}>{num}</span>) }
    </div>
  )
}

const Button = ({ selectedNumbers, checkAnswer, answerIsCorrect }) => {
  let button
  switch (answerIsCorrect) {
    case true:
      button = <button><i className="fa fa-check"></i></button>
      break;
    case false:
      button = <button><i className="fa fa-times"></i></button>
      break;
    default:
      button = <button onClick={checkAnswer} disabled={selectedNumbers.length > 0 ? false : true}>=</button>
  }
  return (
    <div className="buttons">
      {button}
    </div>
  )
}

class Game extends Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random() * 9),
    answerIsCorrect: null,
  }

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    const selectedNumbers = [...this.state.selectedNumbers, clickedNumber]
    this.setState({ selectedNumbers, answerIsCorrect: null })
  }

  unselectNumber = (clickedNumber) => {
    const selectedNumbers = this.state.selectedNumbers.filter((num) => {
      num !== clickedNumber
    })
    this.setState({ selectedNumbers })
  }

  checkAnswer = () => {
    this.setState((prevState) => {
      let sum = prevState.selectedNumbers.reduce((memo, num) => {
        memo + num, 0
      })
      return (
        {answerIsCorrect: prevState.numberOfStars === sum}
      )
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Play 9 game</h3>
        <Stars
          numberOfStars={this.state.numberOfStars}
        />
        <Numbers
          selectedNumbers={this.state.selectedNumbers}
          selectNumber={this.selectNumber}
        />
        <Answer
          selectedNumbers={this.state.selectedNumbers}
          unselectNumber={this.unselectNumber}
        />
        <Button
          selectedNumbers={this.state.selectedNumbers}
          checkAnswer={this.checkAnswer}
          answerIsCorrect={this.state.answerIsCorrect}
        />
      </div>
    )
  }
}

export default Game;
