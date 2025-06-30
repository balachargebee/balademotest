import Chargebee from "chargebee";
import { API_KEY, SITE_ID } from "./config";

if (!SITE_ID || !API_KEY) {
  throw new Error(
    "Chargebee environment variables are not set. Please set NEXT_PUBLIC_CHARGEBEE_SITE and CHARGEBEE_API_KEY in your environment variables."
  );
}

export const chargebee = new Chargebee();
chargebee.configure({ site: SITE_ID, api_key: API_KEY });
