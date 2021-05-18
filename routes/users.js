const router = require('express').Router();
const { validateUserData, validateUserUpdateData, validateUserAvatarData } = require('../middlewares/validators');
const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatarUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserData, getUser);
router.patch('/me', validateUserUpdateData, updateUser);
router.patch('/me/avatar', validateUserAvatarData, updateAvatarUser);

module.exports = router;
