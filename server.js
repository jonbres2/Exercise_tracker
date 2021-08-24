const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');

const app = express();

app.use(cookies());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/config/mongoose.config')
require('./server/routes/user.routes')(app);
require('./server/routes/workout.routes')(app);

app.listen(8000, () => {
    console.log("Listening at port 8000")
});
