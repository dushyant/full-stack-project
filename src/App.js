import React, { Component } from 'react';
import AddFruitForm from './AddFruitForm';
import FruitList from './FruitList';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fruits: [
        {
          name: 'Apple',
          colors: ['Red', 'Green', 'Pink']
        },
        {
          name: 'Banana',
          colors: ['Yellow', 'Green']
        },
        {
          name: 'Orange',
          colors: ['Orange']
        }
      ]
    }
  }


  // for now adding this method here
  // this can be part of shared component/module
  // this show message to user for better user experience
  showMsg(msg) {
    let spanNode = document.createElement("SPAN");
    let textNode = document.createTextNode(msg);
    let msgBox = document.querySelector('#msgbox');

    spanNode.appendChild(textNode);
    msgBox.appendChild(spanNode);
    msgBox.style.display = "block";

    // hide message after 3 seconds
    setTimeout(function(){
      msgBox.innerHTML = "";
      msgBox.style.display = "none";
    }, 3000);
  }

  deleteFruit(index) {
    let { fruits } = this.state;
    let fruitName = fruits[index].name;

    fruits.splice(index, 1);
    this.setState({ fruits });
    // show message to user for better user experience
    // {fruitName} is deleted
    this.showMsg(fruitName + " is deleted");
  }

  addFruit(fruit) {
    let { fruits } = this.state;

    // Find if fruit is already exist
    let isFruitExist = fruits.find(function(fruitArrayItem) {
        return fruitArrayItem.name.toLowerCase() === fruit.name.toLowerCase();
    });

    // if fruit is already exist
    // then show message to user for better user experience
    // {fruitName} is already exist
    // else add fruit to the list
    if(isFruitExist) {
      // show message to user that {fruitName} is already exist
      this.showMsg(fruit.name + " is already exist");
    } else {
      fruits.push(fruit);
      this.setState({ fruits });

      // show message to user for better user experience
      // {fruitName} is added
      this.showMsg(fruit.name + " is added.");
    };
  }

  render() {
    return (
      <div>
        <div id="msgbox" className="msg-box" />
        <AddFruitForm onSubmit={(fruit) => this.addFruit(fruit)} />
        <FruitList fruits={this.state.fruits}
          onDeleteFruit={(index) => this.deleteFruit(index)}/>
      </div>
    );
  }
}

export default App;
