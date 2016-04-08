exports.list = function(req, res) {
	res.render('index', {
		title: 'resorts',
		list: rows1
	});
};


