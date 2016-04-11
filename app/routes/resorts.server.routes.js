var resorts = require('../controllers/resorts.server.controller');

module.exports = function(app) {
    app.route('/resorts').get(resorts.showResort);

    app.route('/registeritem').get(resorts.renderRegisterItem).post(resorts.registerItem);

    app.route('/modifyitem').get(resorts.renderModifyItem).post(resorts.modifyItem);
};
