"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongodbSession = _interopRequireDefault(require("connect-mongodb-session"));
var _path = _interopRequireDefault(require("path"));
var _config = _interopRequireDefault(require("./config"));
var _routes = _interopRequireDefault(require("./routes"));
var _db = require("./db");
var _middleware = require("./middleware");
var _corOptions = require("./utils/corOptions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//* custom imports

const MongoDBStore = (0, _connectMongodbSession.default)(_expressSession.default);
//* load env variables
_dotenv.default.config();

//* express instance
const app = (0, _express.default)();

//* connect to db
(0, _db.connect)();

//* middleware
app.use(_middleware.credentials);
app.use((0, _cors.default)(_corOptions.corsOptions));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _helmet.default)());
app.use((0, _cookieParser.default)());

// * session
const store = new MongoDBStore({
  uri: _config.default.db.uri,
  collection: 'sessions',
  expires: 7 * 24 * 60 * 60 * 1000,
  // * 7 days
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  }
});
store.on('error', error => {
  console.log(error);
});
app.use((0, _expressSession.default)({
  secret: _config.default.secrets.jwt,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    htmlOnly: true,
    maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
    // * 7 days
    secure: _config.default.env === 'production' ? true : false,
    sameSite: 'none'
  }
}));

// * custom middleware

//* routes
const _dirname = _path.default.resolve();
app.use('/api', _middleware.apiLimit, _routes.default);
app.use('/static', _express.default.static(_path.default.join(_dirname, 'public/uploads')));

//* create express server
app.listen(_config.default.port, () => {
  console.log(`Server started on port ${_config.default.port}`);
});