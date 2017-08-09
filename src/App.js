import React, { Component } from 'react';
import AddFruitForm from './AddFruitForm';
import FruitList from './FruitList';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fruits: []
    }
  }

  componentDidMount() {
    let component = this;
    axios.get('/getFruits').then(function(data) {
      console.log(data);
      component.setState( { fruits: data.data } );
    });
  }

  // for now adding this method here
  // this can be part of shared component/module
  // this show message to user for better user experience
  showMsg(msg) {
    let divNode = document.createElement("DIV");
    let textNode = document.createTextNode(msg);
    let msgBox = document.querySelector('#msgbox');

    divNode.className = "w3-panel w3-2017-primrose-yellow";
    divNode.appendChild(textNode);
    msgBox.appendChild(divNode);
    msgBox.style.display = "block";

    // hide message after 3 seconds
    setTimeout(function(){
      msgBox.innerHTML = "";
      msgBox.style.display = "none";
    }, 3000);
  }

  deleteFruit(fruitId) {
    let component = this;
    // let { fruits } = this.state;
    //let fruitName = fruits[index].name;

    // fruits.splice(index, 1);
    // this.setState({ fruits });

    axios.delete('/deletefruit/' + fruitId)
      .then(function (response) {
        // show message to user for better user experience
        // {fruitName} is deleted
        //this.showMsg(fruitName + " is deleted");

        component.setState({ fruits: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addFruit(fruit) {
    let component = this;
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

      console.log(fruit);

      axios.post('/addfruit', fruit)
      .then(function (response) {
        console.log("add fruit", response);
        // show message to user for better user experience
        // {fruitName} is added
        component.showMsg(fruit.name + " is added.");

        component.setState({ fruits: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  }

  render() {
    return (
      <div>
        <div id="msgbox" className="msg-box" />
        <div className="w3-row-padding">
          <div className="w3-third">
            <AddFruitForm onSubmit={(fruit) => this.addFruit(fruit)} />
          </div>
          <div className="w3-twothird">
            <FruitList fruits={this.state.fruits}
            onDeleteFruit={(index) => this.deleteFruit(index)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
