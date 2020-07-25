import catchAsync from '../utils/catchAsync';
import {
    findCarByUserId,
    fetchCarManufacturers,
    getCarModelByManufId,
    getCarModelYear,
} from '../models/carModel';

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
