const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "vitalis-demo.vercel.app";

export const siteUrl = new URL(`https://${host}`);
