export interface FraudData {
  id: string;
  type: string;
  confidence: number;
  description: string;
  timestamp: string;
  details: {
    ipAddress?: string;
    location?: string;
    device?: string;
    transactionId?: string;
    amount?: number;
    source?: string;
  };
}

export const generateMockFraudData = (input: string): FraudData[] => {
  // Generate a deterministic result based on the input
  const seed = input.length + input.charCodeAt(0) + (input.charCodeAt(input.length - 1) || 0);
  const fraudCount = Math.max(1, (seed % 5) + 1);

  const types = [
    "Account Takeover",
    "Payment Fraud",
    "Identity Theft",
    "Synthetic Identity",
    "Card Testing",
    "Chargeback Fraud",
    "Promo Abuse"
  ];

  const descriptions = [
    "Multiple failed login attempts from unusual location",
    "Unusual transaction pattern detected",
    "Login from unrecognized device",
    "Multiple accounts from same IP address",
    "Rapid succession of small transactions",
    "Transaction from blacklisted IP range",
    "Mismatch between billing and shipping information"
  ];

  const locations = [
    "New York, US",
    "Lagos, Nigeria",
    "Moscow, Russia",
    "Beijing, China",
    "Mumbai, India",
    "Kiev, Ukraine",
    "London, UK"
  ];

  const devices = [
    "iPhone 14 Pro / iOS 16",
    "Samsung Galaxy S22 / Android 13",
    "Windows 11 / Chrome",
    "macOS Ventura / Safari",
    "Linux / Firefox",
    "iPad Pro / iOS 16",
    "Unknown Device"
  ];

  const results: FraudData[] = [];

  for (let i = 0; i < fraudCount; i++) {
    const typeIndex = (seed * (i + 1)) % types.length;
    const descIndex = (seed * (i + 2)) % descriptions.length;
    const locIndex = (seed * (i + 3)) % locations.length;
    const devIndex = (seed * (i + 4)) % devices.length;
    
    // Generate a confidence score that feels realistic
    const baseConfidence = (seed % 30) + 60;
    const confidenceVariation = ((i * seed) % 20) - 10;
    const confidence = Math.min(Math.max(baseConfidence + confidenceVariation, 60), 99);
    
    // Generate a realistic timestamp within the last 30 days
    const now = new Date();
    const daysAgo = (seed * (i + 1)) % 30;
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    
    results.push({
      id: `FR-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`,
      type: types[typeIndex],
      confidence,
      description: descriptions[descIndex],
      timestamp: date.toISOString(),
      details: {
        ipAddress: `${((seed * 104729) % 256)}.${((seed * 104723) % 256)}.${((seed * 104717) % 256)}.${((seed * 104711) % 256)}`,
        location: locations[locIndex],
        device: devices[devIndex],
        transactionId: `TX-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`,
        amount: Math.round((seed * (i + 1) * 7.3) % 1000 + 50),
        source: input
      }
    });
  }
  
  return results;
};

export const fetchFraudResults = (input: string): Promise<FraudData[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(generateMockFraudData(input));
    }, 1500);
  });
};
