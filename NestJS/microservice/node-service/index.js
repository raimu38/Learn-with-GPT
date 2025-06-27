const express = require('express')
const axios = require('axios')
const app = express();
const PORT = 3000;

app.get('/service/ping', async (req, res) => {
  try {
    const response = await axios.get('http://fastapi-service:8000/api/data');
    res.json({source : 'node-service', data: response.data});
  }catch(error){
    res.status(500).json({error: 'Failed to contact fastapi-service'});
  }
});

app.listen(PORT, () => {
  console.log(`Node srvice runnning on port ${PORT}`);
});
