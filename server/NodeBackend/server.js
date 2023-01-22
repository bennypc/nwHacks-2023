const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors())
const port = 3001;

const analyzeRouter = require('./routes/analyzer');
app.use('/getAnalyzedData', analyzeRouter);

app.listen(port, () => {
    console.log('listening on 3001')
})