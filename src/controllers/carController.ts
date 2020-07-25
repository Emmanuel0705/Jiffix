import catchAsync from '../utils/catchAsync';
import {
    findCarByUserId,
    fetchCarManufacturers,
    getCarModelByManufId,
    getCarModelYear,
    insertCar,
} from '../models/carModel';
import { status, message } from '../utils/constant';
import AppError from '../utils/appError';

export const fetchUserCars = catchAsync(async (req, res) => {
    const cars = await findCarByUserId(req.body.id);
    return res.json(cars);
});
export const fetchCarhManufacturers = catchAsync(async (req, res) => {
    const manufacturers = await fetchCarManufacturers();
    return res.json(manufacturers);
});

export const fetchCarModels = catchAsync(async (req, res) => {
    const models = await getCarModelByManufId(req.params.manufac_id);
    return res.json(models);
});
export const fetchCarModelVersions = catchAsync(async (req, res) => {
    const { model_id, manufac_id } = req.params;
    const modelVersions = await getCarModelYear(model_id, manufac_id);
    return res.json(modelVersions);
});
export const addCar = catchAsync(async (req, res) => {
    const { plate_number, vin, car_id, id, slug } = req.body;
    const user_id = id;
    const inserted = await insertCar([
        { plate_number, vin, car_id, user_id, slug },
    ]);
    if (inserted)
        return res.json({ status: status.success, message: message.carAdded });
    throw new AppError(message.errorOccurred, 501);
});
