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

const Button = ({ selectedNumbers }) => {
  return (
    <div className="buttons">
      <button disabled={selectedNumbers.length > 0 ? false : true}>=</button>
    </div>
  )
}

class Game extends Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random() * 9)
  }

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    const selectedNumbers = [...this.state.selectedNumbers, clickedNumber]
    this.setState({ selectedNumbers })
  }

  unselectNumber = (clickedNumber) => {
    const selectedNumbers = this.state.selectedNumbers.filter((num) => {
      num !== clickedNumber
    })
    this.setState({ selectedNumbers })
  }

  render() {
    return (
      <div className="container">
        <h3>Play 9 game</h3>
        <Stars numberOfStars={this.state.numberOfStars}/>
        <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber}/>
        <Answer selectedNumbers={this.state.selectedNumbers} unselectNumber={this.unselectNumber}/>
        <Button selectedNumbers={this.state.selectedNumbers}/>
      </div>
    )
  }
}

export default Game;
