import Products from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import path from "path";
import { Op } from "sequelize";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator


export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        attributes: [
          "id",
          "uuid",
          "name",
          "price",
          "categoryId",
          "image",
          "url",
        ], // Include 'id' field
      });
    } else {
      response = await Products.findAll({
        attributes: [
          "id",
          "uuid",
          "name",
          "price",
          "categoryId",
          "image",
          "url",
        ], // Include 'id' field
        // where: {
        //   userId: req.userId,
        // },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: [
          "id",
          "uuid",
          "name",
          "price",
          "categoryId",
          "image",
          "url",
        ],
        where: {
          id: product.id,
        },
        // include:[{
        //     model: User,
        //     attributes:['name','email']
        // }]
      });
    } else {
      response = await Products.findOne({
        attributes: [
          "id",
          "uuid",
          "name",
          "price",
          "categoryId",
          "image",
          "url",
        ],
        where: {
          // [Op.and]: [{ id: product.id }, { userId: req.userId }],
          [Op.and]: [{ id: product.id }],
        },
        // include:[{
        //     model: User,
        //     attributes:['name','email']
        // }]
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductByIdConst = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: [
          "id",
          "uuid",
          "name",
          "price",
          "categoryId",
          "image",
          "url",
        ],
        where: {
          id: product.id,
        },
        // include:[{
        //     model: User,
        //     attributes:['name','email']
        // }]
      });
    } else {
      response = await Products.findOne({
        attributes: [
          "id",
          "uuid",
          "name",
          "price",
          "categoryId",
          "image",
          "url",
        ],
        where: {
          // [Op.and]: [{ id: product.id }, { userId: req.userId }],
          [Op.and]: [{ id: product.id }],
        },
        // include:[{
        //     model: User,
        //     attributes:['name','email']
        // }]
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



export const createProduct = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const { name, price, categoryId } = req.body;
  const file = req.files.file;
  const ext = path.extname(file.name);
  const uniqueFileName = `${uuidv4()}${ext}`; // Generate a unique file name using UUID
  const url = `${req.protocol}://${req.get("host")}/images/${uniqueFileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  const fileSize = file.data.length;

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${uniqueFileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Products.create({
        name: name,
        price: price,
        categoryId: categoryId,
        image: uniqueFileName, // Use the unique file name
        url: url,
      });
      res.status(201).json({ msg: "Products Created Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};
  // const {name, price} = req.body;
  // try {
  //     await Products.create({
  //         name: name,
  //         price: price,
  //         userId: req.userId
  //     });
  //     res.status(201).json({msg: "Products Created Successfuly"});
  // } catch (error) {
  //     res.status(500).json({msg: error.message});
  // }

export const updateProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const {name, price, categoryId} = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Products.update(
      { name: name, image: fileName, url: url, categoryId:categoryId, price:price },
      {
        where: {
          id: product.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};


// export const updateProduct = async (req, res) => {
//   try {
//     const product = await Products.findOne({
//       where: {
//         uuid: req.params.id,
//       },
//     });
//     if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    
//     let fileName = "";
//     if (req.files === null) {
//       fileName = product.image;
//     } else {
//       const file = req.files.file;
//       const fileSize = file.data.length;
//       const ext = path.extname(file.name);
//       fileName = file.md5 + ext;
//       const allowedType = [".png", ".jpg", ".jpeg"];

//       if (!allowedType.includes(ext.toLowerCase()))
//         return res.status(422).json({ msg: "Invalid Images" });
//       if (fileSize > 5000000)
//         return res.status(422).json({ msg: "Image must be less than 5 MB" });

//       const filepath = `./public/images/${product.image}`;
//       fs.unlinkSync(filepath);

//       file.mv(`./public/images/${fileName}`, (err) => {
//         if (err) return res.status(500).json({ msg: err.message });
//       });
//     }
//     const { name, price, categoryId, } = req.body;
//     const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
//     if (req.role === "admin") {
//       await Products.update(
//         {
//           name: name,
//           price: price,
//           categoryId: categoryId,
//           image: fileName,
//           url: url,
//         },
//         {
//           where: {
//             id: product.id,
//           },
//         }
//       );
//     } 
//     res.status(200).json({ msg: "Products updated successfuly" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };
export const deleteProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath);
    await Products.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Products.findOne({
//       where: {
//         uuid: req.params.id,
//       },
//     });
//     if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
//     const { name, price } = req.body;
//     if (req.role === "admin") {
//       await Products.destroy({
//         where: {
//           id: product.id,
//         },
//       });
//     } else {
//       if (req.userId !== product.userId)
//         return res.status(403).json({ msg: "Akses terlarang" });
//       await Products.destroy({
//         where: {
//           [Op.and]: [{ id: product.id }],
//         },
//       });
//     }
//     try {
//       const filepath = `./public/images/${product.image}`;
//       fs.unlinkSync(filepath);
//       await Products.destroy({
//         where: {
//           id: req.params.id,
//         },
//       });
//       res.status(200).json({ msg: "Products Deleted Successfuly" });
//     } catch (error) {
//       console.log(error.message);
//     }
//     res.status(200).json({ msg: "Products deleted successfuly" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };
