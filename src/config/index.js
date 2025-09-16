import process from 'process';

const {
  MONGODB_URI, PORT, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY,
  GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SHEETS_RANGE,
  SLACK_WEBHOOK_URL, HUBSPOT_API_KEY, HUBSPOT_API_BASE, LOG_LEVEL
} = process.env;

export default {
  mongodbUri: MONGODB_URI,
  dbName: (MONGODB_URI?.split('/')?.pop()) || 'test',
  port: PORT || 4000,
  google: {
    clientEmail: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: GOOGLE_PRIVATE_KEY ? GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
    range: GOOGLE_SHEETS_RANGE || 'Sheet1!A:E'
  },
  slack: {
    webhookUrl: SLACK_WEBHOOK_URL
  },
  hubspot: {
    apiKey: HUBSPOT_API_KEY,
    base: HUBSPOT_API_BASE || 'https://api.hubapi.com'
  },
  logLevel: LOG_LEVEL || 'info'
};
