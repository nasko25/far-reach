// Sets up the API client for interacting with your backend. 
// For your API reference, visit: https://docs.gadget.dev/api/far-reacher
import { Client } from "@gadget-client/far-reacher";

export const api = new Client({ environment: window.gadgetConfig.environment });
