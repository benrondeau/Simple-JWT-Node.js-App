# Basic Node.js Backend for JSON Web Tokens

Basic Node.js server that issues JSON Web Tokens (JWT) and validates them before granting access to a protected route. This app has NO front end - a tool like [Postman](https://www.getpostman.com/) is needed to use the app.

### Routes
- POST /authenticate: route to send username/password to and receive token
- GET /protected: route that requires a valid JWT to respond with data

### Get Started
- Download Repo
- cd into project directory and `npm install`
- `npm start`
- Open [Postman](https://www.getpostman.com/) and tool around with app
