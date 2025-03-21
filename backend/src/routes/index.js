const {register , login, getProfile, updateProfile } = require('../controllers/authController');
const { validUser } = require('../middleware/validUser');

const apiRoutes = require('express').Router();

apiRoutes.post('/register' , register);
apiRoutes.post('/login', login)

apiRoutes.use(validUser)
apiRoutes.get('/get-user-profile',getProfile)
module.exports = apiRoutes