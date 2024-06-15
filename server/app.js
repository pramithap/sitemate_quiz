const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const issuesRoutes = require('./src/routes/issueRoutes');


const corsOptions = { 
    // origin:'https://abc.onrender.com',
    AccessControlAllowOrigin: '*',  
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
  }
app.use(cors(corsOptions))

app.use('/api', issuesRoutes);

app.use(bodyParser.json());

// Middleware to parse JSON bodies
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});