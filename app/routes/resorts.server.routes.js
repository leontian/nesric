var resorts = require('../../app/controllers/resorts.server.controller');

module.exports = function(app) {
    app.route('/resorts').get(resorts.list);
};
