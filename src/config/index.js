import { config } from "dotenv";

// Load environment variables
config();

const {
  MONGODB_URI,
  PORT,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_SHEETS_SPREADSHEET_ID,
  GOOGLE_SHEETS_RANGE,
  SLACK_WEBHOOK_URL,
  HUBSPOT_API_KEY,
  HUBSPOT_API_BASE,
  LOG_LEVEL,
} = process.env;

console.log(process.env.MONGODB_URI);
console.log("MONGODB_URI:", MONGODB_URI);

export default {
  mongodbUri: MONGODB_URI,
  dbName: MONGODB_URI?.split("/")?.pop() || "test",
  port: PORT || 4000,
  google: {
    clientEmail: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: GOOGLE_PRIVATE_KEY
      ? GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
    spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
    range: GOOGLE_SHEETS_RANGE || "Sheet1!A:E",
  },
  slack: {
    webhookUrl: SLACK_WEBHOOK_URL,
  },
  hubspot: {
    apiKey: HUBSPOT_API_KEY,
    base: HUBSPOT_API_BASE || "https://api.hubapi.com",
  },
  logLevel: LOG_LEVEL || "info",
};

// import { config } from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import { existsSync } from 'fs';

// // Get current directory in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Check if .env file exists
// const envPath = join(__dirname, '.env');
// console.log('Looking for .env at:', envPath);
// console.log('.env file exists:', existsSync(envPath));

// // Load environment variables with explicit path
// const result = config({ path: envPath });

// if (result.error) {
//   console.error('Error loading .env file:', result.error);
// } else {
//   console.log('✅ .env file loaded successfully');
// }

// // Debug: Show all process.env keys that start with our prefixes
// console.log('\n=== Environment Variables Debug ===');
// const ourKeys = Object.keys(process.env).filter(key =>
//   key.startsWith('MONGODB_') ||
//   key.startsWith('GOOGLE_') ||
//   key.startsWith('SLACK_') ||
//   key.startsWith('HUBSPOT_') ||
//   key === 'PORT' ||
//   key === 'LOG_LEVEL'
// );

// console.log('Found env variables:', ourKeys);
// ourKeys.forEach(key => {
//   console.log(`${key}:`, process.env[key] ? '✅ SET' : '❌ NOT SET');
// });

// const {
//   MONGODB_URI, PORT, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY,
//   GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SHEETS_RANGE,
//   SLACK_WEBHOOK_URL, HUBSPOT_API_KEY, HUBSPOT_API_BASE, LOG_LEVEL
// } = process.env;

// console.log('\n=== Destructured Values ===');
// console.log('MONGODB_URI:', MONGODB_URI || 'UNDEFINED');
// console.log('PORT:', PORT || 'UNDEFINED');
// console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL:', GOOGLE_SERVICE_ACCOUNT_EMAIL || 'UNDEFINED');

// export default {
//   mongodbUri: MONGODB_URI,
//   dbName: (MONGODB_URI?.split('/')?.pop()) || 'test',
//   port: PORT || 4000,
//   google: {
//     clientEmail: GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     privateKey: GOOGLE_PRIVATE_KEY ? GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
//     spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
//     range: GOOGLE_SHEETS_RANGE || 'Sheet1!A:E'
//   },
//   slack: {
//     webhookUrl: SLACK_WEBHOOK_URL
//   },
//   hubspot: {
//     apiKey: HUBSPOT_API_KEY,
//     base: HUBSPOT_API_BASE || 'https://api.hubapi.com'
//   },
//   logLevel: LOG_LEVEL || 'info'
// };
