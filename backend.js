const express = require("express");
const nodemailer = require("nodemailer");
const http = require("http");
const https = require("https");
const cors = require("cors"); // Import cors
const { URL } = require("url"); // Require the URL module
const app = express();
const dotenv = require("dotenv").config(); // Load environment variables
app.use(cors());
// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Use environment variable
    pass: process.env.GMAIL_PASS, // Use environment variable
  },
});

// List of URLs to check
const urls = [
  "https://iwrdup.com/actuator/health",
  "https://pragati.iwrdup.com/actuator/health",
  "https://lmsupsdm.com/actuator/health",
  "http://dmsupsdm.com/actuator/health",
  "https://water.iwrdup.com/iwrdup/login",
  "https://jalshakti.iwrdup.com/minister/dashboard",
  // "http://178.238.227.191:7171/actuator/health",
];

// Interval in milliseconds (10 seconds)
const interval = 60 * 1000;

// Function to periodically check URL health
const checkHealth = () => {
  urls.forEach(async (url) => {
    try {
      const result = await checkUrl(url);
      console.log(`Health check for ${url}:`, result);
    } catch (error) {
      console.error(`Error checking health for ${url}:`, error);
    }
  });
};

// Check URL health initially
checkHealth();

// Schedule health checks every 10 seconds
setInterval(checkHealth, interval);

// Endpoint to trigger health check
app.get("/trigger-health-check", async (req, res) => {
  try {
    const results = await Promise.all(urls.map(checkUrl));
    console.log("Health Check Results:", results);
    res.json(results);
  } catch (error) {
    console.error("Error checking health:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Additional endpoint
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});
// jijfeoof
// Function to check URL health
async function checkUrl(url) {
  const parsedUrl = new URL(url); // Parse the URL
  const protocol = parsedUrl.protocol === "https:" ? https : http;

  return new Promise((resolve, reject) => {
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: "GET",
      rejectUnauthorized: false,
    };

    const req = protocol.request(requestOptions, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const status = response.statusCode === 200 ? "UP" : "DOWN";
        console.log("status",status);
        const result = { url, status };
        if (status === "DOWN" || status==="ERROR") {
          // Send email notification
          sendEmailNotification(url);
        }
       
        resolve(result);
      });
    });
  

 
    req.on("error", (error) => {
      console.error(`Error checking ${url}:`, error);
      if (error.code === 'ETIMEDOUT') {
        // Handle connection timeout error
        sendEmailNotification(url);
      }
      resolve({ url, status: "ERROR" });
    });

    req.end();
  });
}

// Function to send email notification
function sendEmailNotification(url) {
  const mailOptions = {
    from: "no.reply.gccloud@gmail.com",
    to: ["sameer.1923ec1111@kiet.edu","rahul@gccloudinfo.com","sameer@gccloudinfo.com"],
    subject: "Server Down Email",
    text: `The server at ${url} is down .`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
