const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.index); //get all user
router.post('/', userController.store); // add user
router.get('/:id', userController.show); //get user by id
router.put('/:id', userController.update); // update user
router.delete('/:id', userController.destroy); // remove user

module.exports = router;