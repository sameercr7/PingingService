// const express = require("express");
// const nodemailer = require("nodemailer");
// const http = require("http");
// const https = require("https");
// const axios = require('axios');
// const cors = require("cors"); // Import cors
// const { URL } = require("url"); // Require the URL module

// const app = express();
// const dotenv = require("dotenv").config(); // Load environment variables
// app.use(cors());
// // Email configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER, // Use environment variable
//     pass: process.env.GMAIL_PASS, // Use environment variable
//   },
// });


// const sslRootCas = require('ssl-root-cas/latest');

// // Configure the global HTTPS agent with the root certificates
// https.globalAgent.options.ca = sslRootCas.create();

// // Create an HTTPS agent that ignores SSL certificate errors
// const agent = new https.Agent({
//   rejectUnauthorized: false, // Disables SSL certificate validation
// });

// const urls = [
//   "https://iwrdup.com/actuator/health",
//   "https://pragati.iwrdup.com/actuator/health",
//   "https://lmsupsdm.com/actuator/health",
//   "http://dmsupsdm.com/actuator/health",
//   "https://water.iwrdup.com/actuator/health",
//   "https://jalshakti.iwrdup.com/actuator/health",
//   "http://kumbh.iwrdup.com/actuator/health",
//   "http://monitor.iwrdup.com/actuator/health",
//   "http://namami.iwrdup.com/actuator/health",
//   "http://178.238.227.191:7171/actuator/health",
// ];



// // Function to handle and format response messages
// function makingResponse(status, url) {
//   if (status === 'UP') {
//     console.log(`status: UP\nurl: ${url}`);
//   } else {
//     console.log(`status: DOWN\nurl: ${url}`);
//   }
// }


// // Function to check health of URLs and send notifications if needed
// async function checkHealthUrls() {
//   for (const url of urls) {
//     try {
//       const response = await axios.get(url, { httpsAgent: agent });
//       // console.log(`URL: ${url}`);
//       console.log(`Status: ${response.status}`);
//       console.log(`Data: ${JSON.stringify(response.data, null, 2)}`);
      


    
//       // Check the status field in the response data
//       if (response.data.status === "UP") {
//         makingResponse('UP', url);
//       } else {
//         makingResponse('DOWN', url);
//         sendEmailNotification(url);
//       }
      
//     } catch (error) {
//       console.error(`Error fetching ${url}: ${error.message}`);
//       makingResponse('DOWN', url);
//       // If the URL fails to fetch, send an email notification
//       sendEmailNotification(url);

//     }
//   }
// }

// checkHealthUrls();


// // // Interval in milliseconds (10 seconds)
// const interval = 60 * 1000;
// setInterval(checkHealthUrls, interval);
// // // Function to periodically check URL health
// // const checkHealth = () => {
// //   urls.forEach(async (url) => {
// //     try {
// //       const result = await checkUrl(url);
// //       console.log(`Health check for ${url}:`, result);
// //     } catch (error) {
// //       console.error(`Error checking health for ${url}:`, error);
// //     }
// //   });
// // };
// // Endpoint to trigger health check and return results in JSON format
// app.get('/trigger-health-check', async (req, res) => {
//   try {
//     const results = await checkHealthUrls();
//     res.json(results);
//   } catch (error) {
//     console.error(`Error during health check: ${error.message}`);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // // Check URL health initially
// // checkHealth();

// // // Schedule health checks every 10 seconds
// // setInterval(checkHealth, interval);

// // // Endpoint to trigger health check
// // app.get("/trigger-health-check", async (req, res) => {
// //   try {
// //     const results = await Promise.all(urls.map(checkUrl));
// //     console.log("Health Check Results:", results);
// //     res.json(results);
// //   } catch (error) {
// //     console.error("Error checking health:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // // Additional endpoint
// // app.get("/hello", (req, res) => {
// //   res.send("Hello, World!");
// // });
// // // jijfeoof
// // // Function to check URL health
// // async function checkUrl(url) {
// //   const parsedUrl = new URL(url); // Parse the URL
// //   const protocol = parsedUrl.protocol === "https:" ? https : http;

// //   return new Promise((resolve, reject) => {
// //     const requestOptions = {
// //       hostname: parsedUrl.hostname,
// //       port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
// //       path: parsedUrl.pathname + parsedUrl.search,
// //       method: "GET",
// //       rejectUnauthorized: false,
// //     };

// //     const req = protocol.request(requestOptions, (response) => {
// //       let data = "";

// //       response.on("data", (chunk) => {
// //         data += chunk;
// //       });

// //       response.on("end", () => {
     
// //         const status = response.statusCode === 200 ? "UP" : "DOWN";
// //         console.log("status",status);
// //         const result = { url, status };
// //         if (status === "DOWN" || status==="ERROR") {
// //           // Send email notification
// //           sendEmailNotification(url);
// //         }
       
// //         resolve(result);
// //       });
// //     });
  

 
// //     req.on("error", (error) => {
// //       console.error(`Error checking ${url}:`, error);
// //       if (error.code === 'ETIMEDOUT') {
// //         // Handle connection timeout error
// //         sendEmailNotification(url);
// //       }
// //       resolve({ url, status: "ERROR" });
// //     });

// //     req.end();
// //   });
// // }

// // // Function to send email notification
// function sendEmailNotification(url) {
//   const mailOptions = {
//     from: "no.reply.gccloud@gmail.com",
//     to: ["sameer.1923ec1111@kiet.edu","rahul@gccloudinfo.com","sameer@gccloudinfo.com"],
//     subject: "Server Down Email",
//     text: `The server at ${url} is down .`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.error("Error sending email:", error);
//     } else {
//       console.log("Email sent:", info.response);
//     }
//   });
// }

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const nodemailer = require("nodemailer");
const https = require("https");
const axios = require('axios');
const cors = require("cors");
const { URL } = require("url");

const app = express();
const dotenv = require("dotenv").config();
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sslRootCas = require('ssl-root-cas/latest');
https.globalAgent.options.ca = sslRootCas.create();

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const urls = [
  "https://iwrdup.com/actuator/health",
  "https://pragati.iwrdup.com/actuator/health",
  "https://lmsupsdm.com/actuator/health",
  "http://dmsupsdm.com/actuator/health",
  "https://water.iwrdup.com/actuator/health",
  "https://jalshakti.iwrdup.com/actuator/health",
  "http://kumbh.iwrdup.com/actuator/health",
  "http://monitor.iwrdup.com/actuator/health",
  "http://namami.iwrdup.com/actuator/health",

];

// Function to handle and format response messages
function makingResponse(status, url) {
  return { status, url };
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

// Function to check health of URLs and send notifications if needed
async function checkHealthUrls() {
  const results = [];
  for (const url of urls) {
    try {
      const response = await axios.get(url, { httpsAgent: agent });
      const status = response.data.status === "UP" ? 'UP' : 'DOWN';
      results.push(makingResponse(status, url));

      if (status === 'DOWN') {
        sendEmailNotification(url);
      }
    } catch (error) {
      console.error(`Error fetching ${url}: ${error.message}`);
      results.push(makingResponse('DOWN', url));
      sendEmailNotification(url);
    }
  }
  return results;
}

// Endpoint to trigger health check and return results in JSON format
app.get('/trigger-health-check', async (req, res) => {
  try {
    const results = await checkHealthUrls();
    res.json(results);
  } catch (error) {
    console.error(`Error during health check: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Interval in milliseconds (60 seconds)
const interval = 60 * 1000;
setInterval(async () => {
  const results = await checkHealthUrls();
  console.log('Health check results:', results);
}, interval);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});