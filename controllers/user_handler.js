const User = require("../models/user");

// Render active users
exports.view = (req, res) => {
	console.log("get / called: user_handler.view");
	User.fetchAll((rows) => {
		console.log(rows);
		if(rows != []) {
			//rows = rows.filter(user => user.status != "active");
			let removedUser = req.query.removed;
			console.log("Will render the home view now");
			res.render('home', { rows, removedUser });
		}
	});
}

// Find user by search
exports.find = (req, res) => {
	let searchTerm = req.body.search;
	User.fetchAll((users) => {
		const rows = users.filter(user => user.first_name.includes(searchTerm) || user.last_name.includes(searchTerm));
		res.render('home', { rows });
	});
}

// Add user
exports.form = (req, res) => {
	res.render('add-user');
}

// Create new user
exports.create = (req, res) => {
	const { first_name, last_name, email, phone, comments } = req.body;
	const user = new User(first_name, last_name, email, phone, comments);
	user.save((ret) => {
		if(ret) {
			res.render('add-user', { alert: 'User added successfully.' });
		}
	});
}


// Edit user
exports.edit = (req, res) => {
	User.findById(req.params.id, (user) => {
		if(user != null) {
			const rows = [user];
			res.render('edit-user', { rows });
		}
	});
}


// Update user by query
exports.update = (req, res) => {
	console.log("post /edituser/" + req.params.id + " called userController.update");
	const { first_name, last_name, email, phone, comments } = req.body;
	User.findById(req.params.id, (user) => {
		if(user == null)
			return;
		console.log("user: " + user);
		user.first_name = first_name;
		user.last_name = last_name;
		user.email = email;
		user.phone = phone;
		user.comments = comments;
		const rows = [user];
		user.update((ret) => {
			console.log("Went through update");
			if(ret) {
				console.log("Update successful");
				res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
			}
		});
	});

}

// Delete User
exports.delete = (req, res) => {
	User.findById(req.params.id, (usr) => {
		if(usr != null) {
			usr.delete((ret) => {
				if(ret) {
					res.redirect('/');
				}
			});
		}
	});
}

/*exports.deactivate = (req, res) => {
	// Hide a record
	connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
		if (!err) {
			let removedUser = encodeURIComponent('User successeflly removed.');
			res.redirect('/?removed=' + removedUser);
		} else {
			console.log(err);
		}
		console.log('The data from beer table are: \n', rows);
	});
}*/

// Render a certain user (by Id)
exports.viewall = (req, res) => {
	console.log("get /viewuser/" + req.params.id + " called " + "user_handler.js");
	User.findById(req.params.id, (user) => {
		console.log(`user: ${[user]}`);
		if(user != null) {
			const rows = [user];
			res.render('view-user', { rows });
		}
	});
}
