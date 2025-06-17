export async function getEbayAccessToken(): Promise<string | null> {
  const clientId = process.env.EBAY_CLIENT_ID!;
  const clientSecret = process.env.EBAY_CLIENT_SECRET!;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
  });

  if (!response.ok) {
    console.error('❌ Failed to get eBay token:', await response.text());
    return null;
  }

  const data = await response.json();
  return data.access_token;
}
