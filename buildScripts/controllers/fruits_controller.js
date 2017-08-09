import Fruit from '../models/fruit';

export default {

  // Add Fruit controller
  addfruit(req, res, next) {
    console.log("add fruits");
    const fruitProps = req.body;

    Fruit.create(fruitProps)
      .then(() => {
        Fruit.find()
          .then(fruits => res.send(fruits))
          .catch(next);
      })
      .catch(next);
  },

  // Get Fruits controller to get fruit on page load
  getfruits(req, res, next) {
    console.log("get fruits");
    Fruit.find()
      .then(fruits => res.send(fruits))
      .catch(next);
  },

  // Delete Fruit controller to delete fruit from the list
  deletefruit(req, res, next) {

    const fruitId = req.params.fruitId;
    console.log("Delete Fruit", fruitId);
    Fruit.findByIdAndRemove({ _id: fruitId})
      .then(() => {
        Fruit.find()
          .then(fruits => res.send(fruits))
          .catch(next);
      })
      .catch(next);
  }
};
