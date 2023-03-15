const Redis = require('ioredis');

// Create a Redis client and promisify the necessary methods
let client;

if (process.env.MODE === 'production') {
    client = new Redis(process.env.REDIS_URL);
} else {
    client = new Redis();
}

const getAsync = client.get.bind(client);
const setAsync = client.set.bind(client);
const delAsync = client.del.bind(client);

function cache(req, res, next) {
  req.redis = {
    client,
    get: getAsync,
    set: setAsync,
    del: delAsync,
  };

   next();
}

module.exports = cache;