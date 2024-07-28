// Package Imports

// Local Imports
const  userService  = require('../services/user.service.js');
const securePassword = require('../middlewares/auth.middleware');
const generateOTP = require('../middlewares/otp.middleware.js');
const logger = require('../middlewares/loggers.middleware');

module.exports = class {
    static async create(req, res) {
        const {fullName, email, phoneNumber, password, confirmPassword, is_active } = req.body;
        logger.info('Recieved a request to create a user',{ fullName, email, phoneNumber });
        const hashedPassword = await securePassword(password);
        const result = await userService.createUser(fullName, email, phoneNumber, hashedPassword, confirmPassword, is_active);
        if(result) {
            logger.info('Successfully to create a user',{ fullName, email, phoneNumber });
            return res.status(200).json({ message: "Success", result});
        } else {
            logger.error('User already exist',{ fullName, email, phoneNumber });
            res.status(400).json({message: "User already exist."});
        }
    }

    static async getUser(req, res) {
        const { email } = req.params;
        logger.info('Recieved a request to get a user',{ email });
        const result = await userService.getUserByEmail(email);
        if(result) {
            logger.info('Successfully to get a user',{ email });
            return res.status(200).json({ message: "Success", result});
        } else {
            logger.error('User not exist..',{ email });
            res.status(400).json({message: "User not exist.."});
        }
    }

    static async getAllUser(req, res) {
        logger.info('Recieved a request to get all user..');
        const result = await userService.getAllUserByEmail();
        if(result) {
            logger.info('Successfully to get all user');
            return res.status(200).json({ message: "Success", result});
        } else {
            logger.error('error');
            res.status(400).json({message: "false"});
        }
    }


    static async update(req, res) {
        const { fullName, email, phoneNumber, password, confirmPassword, is_active } = req.body;
        logger.info('Recieved a request to update a user',{ fullName, email, phoneNumber });
        const hashedPassword = await securePassword(password);
        const result = await userService.updateUserByEmail(fullName, email, phoneNumber, hashedPassword, confirmPassword, is_active);
        if(result) {
            logger.info('Successfully update a user',{ fullName, email, phoneNumber });
            return res.status(200).json({ message: "Data updates successfully.", result});
        } else {
            logger.error('User not found',{ fullName, email, phoneNumber });
            res.status(400).json({message: "User not found."});
        }
    }


    static async delete(req, res) {
        const { email } = req.body;
        logger.info('Recieved a request to delete a user',{ email });
        const result = await userService.deleteUser(email);
        if(result) {
            logger.info('Successfully delete a user',{ email });
            return res.status(200).json({ message: "Delete Successfully."});
        } else {
            logger.error('Error',{ email });
            res.status(400).json({message: "false"});
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        logger.info('Recieved a request to login a user',{ email, password });
        const result = await userService.loginUser(email, password);
        if(result) {
            logger.info('Successfully to login a user',{ email, password });
            return res.status(200).json({ message: "Login Successfully.", result});
        } else {
            logger.error('Login failed error..',{ email, password });
            res.status(400).json({message: "Login failed."});
        }
    }


    static async changePassword(req, res) {
        const { email, password, newPassword, confirmPassword } = req.body;
        logger.info('Recieved a request to change password',{ email, password });
        const hashedPassword = await securePassword(newPassword);
        const result = await userService.password(email, password, hashedPassword, confirmPassword);
        if(result) {
            logger.info('Successfully to change password',{ email, password });
            return res.status(200).json({ message: "Change Password Successfully.", result});
        } else {
            logger.error('Error to change password',{ email, password });
            res.status(400).json({message: "Change Password failed."});
        }
    }

    static async otpGenerates(req, res) {
        const { email } = req.body;
        const otpCode = generateOTP();
        const otp = otpCode.otp_code;
        logger.info('Recieved a request to generate otp',{ email, otp });
        const result = await userService.otpGenerate(email, otp);
        if(result) {
            logger.info('Successfully to generate otp on Email',{ email, otp });
            return res.status(200).json({ message: "Otp Send Successfully.", result});
        } else {
            logger.error('Error to generate otp',{ email, otp });
            res.status(400).json({message: "Otp Send failed."});
        }
    }

    static async forgotPassword(req, res) {
        const { otp, password, confirmPassword } = req.body;
        logger.info('Recieved a request to forgot password',{ otp, password });
        const hashedPassword = await securePassword(password);
        const result = await userService.Fpasswords(otp, hashedPassword, confirmPassword);
        if(result) {
            logger.info('Successfully forgot password',{ otp, password });
            return res.status(200).json({ message: "Password Forgot Successfully.", result});
        } else {
            logger.error('Error to forgot password',{ otp, password });
            res.status(400).json({message: "Password Forgot Failed."});
        }
    }


    static async editProfile(req, res) {
        const { fullName, email, phoneNumber, street, town } = req.body;
        logger.info('Recieved a request to edit profile',{ fullName, email, phoneNumber, street, town });
        const result = await userService.editUserByEmail(fullName, email, phoneNumber, street, town);
        if(result) {
            logger.info('Successfully to edit profile',{ fullName, email, phoneNumber, street, town });
            return res.status(200).json({ message: "Edit Profile successfully.", result});
        } else {
            logger.error('Error to edit profile',{ fullName, email, phoneNumber, street, town });
            res.status(400).json({message: "Profile not found."});
        }
    }
}