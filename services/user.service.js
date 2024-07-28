// Package Imports
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const sendMail = require('../config/email.constants');
// Local Imports
const  User  = require('../database/schemas/user.schema');

const { catchError } = require('../utils/index');

module.exports = class {
    static createUser = async(fullName, email, phoneNumber, password, confirmPassword, is_active) =>
     await catchError(async () => {
        const result = await User.findOne({email: email});
        if(result) return false;
        const user = new User({fullName: fullName, email: email, phoneNumber: phoneNumber, password: password, confirmPassword: confirmPassword, is_active: is_active});
        const results = await user.save();
        return results;
    });


    static getUserByEmail = async(email) =>
     await catchError(async () => {
        const result = await User.findOne({email: email});
        if(result) return  result ;
        else return false;
    });


    static getAllUserByEmail = async() =>
     await catchError(async () => {
        const result = await User.find();
        if(result) return  result ;
        else return false;
    });


    static updateUserByEmail = async(fullName, email, phoneNumber, password, confirmPassword, is_active) =>
    await catchError(async () => {
       const result = await User.findOneAndUpdate({email: email}, {fullName: fullName, phoneNumber: phoneNumber, password: password, confirmPassword: confirmPassword, is_active: is_active}, { new: true });
       if(result) return  result ;
       else return false;
    });


    static deleteUser = async(email) =>
     await catchError(async () => {
        const result = await User.deleteOne({email: email});
        if(result) return { result };
        else return false;
    });

    static loginUser = async(email, password) =>
     await catchError(async () => {
        const result = await User.findOne({email: email});
        // Create token
        const token = jwt.sign(
          { id: result.id, email: result.email },
          process.env.JWT_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        result.token = token;
        if(!result) return false;
        const isPasswordValid = await bcrypt.compare(password, result.password);
        console.log("df..", isPasswordValid);
        return isPasswordValid, result;
    });

    static password = async(email, password, newPassword, confirmPassword) => 
     await catchError(async ()=> {
        const results = await User.findOne({email: email});
        if(!results) return false;
        const isPassword = await bcrypt.compare(password, results.password);
        if(isPassword===false) return false;
        const newResult = await User.findOneAndUpdate(
            {email: email},
            {$set: {'password':newPassword, 'confirmPassword': confirmPassword}}, { new: true }
        );
        const result = await User.findOne({email: email});
        return result;
    });

    static otpGenerate = async(email, otp) =>
    await catchError(async ()=> {
        const oldResult = await User.findOne({ email: email });
        if(!oldResult) return false;
        const newResult = await User.findOneAndUpdate(
            {email: email},
            {$set: {'otp':otp}}, { new: true }
        );
        const result = await User.findOne({ email: email });
        return result;
    });

    static Fpasswords = async(otp, password, confirmPassword) =>
    await catchError(async()=> {
        const results = await User.findOne({ otp: otp });
        if(!results) return false;
        const result = await User.findOneAndUpdate(
            {otp: otp},
            {$set: {'password':password, 'confirmPassword': confirmPassword}}, { new: true }
        )
        return result;
    });


    static editUserByEmail = async(fullName, email, phoneNumber, street, town) =>
    await catchError(async () => {
       const result = await User.findOneAndUpdate({email: email}, {fullName: fullName, phoneNumber: phoneNumber, street: street, town: town}, { new: true });
       if(result) return  result ;
       else return false;
   });

}