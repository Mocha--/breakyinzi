const express = require('express');
const moment = require('moment');
const cors = require('cors');
const server = express();

/**
 * config
 */
const PORT = 3000;

const tourTableRouter = require('./Router/TourTableRouter.js');
const shopEnteringTableRouter = require('./Router/ShopEnteringTableRouter.js');
const toursRouter = require('./Router/ToursRouter.js');

server.use(cors());

/**
 * apply routers
 */
server.use(tourTableRouter);
server.use(shopEnteringTableRouter);
server.use(toursRouter);

server.listen(PORT, () => {
    console.log(`listening ${PORT}`)
});
