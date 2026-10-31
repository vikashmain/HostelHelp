import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Complaint, User } from "../models/index.js";

const dbUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hosteldesk";
const password = "123!";
const demoUsers = [
  { name: "Vikash", email: "admin@gmail.com", room_number: "A101", role: "incharge" },
  { name: "Rahul Verma", email: "rahul@hosteldesk.demo", room_number: "B204", role: "resident" },
];

async function seed() {
  await mongoose.connect(dbUri);
  const passwordHash = await bcrypt.hash(password, 12);
  const users = await Promise.all(demoUsers.map((user) => User.findOneAndUpdate(
    { email: user.email },
    { ...user, passwordHash },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  )));
  await Complaint.deleteMany({ user_id: { $in: users.map((user) => user._id) } });
  console.log(`Incharge: admin@gmail.com / ${password}`);
  console.log(`Resident: rahul@hosteldesk.demo / ${password}`);
}

seed().catch((error) => { console.error("Seed failed:", error); process.exitCode = 1; }).finally(() => mongoose.disconnect());
