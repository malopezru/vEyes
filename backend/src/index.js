const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({
    origin: '*'
}));

// routes
app.use('/api/users',require('./routes/users.js'));
app.use(require('./routes/index.js'));

// starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})