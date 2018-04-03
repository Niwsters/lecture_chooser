class Route {

  constructor (Model) {
    this.Model = Model;
  }

  create (req, res, next) {
    let data = req.body;
    let model;

    try {
      model = new this.Model(data);
    } catch(err) {
      // TODO: Add status thingy to this.
      res.send(err);
    }

    model.save().then(() => {
      res.send('Creation successful!');
    }, err => {
      res.send(err);
    });
  }

  getAll (req, res) {
    this.Model.getAll().then(results => {
      res.send(results);
    }, err => {
      res.send(err);
    });
  }

  getByID (req, res) {
    this.Model.getByID(req.params.id).then(results => {
      res.send(results);
    }, err => {
      res.send(err);
    });
  }

  deleteByID (req, res) {
    this.Model.removeByID(req.params.id).then(() => {
      res.send('Deletion successful!');
    }, err => {
      res.send(err);
    });
  }
}

module.exports = Route;
