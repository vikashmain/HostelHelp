import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { fail, id } from "../utils/response.js";

const secret = () => process.env.JWT_SECRET || "change-this-in-production";

export function createToken(user) {
  return jwt.sign({ id: id(user) }, secret(), { expiresIn: "7d" });
}

export async function auth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return fail(res, 401, "Please log in first.");
  try {
    req.user = await User.findById(jwt.verify(token, secret()).id);
    if (!req.user) throw new Error("User not found");
    next();
  } catch {
    return fail(res, 401, "Your session has expired. Please log in again.");
  }
}

export function incharge(req, res, next) {
  return req.user?.role === "incharge" ? next() : fail(res, 403, "Only incharges can do this.");
}
