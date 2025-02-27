import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.userId = user.uuid;
  await req.session.save(); 
  console.log(req.session)
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};
export const Register = async (req, res) => {
  const { username, email, password, confPassword} =
    req.body;
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    return res.status(400).json({ msg: "Email Sudah Digunakan" });
  }

  // Check if the password and confirmation password match
  try {
    const hashPassword = await argon2.hash(password);
    await Users.create({
      username: username,
      email: email,
      password: hashPassword,
      role: "user",
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: "Gagal Membuat Akun" });
  }
};

export const Me = async (req, res) => {
  console.log("Session: ", req.session); // 🔥 Debug session
  console.log("Cookies: ", req.cookies); // 🔥 Debug cookies
  console.log("Headers: ", req.headers); // 🔥 Debug headers

  // Ambil UUID dari Header (yang dikirim dari Frontend)
  const uuid = req.headers.authorization?.split("Bearer ")[1]; 

  if (!uuid) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }

  const user = await Users.findOne({
    attributes: ["uuid", "username", "email", "role"],
    where: {
      uuid: uuid, // ✅ Cari user berdasarkan UUID dari frontend
    },
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  res.status(200).json(user);
};


export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
