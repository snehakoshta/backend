import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // body-parser is included in express

// Routes
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Use your own email to avoid Gmail restrictions
      replyTo: email, // So you can reply to the user
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err.message);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Health check
app.get("/ping", (req, res) => res.send("pong"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
