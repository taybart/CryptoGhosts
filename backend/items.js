const Router = require('express').Router;
const log = require('./log');

module.exports = (app, ghosts, items) => {
  const router = Router();

  router.get('/lut', (req, res) => {
    const types = req.query.items.split(',').map(t => +t)
    items.find({ type: { $in: types }}).toArray((err, docs) => {
      const data = {};
      docs.forEach(d => (data[d.type] = { name: d.name, stat: d.stat }))
      res.json({ status:'OK', data });
    });
  });

  router.get('/equipped', (req, res) => {
    ghosts.findOne({ ghostId: +req.query.ghostId }, (err, doc) => {
      let items = [];
      if (doc && doc.equippedItems) {
        items = doc.equippedItems;
      }
      res.json({ status:'OK', data: { items } });
    });
  });

  router.post('/equip', (req, res) => {
    const response = { status: 'OK', msg: 'Successfully equipped' };
    const { ghostId, id, type } = req.body;
    items.findOne({ type: +type }, (err, item) => {
      ghosts.findOne({ ghostId }, (err, doc) => {
        if (!doc || !doc.equippedItems) {
          log.info(`Inserted new ghost ${ghostId}`);
          // ghosts.update({ ghostId }, { $set: { ghostId, equippedItems: [{ id, type }] } }, { upsert: true });
        } else {
          if (doc.equippedItems.some(i => (i.id === id))) {
            response.status = 'error';
            response.msg = 'Item already equipped!';
          } else {
            doc.stat += +item.stat;
            doc.equippedItems.push({ id, type });
            ghosts.update({_id: doc._id}, doc);
          }
        }
        res.json(response);
      });
    })
  });

  router.post('/unequip', (req, res) => {
    const response = { status: 'OK', msg: 'Successfully equipped' };
    const { ghostId, id, type } = req.body;
    items.findOne({ type: +type }, (err, item) => {
      ghosts.findOne({ ghostId }, (err, doc) => {
        let index = -1;
        doc.equippedItems.forEach((it, i) => {
          if (+it.id === +id) {
            index = i;
          }
        });
        if (index > -1) {
          doc.stat -= +item.stat;
          doc.equippedItems.splice(index, 1)
          ghosts.update({_id: doc._id}, doc);
        } else {
          response.status = 'error';
          response.msg = 'Item not equipped!';
        }
        res.json(response);
      });
    });
  });

  app.use('/item', router)
}
