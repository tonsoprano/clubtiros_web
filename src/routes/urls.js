const main = require('./main-routes');
const user = require('./user-routes');
const booking = require('./booking-routes');
const appMobile = require('./app-routes');

module.exports = (app) => {
    app.use('/', main);
    app.use('/user', user);
    app.use('/app', appMobile);
    app.use('/booking', booking);
}