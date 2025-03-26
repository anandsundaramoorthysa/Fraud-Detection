const axios = require('axios');

const analyzeFraudWithIPQS = async (req, res) => {
  try {
    const inputData = req.body;
    const activeTab = inputData.activeTab;
    let searchTerm;
    let apiUrl;

    const apiKey = process.env.IPQS_API_KEY;

    if (activeTab === 'ip') {
      searchTerm = inputData.ip;
      apiUrl = `https://ipqualityscore.com/api/json/ip/${apiKey}/${searchTerm}`;
    } else if (activeTab === 'email') {
      searchTerm = inputData.email;
      apiUrl = `https://ipqualityscore.com/api/json/email/${apiKey}/${searchTerm}`; 
    } else {
      return res.status(400).json({ error: `Analysis for tab "${activeTab}" is not yet implemented with IPQS for this example.` });
    }

    if (!searchTerm) {
      return res.status(400).json({ error: `No search term provided for tab "${activeTab}".` });
    }

    console.log('Calling IPQS API with URL:', apiUrl);

    let ipqsResponse;
    try {
      ipqsResponse = await axios.get(apiUrl);
      console.log('IPQS Raw Response (Status):', ipqsResponse.status);
      console.log('IPQS Raw Response (Data):', ipqsResponse.data);
    } catch (error) {
      console.error('Error during IPQS API call:', error.message);
      if (error.response) {
        console.error('IPQS Error Response (Status):', error.response.status);
        console.error('IPQS Error Response (Data):', error.response.data);
      }
      return res.status(500).json({ error: 'Failed to analyze with IPQS - API error.' });
    }

    const ipqsData = ipqsResponse.data;
    console.log('Data being sent to frontend:', ipqsData);

    res.json([ipqsData]); 

  } catch (error) {
    console.error('Error in analyzeFraudWithIPQS:', error);
    res.status(500).json({ error: 'Failed to analyze with IPQS - internal server error.' });
  }
};

module.exports = {
  analyzeFraudWithIPQS,
};