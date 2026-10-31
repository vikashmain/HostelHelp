import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { createToken } from "../middleware/auth.js";
import { fail, publicUser } from "../utils/response.js";

export async function signup(req, res) {
  const { name, email, password, roomNumber } = req.body;
  if (
    !name?.trim() ||
    !/^\S+@\S+\.\S+$/.test(email || "") ||
    !password ||
    password.length < 6 ||
    !/^[A-Ea-e]\d{1,4}$/.test(roomNumber || "")
  )
    return fail(res, 400, "Please enter valid account details.");
  try {
    const user = await User.create({
      name: name.trim(),
      email,
      passwordHash: await bcrypt.hash(password, 12),
      room_number: roomNumber.toUpperCase(),
    });
    return res
      .status(201)
      .json({ user: publicUser(user), token: createToken(user) });
  } catch {
    return fail(res, 409, "An account with this email already exists.");
  }
}
export async function login(req, res) {
  const user = await User.findOne({
    email: (req.body.email || "").toLowerCase(),
  });
  if (
    !user ||
    !(await bcrypt.compare(req.body.password || "", user.passwordHash))
  )
    return fail(res, 401, "Invalid email or password.");
  return res.json({ user: publicUser(user), token: createToken(user) });
}
export const me = (req, res) => res.json({ user: publicUser(req.user) });
