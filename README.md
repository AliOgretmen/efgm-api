# efgm-api

This is an API implementation for the EFGM IT System landscape.

For API Reference and Live Endpoint, check out:
[EFGM Live API](https://efgm-api.herokuapp.com)

Live API is deployed on Heroku.

Base API URL: https://efgm-api.herokuapp.com

Direct Link to Swagger Documentation: https://efgm-api.herokuapp.com/api-docs

This API uses [passportjs](http://www.passportjs.org/) for Authentication.
Current implementation works with JWT Tokens. Will be extended later to also include Google Login.

To run the tests, type npm test.

To start the server, type npm start.

You need to have a .env file for environemental settings.
Currently, there are three keys you need to set:
HOST
PORT
SECRET

For retrieving settings from .env, dotenv is used.

Testing libary used is: Mochajs with Chai.