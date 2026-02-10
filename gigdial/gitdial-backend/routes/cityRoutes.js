import express from 'express';
import { getCities, addCity, updateCity, deleteCity } from '../controllers/cityController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getCities)
    .post(protect, admin, addCity);

router.route('/:id')
    .put(protect, admin, updateCity)
    .delete(protect, admin, deleteCity);

export default router;
