// Package Imports

// Local Imports
const  sellCar  = require('../database/schemas/sellCar.schema');
const  User  = require('../database/schemas/user.schema');

const { catchError } = require('../utils/index');

module.exports = class {
    static sellCars = async(email, brand, model, year, km, horsepower, bodyType, fuel, enginSize, cylinders, drive, exteriorColor, interiorColor, seats, doors, condition, discription ) =>
     await catchError(async () => {
        const result = await User.findOne({email: email});
        if(!result) return false;
        const car = new sellCar({email: email, brand: brand, model: model, year: year, km: km, horsepower: horsepower, bodyType: bodyType, fuel: fuel, enginSize: enginSize, cylinders: cylinders, drive: drive, exteriorColor: exteriorColor, interiorColor: interiorColor, seats: seats, doors: doors, condition: condition, discription: discription });
        const results = await car.save();
        return results;
    });

    static updateCarByEmail = async(email, brand, model, year, km, horsepower, bodyType, fuel, enginSize, cylinders, drive, exteriorColor, interiorColor, seats, doors, condition, discription ) =>
    await catchError(async () => {
       const result = await sellCar.findOneAndUpdate({email: email}, {brand: brand, model: model, year: year, km: km, horsepower: horsepower, bodyType: bodyType, fuel: fuel, enginSize: enginSize, cylinders: cylinders, drive: drive, exteriorColor: exteriorColor, interiorColor: interiorColor, seats: seats, doors: doors, condition: condition, discription: discription }, { new: true });
       if(result) return  result ;
       else return false;
    });


    static uploadImage = async(email, addPrice, image) =>
    await catchError(async () => {
       const results = await sellCar.findOne({email: email});
       if(!results) return  false ;
       const result = await sellCar.findOneAndUpdate(
           {email: email},
           {$set: {'addPrice': addPrice, 'image': image}}, {new: true}
        )
        if (result) return result;
        else return false;
    });



    static searchCars = async( brand ) =>
    await catchError(async () => {
       const result = await sellCar.findOne({brand: brand});
       if(result) return result;
       else return false;
   });


    //getById
    // static getById = async (id = "") =>
    // await catchError(async () => {
    //   const result = await db.categories.findOne({
    //     where: { id }, // Add your specific conditions
    //     attributes: ['id'],
    //     include: [
    //       {
    //         model: db.subServices,
    //         attributes: ['kDishes', 'kCounterTopCleaning', 'kDishWasherCleaning', 
    //         'kStoveCleaning', 'kRefrigeratorCleaning', 'kAppliancePolishAndCleaning', 
    //         'kTrashTakeout', 'kSweep', 'kSweepAndMop', 'kDust', 'kBlindDusting', 
    //         'kWallWashing', 'kWindowCleaning', 'kGeneralTidying', 'kGeneralOrganizing'],
    //         as: 'kitchens',
    //       },
    //       {
    //         model: db.subServices,
    //         attributes: ['rVacuum', 'rFurniturePolishAndClean', 'rStainRemovalFurniture', 
    //         'rSweep', 'rSweepAndMop', 'rDust', 'rBlindDusting', 'rWallWashing', 
    //         'rWindowCleaning', 'rGeneralTidying', 'rGeneralOrganizing'],
    //         as: 'livingRooms',
    //       },
    //       {
    //         model: db.subServices,
    //         attributes: ['bBedMaking', 'bVacuum', 'bFurniturePolishAndClean', 'bStainRemovalFurniture',
    //         'bSweep', 'bSweepAndMop','bDust', 'bBlindDusting', 'bWallWashing', 'bWindowCleaning', 
    //         'bGeneralTidying', 'bGeneralOrganizing'],
    //         as: 'bedrooms',
    //       },
    //       {
    //         model: db.subServices,
    //         attributes: ['bathroomDeepAndClean', 'bathVanityCleaning', 'bathTrashTakeout', 
    //         'bathToiletCleaning', 'bathMirrorCleaning', 'bathShowerAndBathtub', 'bathDust', 
    //         'bathSweep', 'bathSweepAndMop', 'bathBlindDusting', 'bathWallWashing', 
    //         'bathWindowCleaning', 'bathGeneralTidying', 'bathGeneralOrganizing'],
    //         as: 'bathrooms',
    //       },
    //       {
    //         model: db.subServices,
    //         attributes: ['laundaryWashAndDry', 'layndaryWashOrDry', 'laundaryFoldAndHangup',
    //         'laundarySweep', 'laundarySweepAndMop', 'laundaryBlindDusting', 'laundaryWallWashing',
    //         'laundaryWindowCleaning', 'laundaryGeneralTidying', 'laundaryGeneralOrganizing'],
    //         as: 'laundaries',
    //       },
    //       {
    //         model: db.subServices,
    //         attributes: ['total'],
    //         as: 'totalValue',
    //       },
    //     ],
    //   });
      
    //   if (result) return { result };
    //   else throw new Error();
  

    // });
}