import catchAsync from '../../utils/catchAsync';
import trimInput from '../../utils/trimInput';
import { message } from '../../utils/constant';
import AppError from '../../utils/appError';
import slugify from 'slugify';
import crypto from 'crypto';

export const addCar = catchAsync(async (req, res, next) => {
    const { plate_number, vin, model, manufacturer, car_id, year } = req.body;
    const valid = trimInput([
        plate_number,
        vin,
        model,
        manufacturer,
        car_id,
        year,
    ]);
    if (!valid) throw new AppError(message.invalidData, 400);

    //create slug
    const randomString = crypto.randomBytes(10).toString('base64').slice(0, 10);
    req.body.slug = slugify(
        `${year} ${manufacturer} ${model} ${randomString.toLocaleLowerCase()}`,
        '_'
    );
    next();
});
