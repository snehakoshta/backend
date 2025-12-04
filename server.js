import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      text: message,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
app.get("/", (req, res) => {
  res.send("Backend is successfully running 🚀");
});

