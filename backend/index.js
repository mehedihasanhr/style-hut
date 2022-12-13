const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const dbConnect = require('./config/db.config');
const routes = require('./routes');
const {credential} = require('./middlewares/credential');
const {corOptions} = require('./utils/corOptions');
const { expressSharp, FsAdapter, HttpAdapter } = require('express-sharp');

const app = express();
const path = require('path');



// middlewares 
app.use(credential);
app.use(cors(corOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes//
app.use('/api', routes);


// serve images
app.use('/images', expressSharp({
    imageAdapter: new FsAdapter(path.join(__dirname, 'public/')),
    autoUseWebp: true,
    cors: corOptions,  
}));

// server

app.listen(config.PORT, () => {
    dbConnect(); // connect to database
    console.log(`Server is running on port ${config.PORT}`);
})