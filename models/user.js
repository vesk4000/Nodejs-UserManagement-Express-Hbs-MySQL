const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

class User {
	constructor(first_name, last_name, email, phone, comments, status = "active") {
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.phone = phone;
		this.comments = comments;
		this.status = status;
		this.id = null;
	}

	save(callback) {
		// User the connection
		connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [this.first_name, this.last_name, this.email, this.phone, this.comments], (err, rows) => {
			let ans = false;
			if (!err) {
				this.id = rows.id;
				console.log('The data from user table: \n', rows);
				ans = true;
			} else {
				console.log(err);
				ans = false;
			}
			callback(ans);
		});
	}

	// Edit a user when you have their id
	update(callback) {
		let ans = false;
		// User the connection
		if (this.id == null) {
			console.log("User doesn't have id - probaly hasn't been added to the database");
			ans = true;
			callback(ans);
		}
		else {
			connection.query('SELECT * FROM user WHERE id = ?', [this.id], (err, rows) => {
				if (!err) {
					res.render('edit-user', { rows });
					ans = true;
				} else {
					console.log(err);
					ans = false;
				}
				callback(ans);
			});
		}
	}

	delete(callback) {
		// Delete a record
		let ans = false;
		connection.query('DELETE FROM user WHERE id = ?', [this.id], (err, rows) => {
			if(!err) {
				console.log('The data from user table: \n', rows);
				ans = true;
				callback(ans);
			} else {
				console.log(err);
				ans = false;
				callback(ans);
			}
		});
	}

	// Returns all users in the database (as an object of class User)
	static fetchAll(callback) {
		// User the connection
		connection.query('SELECT * FROM user', (err, rows) => {
			// When done with the connection, release it
			if (!err) {
				callback(rows.map(row => User._newUserFromData(row)));
			} else {
				callback([]);
			}
		});
	}

	static findById(userId, callback) {
		// User the connection
		connection.query('SELECT * FROM user WHERE id = ?', [userId], (err, rows) => {
			if (!err && rows.length == 1) {
				callback(User._newUserFromData(rows[0]));
			} else {
				console.log(err);
				callback(null);
			}
		});
	}

	static _newUserFromData(data) {
		const user =  new User(data.first_name, data.last_name, data.email, data.phone, data.comments, data.status);
		user.id = data.id;
		return user;
	}
}

module.exports = User;
