import chargebee from "chargebee";

if (!process.env.CHARGEBEE_SITE || !process.env.CHARGEBEE_API_KEY) {
    throw new Error("Chargebee environment variables are not set");
}

chargebee.configure({
    site: process.env.CHARGEBEE_SITE!,
    api_key: process.env.CHARGEBEE_API_KEY!,
});

export default chargebee; 