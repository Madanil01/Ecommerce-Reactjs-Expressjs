import Categorys from "../models/CategoryModel.js";
import Category from "../models/CategoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const response = await Categorys.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const response = await Categorys.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await Categorys.create({
      name: name,
    });
    res.status(201).json({ msg: "Category ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

export const updateCategory = async (req, res) => {
  const category = await Category.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!category) return res.status(404).json({ msg: "Category tidak ditemukan" });
  const { name } = req.body;
  try {
    await Categorys.update(
      {
        name: name,
      },
    );
    res.status(200).json({ msg: "Category Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const category = await Categorys.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!category) return res.status(404).json({ msg: "Category tidak ditemukan" });
  try {
    await Categorys.destroy({
      where: {
        id: category.id,
      },
    });
    res.status(200).json({ msg: "Category Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
