var resorts = require('../controllers/resorts.server.controller');

module.exports = function(app) {
    app.route('/resorts').get(resorts.showResort);
};
