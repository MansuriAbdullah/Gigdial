import City from '../models/City.js';

// @desc    Get all cities
// @route   GET /api/cities
// @access  Public
const getCities = async (req, res) => {
    try {
        const cities = await City.find({}).sort({ name: 1 });
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a city
// @route   POST /api/cities
// @access  Private/Admin
const createCity = async (req, res) => {
    try {
        const { name } = req.body;
        const cityExists = await City.findOne({ name });

        if (cityExists) {
            return res.status(400).json({ message: 'City already exists' });
        }

        const city = await City.create({
            name,
        });

        if (city) {
            res.status(201).json(city);
        } else {
            res.status(400).json({ message: 'Invalid city data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a city
// @route   PUT /api/cities/:id
// @access  Private/Admin
const updateCity = async (req, res) => {
    try {
        const { name } = req.body;
        const city = await City.findById(req.params.id);

        if (city) {
            city.name = name || city.name;
            const updatedCity = await city.save();
            res.json(updatedCity);
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a city
// @route   DELETE /api/cities/:id
// @access  Private/Admin
const deleteCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);

        if (city) {
            await city.deleteOne();
            res.json({ message: 'City removed' });
        } else {
            res.status(404).json({ message: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getCities, createCity, updateCity, deleteCity };
