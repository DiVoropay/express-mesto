const router = require('express').Router();
const {
  getUsers, getUser, getCurrentUser, updateUser, updateAvatarUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
