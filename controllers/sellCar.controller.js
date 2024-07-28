// Package Imports
const multer=require('multer');
// Local Imports
const  sellCarService  = require('../services/sellCar.service');
const logger = require('../middlewares/loggers.middleware');

module.exports = class {
    static async sell(req, res) {
        const {email, brand, model, year, km, horsepower, bodyType, fuel, enginSize, cylinders, drive, exteriorColor, interiorColor, seats, doors, condition, discription } = req.body;
        logger.info('Recieved a request to sell a car',{ email, brand, model });
        const result = await sellCarService.sellCars(email, brand, model, year, km, horsepower, bodyType, fuel, enginSize, cylinders, drive, exteriorColor, interiorColor, seats, doors, condition, discription);
        if(result) {
            logger.info('Successfully sold a car',{ email, brand, model });
            return res.status(200).json({ message: "Success", result});
        } else {
            logger.error('User not found',{ email });
            res.status(400).json({message: "User not exist."});
        }
    }


    static async update(req, res) {
        const { email, brand, model, year, km, horsepower, bodyType, fuel, enginSize, cylinders, drive, exteriorColor, interiorColor, seats, doors, condition, discription } = req.body;
        logger.info('Recieved a request to update a car',{ email, brand, model });
        const result = await sellCarService.updateCarByEmail(email, brand, model, year, km, horsepower, bodyType, fuel, enginSize, cylinders, drive, exteriorColor, interiorColor, seats, doors, condition, discription);
        if(result) {
            logger.info('Successfully update a car',{ email, brand, model });
            return res.status(200).json({ message: "Data updates successfully.", result});
        } else {
            logger.error('User not found',{ email });
            res.status(400).json({message: "User not found."});
        }
    }


    static async upload(req, res) {
        const { email, addPrice } = req.query;
        let payload = req.body;
        let imgurl = "";
        if(req.file){
            imgurl=`${req.file.filename}`;
            payload.avatar=imgurl;
        }
        const image = imgurl;
        logger.info('Recieved a request to upload image',{ email, addPrice, image });
        if (image) {
            logger.info('Image is found..',{ image });
            const result = await sellCarService.uploadImage(email, addPrice, image);
            if (result) {
                logger.info('Successfully to upload image',{ email, addPrice, image });
                return res.status(200).json({ message: "Success", result });
            } else {
                logger.error('User not found',{ email });
                return res.status(400).json({ message: "User not exist." });
            }
        } else {
            logger.error('Image is undefined',{ image });
            return res.status(204).json({ message: "Image is undefined." });
        }
    }


    static async search(req, res) {
        const { brand } = req.body;
        logger.info('Recieved a request to search a car',`${ brand }`);
        const result = await sellCarService.searchCars( brand );
        if (result) {
            logger.info('Successfully to search a car',{ brand });
            return res.status(200).json({ message: "Success", result });
        } else {
            logger.error(' brand of this car not exist ', {brand});
            return res.status(400).json({ message: "Brand of this car not exist." });
        }
    }
}