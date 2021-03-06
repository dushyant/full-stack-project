import React, { Component } from 'react';

class AddFruitForm extends Component {

  constructor(props) {
    super(props)

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // for now adding this method here
  // this can be part of utility/helper module
  // this removed duplicated items and return unique array
  getUniqueArray(array) {
    return array.reduce(function(initArray, arrayItem) {
          if (initArray.indexOf(arrayItem) === -1) {
              initArray.push(arrayItem);
          }
          return initArray;
      }, []);
  }

  onFormSubmit(e) {
    e.preventDefault();
    //console.log("Form Submitted");

    let fruitNameInput = document.querySelector('#fruitname');
    let fruitColorsInput = document.querySelector('#fruitcolors');
    let fruitName = fruitNameInput.value.trim() || "";
    let fruitColors = (fruitColorsInput.value.trim() || "").split(", ");

    // remove duplicated color name added by user
    let uniqueFruitColors = this.getUniqueArray(fruitColors);

    let fruitObj = {};
    fruitObj.name = fruitName;
    fruitObj.colors = uniqueFruitColors;

    //console.log(fruitObj);
    this.props.onSubmit(fruitObj);

    // clear form field after submitting form
    fruitNameInput.value = "";
    fruitColorsInput.value = "";
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="w3-container w3-card-4 w3-padding-16" role="add">
        <h3 className="w3-text-green">Add Fruit</h3>
        <div className="w3-section">
          <input className="w3-input" id="fruitname" type="text" placeholder="Enter fruit name" required />
          <label htmlFor="fruitname">Fruit Name:</label>
        </div>
        <div className="w3-section">
          <input className="w3-input" id="fruitcolors" type="text" placeholder="Red, Green, Blue, ..." required />
          <label htmlFor="fruitcolors">Fruit Colors:</label>
        </div>
        <button type="submit" className="w3-btn w3-blue">Add</button>
      </form>
    );
  }
}

export default AddFruitForm;
