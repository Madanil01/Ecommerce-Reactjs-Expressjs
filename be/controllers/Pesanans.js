import Pesanans from "../models/PesananModel.js";

export const getPesanans = async (req, res) => {
  try {
    const response = await Pesanans.findAll({
      attributes: [
        "uuid",
        "userUuid",
        "tanggalPesanan",
        "statusPesanan",
        "total",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPesananById = async (req, res) => {
  try {
    const response = await Pesanans.findOne({
      attributes: [
        "uuid",
        "userUuid",
        "tanggalPesanan",
        "statusPesanan",
        "total",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPesananByUserUuid = async (req, res) => {
  try {
    const response = await Pesanans.findOne({
      attributes: [
        "uuid",
        "userUuid",
        "tanggalPesanan",
        "statusPesanan",
        "total",
      ],
      where: {
        userUuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPesanan = async (req, res) => {
  const { userUuid, total } = req.body;
  try {
    const pesanan = await Pesanans.create({
      userUuid: userUuid,
      total: total,
    });

    // Mengirimkan UUID pesanan dalam respons
    res
      .status(201)
      .json({ msg: "Pesanan Berhasil dibuat", uuid: pesanan.uuid, total:pesanan.total });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePesanan = async (req, res) => {
  const pesanan = await Pesanans.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  
  if (!pesanan) return res.status(404).json({ msg: "Pesanan tidak ditemukan" });
  const { userUuid, total, tanggalPesanan } = req.body;
  try {
    await pesanan.update({
      // Gunakan pesanan yang telah ditemukan
      userUuid: userUuid,
      total: total,
      tanggalPesanan: tanggalPesanan,
    });
    res.status(200).json({ msg: "Pesanan Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePesanan = async (req, res) => {
  const pesanan = await Pesanans.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!pesanan) return res.status(404).json({ msg: "Pesanan tidak ditemukan" });
  try {
    await pesanan.destroy();
    res.status(200).json({ msg: "Pesanan Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deletePesananByUserUUid = async (req, res) => {
  const pesanan = await Pesanans.findOne({
    where: {
      userUuid: req.params.id,
    },
  });
  if (!pesanan) return res.status(404).json({ msg: "Pesanan tidak ditemukan" });
  try {
    await pesanan.destroy();
    res.status(200).json({ msg: "Pesanan Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};