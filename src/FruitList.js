import React, { Component } from 'react';

class FruitList extends Component {

render() {
    let fruits = this.props.fruits;
    let onDeleteFruit = this.props.onDeleteFruit;

    // if fruit.length is 0
    // then show message 'No fruits available'
    if(!fruits.length) {
      return (
        <div className="no-fruits-msg">No fruits available</div>
      );
    }
    return (
      <ul className="list-group">
        {
           fruits.map(function(fruit, index) {
            return (
              <li key={index}>
                <h4>{fruit.name}</h4>
                <p>Colors: {fruit.colors.join(", ")}</p>
                <button className="danger-btn" onClick={() => onDeleteFruit(index)} key={index}>Delete</button>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default FruitList;
