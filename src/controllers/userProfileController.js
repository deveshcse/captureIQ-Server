import UserProfile from "../models/UserProfile.js";
import { addToSheet } from "../services/integrations/googleSheetService.js";
import { createHubspotContact } from "../services/integrations/hubspot.js";
import { sendSlackMessage } from "../services/integrations/slack.js";
// import IntegrationEvent from '../models/IntegrationEvent.js';
import { createProfileSchema } from "../validators/userProfileValidator.js";
// import integrationsManager from '../services/integrationsManager.js';

/**
 * Create a new user profile and trigger integrations.
 */
export async function create(req, res) {
  // validate
  const { firstName, lastName, phoneNumber, isMarried } = req.body;
  console.log(firstName, lastName, phoneNumber, isMarried);
  // create profile

  // save to DB
  const profile = new UserProfile({
    firstName,
    lastName,
    phoneNumber,
    isMarried,
  });
  const saved = await profile.save();

  // trigger Google Sheets integration
  await addToSheet(process.env.GOOGLE_SHEET_ID, [
    firstName,
    lastName,
    phoneNumber,
    isMarried,
  ]);

  // trigger Slack integration
  console.log("SLACK_WEBHOOK_URL", process.env.SLACK_WEBHOOK_URL);
  const result = await sendSlackMessage(
    process.env.SLACK_WEBHOOK_URL,
    `New user profile created: firstName: ${firstName} , lastName: ${lastName} (${phoneNumber} , Married: ${isMarried})`
  );


  // trigger HubSpot integration
  await createHubspotContact({ firstName, lastName, phoneNumber, isMarried });

  return res.status(201).json({ data: saved });
  //   // create pending integration event records
  //   const services = ['google_sheets', 'slack', 'hubspot'];
  //   const events = services.map(s => ({ profileId: saved._id, service: s, status: 'pending' }));
  //   await IntegrationEvent.insertMany(events);

  //   // trigger integrations and wait for results (we'll report statuses)
  //   const results = await integrationsManager.runAll(saved);

  //   // persist integration results as events (update records)
  //   // results: { google_sheets: { status, reason, meta }, ... }
  //   const integrationsStatus = {};
  //   const bulkOps = [];

  //   for (const [service, r] of Object.entries(results)) {
  //     integrationsStatus[service] = r.status;
  //     bulkOps.push({
  //       updateOne: {
  //         filter: { profileId: saved._id, service },
  //         update: { $set: { status: r.status, reason: r.reason || null, meta: r.meta || {}, createdAt: new Date() } }
  //       }
  //     });
  //   }

  //   if (bulkOps.length) {
  //     await IntegrationEvent.bulkWrite(bulkOps);
  //   }

  //   // send response
  //   res.status(201).json({
  //     data: saved,
  //     integrations: integrationsStatus
  //   });
}
