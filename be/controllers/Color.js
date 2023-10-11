import Colors from "../models/ColorModel.js";

export const getColors = async (req, res) => {
  try {
    const response = await Colors.findAll({
      attributes: ["id","uuid", "name", "code"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getColorById = async (req, res) => {
  try {
    const response = await Colors.findOne({
      attributes: ["id", "uuid", "name", "code"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createColor = async (req, res) => {
  const { name, code} = req.body;
  try {
    await Colors.create({
      name: name,
      code: code
    });
    res.status(201).json({ msg: "Create Color Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateColor = async (req, res) => {
  const color = await Colors.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!color) return res.status(404).json({ msg: "Color tidak ditemukan" });
  const { name, code} = req.body;
  try {
    await Colors.update({
      name: name,
      code: code,
    });
    res.status(200).json({ msg: "Color Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteColor = async (req, res) => {
  const color = await Colors.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!color) return res.status(404).json({ msg: "Color tidak ditemukan" });
  try {
    await Colors.destroy({
      where: {
        id: color.id,
      },
    });
    res.status(200).json({ msg: "Color Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
