const dotenv = require('dotenv');
const db = require('./src/config/database');
dotenv.config({ path: '.env' });

const app = require('./src/app');

db.connect();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
