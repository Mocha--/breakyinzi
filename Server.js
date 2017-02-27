const express = require('express');
const moment = require('moment');
const server = express();

/**
 * config
 */
const PORT = 3000;

const tourTableRouter = require('./Router/TourTableRouter.js');
const shopEnteringTableRouter = require('./Router/ShopEnteringTableRouter.js');

/**
 * apply routers
 */
server.use(tourTableRouter);
server.use(shopEnteringTableRouter);

server.listen(PORT, () => {
    console.log(`listening ${PORT}`)
});
