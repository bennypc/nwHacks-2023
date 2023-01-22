const express = require('express');
const app = express();
const getVideoAnalysis = require('./analyzer')
const port = 3001;

app.post('/analyzeData', async (req, res) => {
    const summary = await getVideoAnalysis(req.url)
    res.send(summary);
})


app.listen(port, () => {
    console.log('listening on 3001')
})