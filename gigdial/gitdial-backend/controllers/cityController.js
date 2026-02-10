import asyncHandler from 'express-async-handler';
import City from '../models/City.js';

// @desc    Get all cities
// @route   GET /api/cities
// @access  Public
const getCities = asyncHandler(async (req, res) => {
    const cities = await City.find({}).sort({ name: 1 });
    res.json(cities);
});

// @desc    Add a city
// @route   POST /api/cities
// @access  Private/Admin
const addCity = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const cityExists = await City.findOne({ name });

    if (cityExists) {
        res.status(400);
        throw new Error('City already exists');
    }

    const city = await City.create({ name });
    res.status(201).json(city);
});

// @desc    Update a city
// @route   PUT /api/cities/:id
// @access  Private/Admin
const updateCity = asyncHandler(async (req, res) => {
    const city = await City.findById(req.params.id);

    if (city) {
        city.name = req.body.name || city.name;
        const updatedCity = await city.save();
        res.json(updatedCity);
    } else {
        res.status(404);
        throw new Error('City not found');
    }
});

// @desc    Delete a city
// @route   DELETE /api/cities/:id
// @access  Private/Admin
const deleteCity = asyncHandler(async (req, res) => {
    const city = await City.findById(req.params.id);

    if (city) {
        await City.deleteOne({ _id: req.params.id });
        res.json({ message: 'City removed' });
    } else {
        res.status(404);
        throw new Error('City not found');
    }
});

export { getCities, addCity, updateCity, deleteCity };
