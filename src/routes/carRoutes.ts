import express from 'express';
import {
    fetchUserCars,
    fetchCarhManufacturers,
    fetchCarModels,
    fetchCarModelVersions,
} from '../controllers/carController';
import { protectedRoute } from '../middlewares/auth';

const router = express.Router();

router.get('/me', protectedRoute, fetchUserCars);
router.get('/manufacturers', fetchCarhManufacturers);
router.get('/model/:manufac_id', fetchCarModels);
router.get('/model-year/:model_id/:manufac_id', fetchCarModelVersions);
export default router;
