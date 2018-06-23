import React, { Component } from 'react';
import _ from 'lodash';

const Stars = ({numberOfStars}) => {
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

const Numbers = ({selectedNumbers, selectNumber, usedNumbers}) => {
  const numberClassName = (num) => {
    if (usedNumbers.indexOf(num) >= 0) {
      return 'used';
    }
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

const Button = ({ selectedNumbers, checkAnswer, answerIsCorrect, acceptAnswer, redraw, redrawsRemaining }) => {
  let check
  switch (answerIsCorrect) {
    case true:
      check = <button><i onClick={acceptAnswer} className="fa fa-check"></i></button>
      break;
    case false:
      check = <button><i className="fa fa-times"></i></button>
      break;
    default:
      check = <button onClick={checkAnswer} disabled={selectedNumbers.length > 0 ? false : true}>=</button>
  }
  let refresh
  if (redrawsRemaining === 0) {
    refresh = <button disabled={true} onClick={redraw}><i className="fa fa-refresh"></i></button>
  } else {
    refresh = <button onClick={redraw}><i className="fa fa-refresh"></i></button>
  }
  return (
    <div className="buttons">
      {check}
      {refresh}
    </div>
  )
}

const DoneFrame = ({doneStatus}) => {
  return (
    <div>
      <h3>{doneStatus}</h3>
    </div>
  )
}

class Game extends Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random() * 9),
    answerIsCorrect: null,
    usedNumbers: [],
    redrawsRemaining: 5,
    doneStatus: null
  }

  redraw = () => {
    if (this.state.redrawsRemaining === 0) { return; }
    this.setState(prevState => ({
      numberOfStars: 1 + Math.floor(Math.random()*9),
      answerIsCorrect: null,
      selectedNumbers: [],
      redrawsRemaining: prevState.redrawsRemaining - 1
    }), this.updateDoneStatus);
  }

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) { return; }
    const selectedNumbers = [...this.state.selectedNumbers, clickedNumber]
    this.setState({ selectedNumbers, answerIsCorrect: null })
  }

  unselectNumber = (clickedNumber) => {
    const selectedNumbers = this.state.selectedNumbers.filter((num) => {
      return num !== clickedNumber
    })
    this.setState({ selectedNumbers })
  }

  checkAnswer = () => {
    this.setState((prevState) => {
      let sum = prevState.selectedNumbers.reduce((memo, num) => {
        return memo + num
      }, 0)
      return (
        {answerIsCorrect: prevState.numberOfStars === sum}
      )
    })
  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      answerIsCorrect: null,
      selectedNumbers: [],
      numberOfStars: 1 + Math.floor(Math.random()*9)
    }), this.updateDoneStatus);
  }

  updateDoneStatus = () => {
    this.setState((prevState) => {
      if (this.state.usedNumbers.length === 9) {
        return (
          { doneStatus: "You win!" }
        )
      }
      if (this.state.redrawsRemaining === 0 && !this.possibleSolutions(prevState)) {
        return (
          { doneStatus: "keep trying! ... just kidding game over :{" }
        )
      }
    })
  }

  possibleSolutions = ({ numberOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1, 10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );

    const possibleCombinationSum = function(arr, n) {
      if (arr.indexOf(n) >= 0) { return true; }
      if (arr[0] > n) { return false; }
      if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
      }
      var listSize = arr.length, combinationsCount = (1 << listSize)
      for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
          if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
      }
      return false;
    };

    return possibleCombinationSum(possibleNumbers, numberOfStars);
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
          usedNumbers={this.state.usedNumbers}
        />
        <Answer
          selectedNumbers={this.state.selectedNumbers}
          unselectNumber={this.unselectNumber}
        />
        <Button
          selectedNumbers={this.state.selectedNumbers}
          checkAnswer={this.checkAnswer}
          answerIsCorrect={this.state.answerIsCorrect}
          acceptAnswer={this.acceptAnswer}
          redraw={this.redraw}
          redrawsRemaining={this.state.redrawsRemaining}
        />
        <DoneFrame
          doneStatus={this.state.doneStatus}
        />
      </div>
    )
  }
}

export default Game;
