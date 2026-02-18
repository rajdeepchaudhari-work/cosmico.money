/**
 * Maps common merchant/transaction names to their root domain for logo.dev lookups.
 * Keys are lowercase first-word extractions from the transaction name.
 */
const MERCHANT_MAP: Record<string, string> = {
  // Food & drink
  "starbucks": "starbucks.com",
  "mcdonalds": "mcdonalds.com",
  "mcdonald": "mcdonalds.com",
  "chipotle": "chipotle.com",
  "subway": "subway.com",
  "dominos": "dominos.com",
  "domino": "dominos.com",
  "pizzahut": "pizzahut.com",
  "kfc": "kfc.com",
  "wendys": "wendys.com",
  "dunkin": "dunkindonuts.com",
  "taco": "tacobell.com",
  "burgerking": "burgerking.com",
  "pret": "pret.com",
  "greggs": "greggs.co.uk",
  "costa": "costa.co.uk",
  "nandos": "nandos.co.uk",
  "wagamama": "wagamama.com",
  "itsu": "itsu.com",
  "leon": "leon.co.uk",

  // Ride & delivery
  "uber": "uber.com",
  "lyft": "lyft.com",
  "deliveroo": "deliveroo.com",
  "justeat": "just-eat.co.uk",
  "doordash": "doordash.com",
  "grubhub": "grubhub.com",

  // Shopping
  "amazon": "amazon.com",
  "amzn": "amazon.com",
  "walmart": "walmart.com",
  "target": "target.com",
  "bestbuy": "bestbuy.com",
  "costco": "costco.com",
  "ikea": "ikea.com",
  "ebay": "ebay.com",
  "etsy": "etsy.com",
  "asos": "asos.com",
  "zara": "zara.com",
  "hm": "hm.com",
  "primark": "primark.com",
  "marks": "marksandspencer.com",
  "johnlewis": "johnlewis.com",
  "argos": "argos.co.uk",
  "currys": "currys.co.uk",

  // Streaming & tech
  "netflix": "netflix.com",
  "spotify": "spotify.com",
  "apple": "apple.com",
  "google": "google.com",
  "microsoft": "microsoft.com",
  "adobe": "adobe.com",
  "dropbox": "dropbox.com",
  "github": "github.com",
  "notion": "notion.so",
  "slack": "slack.com",
  "zoom": "zoom.us",
  "disney": "disneyplus.com",
  "hulu": "hulu.com",
  "youtube": "youtube.com",
  "twitch": "twitch.tv",
  "playstation": "playstation.com",
  "xbox": "xbox.com",

  // Travel
  "airbnb": "airbnb.com",
  "booking": "booking.com",
  "expedia": "expedia.com",
  "hotels": "hotels.com",
  "ryanair": "ryanair.com",
  "easyjet": "easyjet.com",
  "british": "britishairways.com",
  "delta": "delta.com",
  "united": "united.com",
  "southwest": "southwest.com",

  // Finance
  "paypal": "paypal.com",
  "stripe": "stripe.com",
  "coinbase": "coinbase.com",
  "revolut": "revolut.com",
  "monzo": "monzo.com",
  "wise": "wise.com",
  "venmo": "venmo.com",
  "cashapp": "cash.app",

  // Fuel
  "shell": "shell.com",
  "bp": "bp.com",
  "chevron": "chevron.com",
  "exxon": "exxon.com",
  "texaco": "texaco.com",
  "esso": "esso.com",

  // Grocery / retail
  "tesco": "tesco.com",
  "sainsburys": "sainsburys.co.uk",
  "sainsbury": "sainsburys.co.uk",
  "asda": "asda.com",
  "morrisons": "morrisons.com",
  "waitrose": "waitrose.com",
  "aldi": "aldi.co.uk",
  "lidl": "lidl.co.uk",
  "wholefood": "wholefoods.com",
  "wholefoods": "wholefoods.com",
  "kroger": "kroger.com",
  "safeway": "safeway.com",
  "trader": "traderjoes.com",
  "cvs": "cvs.com",
  "walgreens": "walgreens.com",
  "boots": "boots.com",
  "superdrug": "superdrug.com",
};

/**
 * Derives a best-effort domain from a transaction/merchant name for logo.dev.
 * e.g. "STARBUCKS #1234" → "starbucks.com"
 *      "Amazon.com*XYZ"  → "amazon.com"
 */
export function getMerchantDomain(rawName: string): string {
  // If the name already looks like a domain, use it directly
  const domainMatch = rawName.match(/([a-z0-9-]+\.(com|co\.uk|co|net|io|org|us|app|so|tv))/i);
  if (domainMatch) return domainMatch[0].toLowerCase();

  // Strip common noise: numbers, punctuation, suffixes
  const cleaned = rawName
    .toLowerCase()
    .replace(/[*#@\d]/g, '')           // remove symbols and digits
    .replace(/\b(inc|llc|corp|ltd|co|plc|the|and|uk|us)\b/g, '')
    .replace(/[^a-z\s]/g, '')          // keep only letters and spaces
    .trim();

  const firstWord = cleaned.split(/\s+/)[0];

  return MERCHANT_MAP[firstWord] ?? `${firstWord}.com`;
}
