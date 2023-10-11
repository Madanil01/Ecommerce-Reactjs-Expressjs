import Variasi from "../models/VariasiModel.js";

export const getVariasi = async (req, res) => {
  try {
    const response = await Variasi.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getVariasiById = async (req, res) => {
  try {
    const response = await Variasi.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getVariasiByIdConst = async (req, res) => {
  try {
    const response = await Variasi.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getVariasiByProductId = async (req, res) => {
  try {
    const response = await Variasi.findAll({
      where: {
        productId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createVariasi = async (req, res) => {
  const { memory, color, productId, price, stock, productUuid } = req.body;

  // Check if any required fields are missing or have null values
  if (!memory || !color || !productId || !price || !stock) {
    return res
      .status(400)
      .json({ msg: "Missing or null fields in request data" });
  }

  try {
    const variasi = await Variasi.create({
      memory,
      color,
      productId,
      price,
      stock,
      productUuid
    });

    // Assuming creation is successful, send a success response
    res.status(201).json({ msg: "Variasi ditambahkan", variasi });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error creating Variasi:", error);

    // Send a meaningful error response to the client
    res
      .status(400)
      .json({ msg: "Failed to create Variasi", error: error.message });
  }
};

export const updateVariasi = async (req, res) => {
  const { memory, color, productId, price, stock, productUuid } = req.body;
  const variasi = await Variasi.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!variasi) return res.status(404).json({ msg: "Variasi tidak ditemukan" });

  try {
    await Variasi.update(
      {
        memory,
        color,
        productId,
        price,
        stock,
        productUuid,
      },
      {
        where: {
          uuid: req.params.id, // Specify the record to update by its UUID
        },
      }
    );
    res.status(200).json({ msg: "Variasi Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


export const deleteVariasi = async (req, res) => {
  const variasi = await Variasi.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!variasi) return res.status(404).json({ msg: "Variasi tidak ditemukan" });
  try {
    await Variasi.destroy({
      where: {
        id: variasi.id,
      },
    });
    res.status(200).json({ msg: "Variasi Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
