const Router = require('express').Router;

module.exports = (app, ghosts, battle, ee, io) => {
  const router = Router();

  router.post('/register', (req, res) => {
    const { ghostId, stat } = req.body;
    battle.findOne({ ghostIds: ghostId }, (err, ghostDoc) => {
      if (!ghostDoc) {
        battle.findOne({ waiting: true }, (err, battleDoc) => {
          if (!battleDoc) {
            battle.insertOne({ ghostIds: [ghostId], stats: [{ghostId, stat}], waiting: true }, (err, result) => {
              res.json({ status:'OK', msg: 'Registered ghost', data: {arenaId: result.insertedId.toHexString()} });
            });
          } else {
            battleDoc.ghostIds.push(ghostId);
            battleDoc.stats.push({ ghostId, stat });
            battleDoc.waiting = false;
            battle.update({ _id: battleDoc._id }, { $set: battleDoc }, (err, result) => {
              res.json({ status:'OK', msg: 'Match is set!', data: { arenaId: battleDoc._id.toHexString()} });
              setTimeout(() => ee.emit('battle', battleDoc._id), 2000);
            });
          }
        });
      } else {
        res.json({ status:'error', msg: 'Ghost already registered' });
      }
    });
  });

  router.get('/arena', (req, res) => {
    const { ghostId } = req.query;
    res.json({ status: 'OK', data: { ghostId } });
  });

  app.use('/battle', router)

  // Arena
  io.on('connection', (socket) => {
    socket.on('join-arena', (arenaId) => {
      console.log(socket.id, 'joined', arenaId);
      socket.join(arenaId);
    });
  });

  ee.on('battle', (_id) => {
    console.log('To Battle!');

    battle.findOne({ _id }, {projection: { _id: 0, waiting: 0 } }, (err, battleDoc) => {
      console.log(_id.toHexString())
      battleDoc.winner = +(battleDoc.stats[0].stat > +battleDoc.stats[1].stat) ? battleDoc.stats[0].ghostId : battleDoc.stats[0].ghostId;
      io.to(_id.toHexString()).emit('battle', battleDoc);
      battle.removeOne({ _id });
    });
  });
};
