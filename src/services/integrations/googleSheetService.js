import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../../credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export const addToSheet = async (spreadsheetId, data) => {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:D", // must match your headers
    valueInputOption: "RAW",
    requestBody: {
      values: [data],
    },
  });
};
