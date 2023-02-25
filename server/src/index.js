import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';
import path from 'path';

//* custom imports
import config from './config';
import routes from './routes';
import { connect } from './db';
import { apiLimit, credentials } from './middleware';
import { corsOptions } from './utils/corOptions';

const MongoDBStore = connectMongoDBSession(session);
//* load env variables
dotenv.config();

//* express instance
const app = express();

//* connect to db
connect();

//* middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

// * session
const store = new MongoDBStore({
    uri: config.db.uri,
    collection: 'sessions',
    expires: 7 * 24 * 60 * 60 * 1000, // * 7 days
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }
});

store.on('error', (error) => {
    console.log(error);
});


app.use(session({
    secret: config.secrets.jwt,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { 
        htmlOnly: true,
        maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000, // * 7 days
        secure: config.env === 'production' ? true : false,
        sameSite: 'none'
     }
}));

// * custom middleware

//* routes
const __dirname = path.resolve();
app.use('/api', apiLimit, routes);
app.use('/static', express.static(path.join(__dirname, 'public/uploads')));


//* create express server
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});
