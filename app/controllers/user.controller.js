const { OperationHandler } = require("../middleware/middleware");
const { ProductSchema } = require("../models/user.model");
const path = require('path');

const Listing = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        const startDate = req.query.start || "2000-01-01";
        const endDate = req.query.end || new Date().toISOString();

        const filter = searchQuery
            ? {
                $and: [
                    { title: { $regex: searchQuery, $options: "i" } },
                    { date: { $gte: new Date(startDate), $lte: new Date(endDate) } }
                ]
            }
            : {}
        const page = req.query.page;
        const limit = 3;
        const skip = (page - 1) * limit;
        const response = await ProductSchema.find(filter).skip(skip).limit(limit);
        const total = await ProductSchema.countDocuments(filter);
        return OperationHandler.success(res, '', { products: response, total_pages: total });
    } catch (error) {
        return OperationHandler.error(res, error);
    }
};

const AddProduct = async (req, res) => {
    try {
        const store = JSON.parse(req.body.user_data);
        const attachments = req.files;
        const AllData = store.map((x, i) => ({
            image: attachments[i].filename,
            title: x.title,
            description: x.description,
            qty: x.qty,
            price: x.price,
            date: x.date
        }));
        await ProductSchema.insertMany(AllData);
        return OperationHandler.success(res, 'Product added successfully');
    } catch (error) {
        return OperationHandler.error(res, error);
    }
};

const fetchImg = async (req, res) => {
    try {
        const response = await ProductSchema.findById(req.params.id).select("image");
        const imgPath = path.join(__dirname, '..', 'uploads', response.image);
        res.sendFile(imgPath);
    } catch (error) {
        return OperationHandler.error(res, error);
    }
}

module.exports = { Listing, AddProduct, fetchImg };