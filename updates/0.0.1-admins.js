/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	User: [
		{ 'name.first': 'JB', 'name.last': 'Richter', email: 'info@jbrholdings.com', password: 'abcd1234', isAdmin: true }
	]
};



// This is the long-hand version of the functionality above:

var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var admins = [
	{ email: 'mjfloyd25@gmail.com', password: 'abcd1234', name: { first: 'Mary', last: 'Floyd' }, isAdmin: true }
];

function createAdmin(admin, done) {

	var newAdmin = new User.model(admin);

	newAdmin.isAdmin = true;
	newAdmin.save(function(err) {
		if (err) {
			console.error("Error adding admin " + admin.email + " to the database:");
			console.error(err);
		} else {
			console.log("Added admin " + admin.email + " to the database.");
		}
		done(err);
	});

}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};


