var expect = require("chai").expect;
var request = require("supertest");
const app = require("../server");

describe("Server", function () {
	it("Check running", function (done) {
		request(app)
			.get("/")
			.expect(200)
			.end(function (err, res) {
				if (err) done(err);
				done();
			});
	});
});
