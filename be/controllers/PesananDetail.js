import PesananDetail from "../models/PesananDetailModel.js";

export const getPesanansDetail = async (req, res) => {
  try {
    const response = await PesananDetail.findAll({
      attributes: [
        "uuid",
        "pesananUuid",
        "productId",
        "variasiId",
        "jumlah",
        "hargaSatuan",
        "subtotal",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPesananDetailById = async (req, res) => {
  try {
    const response = await PesananDetail.findOne({
      attributes: [
        "uuid",
        "pesananUuid",
        "productId",
        "variasiId",
        "jumlah",
        "hargaSatuan",
        "subtotal",
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

export const getPesananDetailByPesananId = async (req, res) => {
  try {
    const response = await PesananDetail.findAll({
      attributes: [
        "uuid",
        "pesananUuid",
        "productId",
        "variasiId",
        "jumlah",
        "hargaSatuan",
        "subtotal",
      ],
      where: {
        pesananUuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPesananDetail = async (req, res) => {
  const { pesananUuid, productId, variasiId, jumlah, hargaSatuan, subtotal } =
    req.body;
  try {
    const pesananDetail = await PesananDetail.create({
      pesananUuid: pesananUuid,
      productId: productId,
      variasiId: variasiId,
      jumlah: jumlah,
      hargaSatuan: hargaSatuan,
      subtotal: subtotal,
    });
    res
      .status(201)
      .json({
        msg: "Pesanan Detail Berhasil dibuat",
        subtotal: pesananDetail.subtotal,
      });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePesananDetail = async (req, res) => {
  const pesananDetail = await PesananDetail.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!pesananDetail)
    return res.status(404).json({ msg: "Pesanan tidak ditemukan" });
  const { pesananUuid, productId, variasiId, jumlah, hargaSatuan, subtotal } =
    req.body;
  try {
    await pesananDetail.update({
      pesananUuid: pesananUuid,
      productId: productId,
      variasiId: variasiId,
      jumlah: jumlah,
      hargaSatuan: hargaSatuan,
      subtotal: subtotal,
    });
    res.status(200).json({ msg: "Pesanan Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePesananDetail = async (req, res) => {
  const pesananDetail = await PesananDetail.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!pesananDetail)
    return res.status(404).json({ msg: "Pesanan Detail tidak ditemukan" });
  try {
    await pesananDetail.destroy();
    res.status(200).json({
      msg: "Pesanan Detail Deleted",
      subtotal: pesananDetail.subtotal,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
