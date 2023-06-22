
const response = require('../models/response.models');
const userSchema = require('../models/users.models');
const userController = {}



userController.index = async (req, res) => {
    try {
        const user = await userSchema.find()

        return response.success(res, user, 'Success', 200);
    } catch (err) {
        return response.error(res, err, 'Failed', 500);

    }
}

userController.store = async (req, res) => {

    const user = new userSchema(req.body);

    const { error, value } = await user.validateInput(req.body);
    if (error) {

        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return response.error(res, errorMessage, 'Validation error', 400);
    }

    try {
        var result = await user.save();
        return response.success(res, result, 'Success', 200);
    } catch (err) {
        return response.error(res, err.message, 'Failed', 500);
    }

}

userController.show = async (req, res) => {
    
    try {
        var result = await userSchema.findById(req.params.id);
        if (result) {
            return response.success(res, result, 'Success', 200);
        } else {
            return response.error(res, 'User not found', 'Failed', 404);
        }
    }catch (err) {
        return response.error(res, err, 'Failed', 500);
    }
}

userController.update = async (req, res) => {

    try {
        var user = await userSchema.findById(req.params.id);
        var body = req.body;
        
        if (req.params.id !== user.id) {
            return response.error(res, 'User not found', 'Failed', 404);
        }

        

        var data = {
            firstName: body.firstName || user.firstName,
            lastName: body.lastName || user.lastName,
            gender: body.gender || user.gender,
            birthDate: body.birthDate || user.birthDate,
            image: body.image || user.image,
            createdAt: user.createdAt,
            updatedAt: Date.now().toString(),
        }


        const updateSchema = new userSchema(req.body);
        const { error, value } = await updateSchema.validateInput(body);

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return response.error(res, errorMessage, 'Validation error', 400);
        }
        var update = await userSchema.findByIdAndUpdate(req.params.id, data, { new: true });
        if (update) {
            return response.success(res, update, 'Success', 200);
        } else {
            return response.error(res, 'User not found', 'Failed', 404);
        }
        
        
    } catch (err) {
        return response.error(res, err.message, 'Failed', 500);
    }
        
    

}

userController.destroy = async  (req, res) => {
    
    try {
        var result = await userSchema.findByIdAndDelete(req.params.id);
        if (result) {
            return response.success(res, result, 'Success', 200);
        } else {
            return response.error(res, 'User not found', 'Failed', 404);
        }
    } catch (err) {
        return response.error(res, err, 'Failed', 500);
    }
}

module.exports = userController;
