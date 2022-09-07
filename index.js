const  express = require ('express');
const  routerApi = require ('./routes');
const passport = require('passport')
const { logErros, errorHandler, boomError } = require('./middleware/error.Handlers');
const cors = require('cors');
require("./db/sequelize.db");
require("./db/usuario.model");
require("./db/roles.model");
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize({ session: false }));
app.use(cors());
const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
    res.send("Working");
});

routerApi(app);

require('./util');
app.use(logErros);
app.use(boomError);
app.use(errorHandler);


app.listen(port, ()=>{
    console.log("Working: " + port);
});

