module.exports = {
	authWithCookies(req, res, next){
		if(!req.cookies.id){
			res.redirect('/login')
		} else {
			next();
		}
	}
}