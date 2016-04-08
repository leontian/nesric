
// sign in
// GET
exports.signIn = function(req, res, next) {
   if(req.isAuthenticated()) 
       res.redirect('/profile');
  res.render('signin', {message: ''});
};


// sign up
// GET
exports.signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
       res.redirect('/profile');
   } else {
        res.render('signup', {message: ''});
   }
};

exports.displayProfile = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        res.render('profile', {user:req.user, list:'', message: ''});
    }
};


