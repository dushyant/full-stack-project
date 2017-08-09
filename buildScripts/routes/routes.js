import path from 'path';
import FruitsController from '../controllers/fruits_controller';


export default (app) => {

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../src/index.html'));
  });

  app.get('/getfruits', FruitsController.getfruits);
  app.post('/addfruit', FruitsController.addfruit);
  app.delete('/deletefruit/:fruitId', FruitsController.deletefruit);
};
