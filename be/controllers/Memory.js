import Memory from "../models/MemoryModel.js";

export const getMemorys = async (req, res) => {
  try {
    const response = await Memory.findAll({
      attributes: ["id", "uuid", "size"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getMemoryById = async (req, res) => {
  try {
    const response = await Memory.findOne({
      attributes: ["id", "uuid", "size"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMemory = async (req, res) => {
  const { size } = req.body;
  try {
    await Memory.create({
      size: size,
    });
    res.status(201).json({ msg: "Create Memory Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateMemory = async (req, res) => {
  const memory = await Memory.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!memory) return res.status(404).json({ msg: "Memory tidak ditemukan" });
  const { size } = req.body;
  try {
    await Memory.update({
      size: size,
    });
    res.status(200).json({ msg: "Memory Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMemory = async (req, res) => {
  const memory = await Memory.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!memory) return res.status(404).json({ msg: "Memory tidak ditemukan" });
  try {
    await Memory.destroy({
      where: {
        id: memory.id,
      },
    });
    res.status(200).json({ msg: "Memory Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
