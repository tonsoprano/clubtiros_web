const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 8001;

app.disable('x-powered-by');
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 5000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/src/public')));
app.set('views', path.join(__dirname + '/src/app/views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(session({
    secret: 'sc-cdtjw',
    resave: true,
    saveUninitialized: true,
}));

// Importación de rutas
require('./src/routes/urls')(app);

app.listen(PORT, () => {
    console.log(`Starting development server on http://localhost:${PORT}`);
});