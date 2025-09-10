
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const config = require('./src/config.cjs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/news', async (req, res) => {
  const { category, page, pageSize } = req.query;
  let lastError = null;
  for (const apiKey of config.apiKeys) {
    try {
      const response = await axios.get(config.baseUrl, {
        params: { category, page, pageSize, apiKey },
      });
      if (response.data.status === 'ok') {
        return res.json(response.data);
      }
    } catch (error) {
      lastError = error;
    }
  }
  res.status(500).json({ error: 'All API keys failed', details: lastError?.message });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
