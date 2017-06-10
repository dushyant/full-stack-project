import React, { Component } from 'react';

class FruitList extends Component {

render() {
    let fruits = this.props.fruits;
    let onDeleteFruit = this.props.onDeleteFruit;

    // if fruit.length is 0
    // then show message 'No fruits available'
    if(!fruits.length) {
      return (
        <div className="w3-container w3-card-4 w3-padding-16">
          <h3>Fruit List</h3>
          <div className="no-fruits-msg">No fruits available</div>
        </div>
      );
    }
    return (
      <div className="w3-container w3-card-4 w3-padding-16">
        <h3 className="w3-text-green">Fruit List</h3>
        <ul className="w3-ul w3-border w3-hoverable">
          {
            fruits.map(function(fruit, index) {
              return (
                <li className="w3-padding-16 w3-hover-light-gray" key={index}>
                  <button className="w3-button w3-red w3-medium w3-right" onClick={() => onDeleteFruit(index)} key={index}>X</button>
                  <span className="w3-large">{fruit.name}</span>
                  <br />
                  <span className="w3-small">Colors: {fruit.colors.join(", ")}</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default FruitList;
