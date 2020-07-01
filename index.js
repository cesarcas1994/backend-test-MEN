const app = require('./app');
const db = require('./server');

const PORT = process.env.PORT || 3900;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Listening on port: ' + PORT);
    });
  });