import express from 'express';
import * as carContr from '../controllers/carController';
import { protectedRoute } from '../middlewares/auth';
import * as VL from '../middlewares/validators/carValidator';

const router = express.Router();

router.get('/me', protectedRoute, carContr.fetchUserCars);
router.post('/add', protectedRoute, VL.addCar, carContr.addCar);
router.get('/manufacturers', carContr.fetchCarhManufacturers);
router.get('/model/:manufac_id', carContr.fetchCarModels);
router.get('/model-year/:model_id/:manufac_id', carContr.fetchCarModelVersions);
export default router;
