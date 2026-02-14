import Category from "../models/MenuCategory.js";

export const createCategory = async (req, res) => {
  const category = await Category.create({
    restaurantId: req.user.restaurantId,
    name: req.body.name
  });
  res.json(category);
};

export const getCategories = async (req, res) => {
  const data = await Category.find({ restaurantId: req.user.restaurantId });
  res.json(data);
};
