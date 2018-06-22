import React, { Component } from 'react';
import _ from 'lodash';

const Stars = (props) => {
  const numberOfStars = 1 + Math.floor(Math.random() * 9);
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

const Answer = ({ selectedNumbers }) => {
  return (
    <div className="row">
      {selectedNumbers.map((num, i) => <span key={i}>{num}</span>) }
    </div>
  )
}

const Button = (props) => {
  return (
    <div className="buttons">
      <button>=</button>
    </div>
  )
}

class Game extends Component {
  state = {
    selectedNumbers: [],
  }

  selectNumber = (clickedNumber) => {
    const selectedNumbers = [...this.state.selectedNumbers, clickedNumber]
    this.setState({ selectedNumbers })
  }

  render() {
    return (
      <div className="container">
        <h3>Play 9 game</h3>
        <Stars />
        <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber}/>
        <Answer selectedNumbers={this.state.selectedNumbers}/>
        <Button />
      </div>
    )
  }
}

export default Game;
