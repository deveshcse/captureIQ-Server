import UserProfile from "../models/UserProfile.js";
import { addToSheet } from "../services/integrations/googleSheetService.js";
import { createHubspotContact } from "../services/integrations/hubspot.js";
import { sendSlackMessage } from "../services/integrations/slack.js";

export async function create(req, res) {
  try {
    const { firstName, lastName, phoneNumber, isMarried } = req.body;
    console.log(firstName, lastName, phoneNumber, isMarried);

    const profile = new UserProfile({
      firstName,
      lastName,
      phoneNumber,
      isMarried,
    });
    const saved = await profile.save();

    // trigger Google Sheets integration
    await addToSheet([
      firstName,
      lastName,
      phoneNumber,
      isMarried,
    ]);

    // trigger Slack integration
    const slackMessage = `A new submission with details:\n\`\`\`{\n  "firstName": "${firstName}",\n  "lastName": "${lastName}",\n  "phoneNumber": "${phoneNumber}",\n  "isMarried": ${isMarried},\n  "createdAt": "${new Date().toISOString()}"\n}\`\`\``;

    await sendSlackMessage(process.env.SLACK_WEBHOOK_URL, slackMessage);

    // trigger Hubspot integration
    await createHubspotContact({ firstName, lastName, phoneNumber, isMarried });

    return res.status(201).json({ data: saved });
  } catch (error) {
    console.error("Error creating user profile:", error);
    return res.status(500).json({
      message: "Something went wrong while creating user profile",
      error: error.message,
    });
  }
}
