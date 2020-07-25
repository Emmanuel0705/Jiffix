import db from '../db';

export const findCarByUserId = async (id: any): Promise<any> => {
    const cars = await db.select('*').from('user_cars').where({ user_id: id });
    return cars;
};
export const fetchCarManufacturers = async (): Promise<any> => {
    const manufacturer = await db.select('*').from('car_manufacturers');
    return manufacturer;
};
export const getCarModelByManufId = async (id: any): Promise<any> => {
    const manufacturer = await db
        .select('*')
        .from('car_models')
        .where({ car_manufacturer_id: id });
    return manufacturer;
};
export const getCarModelYear = async (
    car_model_id: any,
    car_manufacturer_id: any
): Promise<any> => {
    const manufacturer = await db
        .select('*')
        .from('car_model_versions')
        .where({ car_manufacturer_id, car_model_id });
    return manufacturer;
};
