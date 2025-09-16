import axios from "axios";
import config from "../../config/index.js";


const HUBSPOT_API_BASE = config.hubspot.base;
const apiKey = config.hubspot.apiKey;


export const createHubspotContact = async ({ firstName, lastName, phoneNumber, isMarried }) => {
  try {
    // 1. Search contact by phone
    const searchResponse = await axios.post(
      `${HUBSPOT_API_BASE}/search`,
      {
        filterGroups: [
          {
            filters: [
              { propertyName: "phone", operator: "EQ", value: phoneNumber }
            ]
          }
        ],
        properties: ["firstname", "lastname", "email", "phone"]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (searchResponse.data.total > 0) {
      // Contact exists → Update
      const contactId = searchResponse.data.results[0].id;
      await axios.patch(
        `${HUBSPOT_API_BASE}/${contactId}`,
        {
          properties: {
            firstname: firstName,
            lastname: lastName,
            phone: phoneNumber,
            is_married: isMarried
          }
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );
      return { action: "updated", contactId };
    } else {
      // Contact not found → Create
      const createResponse = await axios.post(
        HUBSPOT_API_BASE,
        {
          properties: {
            firstname: firstName,
            lastname: lastName,
            phone: phoneNumber,
            is_married: isMarried
          }
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("HubSpot create response:", createResponse.data);
      return { action: "created", contactId: createResponse.data.id };
    }
  } catch (err) {
    console.error("HubSpot upsert error:", err.response?.data || err.message);
    throw new Error("HubSpot integration failed");
  }
};
