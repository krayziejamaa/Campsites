var Campground = require("../models/campground");
var Comment = require("../models/comment");

//all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, foundCampground){
				if(err){
					req.flash("error", "campground not found");
					res.redirect("back");
				} else {
				//does user own the campground?
			if(foundCampground.author.id.equals(req.user._id)) {
				next();
			} else {
				req.flash("error", "You don't have permission to do that");
				res.redirect("back");
			}	
		   }		
		});
	} else {
		res.redirect("back");
	}
}


middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			//does user own the campground?
			if(foundComment.author.id.equals(req.user._id)) {
						next();
			} else {
				req.flash("error", "You don't have permission to do that");
				res.redirect("back");
			}	
		}		
	});
	} else {
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	req.flash("error", "Please login first!");
	res.redirect("/login");
}

module.exports = middlewareObj