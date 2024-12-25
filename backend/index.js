import express from "express"
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import calculateDistanceInKM from './calculateDistanceInKM.js';
import setMailOptions from "./mailOptions.js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASS = process.env.EMAIL_PASS || "";

app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.get('/api/parking-lots', async (req, res) => {
  try {
    const parkingLots = await prisma.parkingLot.findMany({
      include: {
        slots: true,
      },
    });

    res.json(parkingLots);  // Return the data as JSON
  } catch (error) {
    console.error('Error fetching ParkingLot data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/nearby-parking-lots', async (req, res) => {
  const { userLat, userLon } = req.body;

  console.log("User Latitude:", userLat)
  console.log("User Longitude:", userLon)

  if (!userLat || !userLon) {
    return res.status(400).json({ message: 'User location (latitude, longitude) is required' });
  }

  try {
    const parkingLots = await prisma.parkingLot.findMany();

    const nearbyParkingLots = parkingLots.filter(lot => {
      const distance = calculateDistanceInKM(userLat, userLon, lot.latitude, lot.longitude);
      return distance <= 10;
    });

    res.json(nearbyParkingLots);
  } catch (error) {
    console.error('Error fetching nearby parking lots:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/lot-details', async (req, res) => {
  const { parkingLotName, userLat, userLon } = req.body;

  try {
    // Query the ParkingLot by name
    const parkingLot = await prisma.parkingLot.findFirst({
      where: {
        name: parkingLotName,
      },
      include: {
        slots: true,
      },
    });

    if (!parkingLot) {
      return res.status(404).json({ message: 'Parking lot not found' });
    }

    const distance = calculateDistanceInKM(
      userLat,
      userLon,
      parkingLot.latitude,
      parkingLot.longitude
    );

    // Count total slots and filled/available slots
    const totalSlots = parkingLot.totalSlots;
    const filledSlots = parkingLot.slots.filter(slot => !slot.status).length;
    const availableSlots = totalSlots - filledSlots;

    // Prepare response data
    const responseData = {
      parkingLotName: parkingLot.name,
      latitude: parkingLot.latitude,
      longitude: parkingLot.longitude,
      distance: distance.toFixed(2),
      totalSlots,
      availableSlots,
      filledSlots,
    };

    // Send the response
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching lot details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/api/send-feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or your preferred email service
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = setMailOptions(name, email, message, EMAIL_USER);

    const info = await transporter.sendMail(mailOptions);
    console.log("Feedback email sent:", info.response);

    res.status(200).json({ success: true, message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("Error sending feedback email:", error);
    res.status(500).json({ success: false, error: "Failed to send feedback." });
  }
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
