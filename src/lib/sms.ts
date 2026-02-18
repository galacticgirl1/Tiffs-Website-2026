import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const ownerPhone = process.env.OWNER_PHONE_NUMBER;

export async function sendOrderNotification(orderDetails: {
  orderId: string;
  itemCount: number;
  total: number;
  items: string[];
}) {
  if (!accountSid || !authToken || !twilioPhone || !ownerPhone) {
    console.warn("SMS not configured — missing Twilio env vars");
    return null;
  }

  const client = twilio(accountSid, authToken);

  const itemList = orderDetails.items.slice(0, 5).join(", ");
  const body = [
    `🛒 New Order! #${orderDetails.orderId}`,
    `Items (${orderDetails.itemCount}): ${itemList}`,
    `Total: $${orderDetails.total.toFixed(2)}`,
    `— Reactivate MBS`,
  ].join("\n");

  try {
    const message = await client.messages.create({
      body,
      from: twilioPhone,
      to: ownerPhone,
    });
    console.log("SMS sent:", message.sid);
    return message.sid;
  } catch (error) {
    console.error("SMS send failed:", error);
    return null;
  }
}
