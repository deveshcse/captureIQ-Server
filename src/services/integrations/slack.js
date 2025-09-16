import axios from "axios";

export const sendSlackMessage = async (webhookUrl, message) => {
  try {
    const response = await axios.post(webhookUrl, { text: message });
    return {
      success: true,
      status: response.status,
      data: response, // should be "ok"
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data || error.message,
    };
  }
};
