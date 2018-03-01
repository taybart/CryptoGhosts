const Router = require('express').Router;
const log = require('./log');

module.exports = (app, ghosts, items) => {
  const router = Router();

  router.post('/register', (req, res) => {
    const { ghostId } = req.body;
    ghosts.findOne({ ghostId }, (err, doc) => {
      if (!doc) {
        ghosts.insertOne({ ghostId, name: '', equippedItems: [], stat: 1 }, (err, result) => {
          res.json({ status:'OK', msg: 'Registered ghost' });
        })
      } else {
        res.json({ status:'OK', msg: 'Ghost already registered' });
      }
    });
  });

  router.get('/img', (req, res) => {
    res.sendFile(`/assets/ghosts/${req.query.bt}.png`, { root: __dirname });
  });

  router.get('/stats', (req, res) => {
    ghosts.findOne({ ghostId: +req.query.ghostId }, (err, doc) => {
      let stat = 0;
      if (doc) { stat = doc.stat; }
      res.json({ status:'OK', data: { stat } });
    });
  });

  router.get('/name', (req, res) => {
    const { ghostId } = req.query;
    ghosts.findOne({ ghostId: +ghostId }, (err, doc) => {
      let name = '';
      if (doc) {
        name = doc.name;
      }
      res.json({ status:'OK', data: { name } });
    });
  });

  router.post('/name', (req, res) => {
    const { ghostId, name } = req.body;
    ghosts.updateOne({ ghostId }, { $set: { name } }, { upsert: true }, (err, result) => {
      res.json({ status: 'OK', msg: `Successfully updated ${name}'s name` })
    });
  });

  app.use('/ghost', router)
};
