const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

//const expressHbs = require('express-handlebars'); CUANDO QUIERAR HANDLEBARS COMO TEMPLATE

const errorController = require('./controllers/error')

//exportando la base de datos
const sequelize = require('./util/database');

//Creando usuario en la base de datos 
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

//installing express pug dinamic template
//app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout:'main-layout', extname:'hbs' }));
app.set('view engine' , 'ejs');
app.set('views', 'views');

//Routes Link
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({extended: true}));

//Acces to css forms
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));

});

//Acces to admin Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//Acess response to 404 ejs
app.use(errorController.get404);

Product.belongsTo(User, {constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    //.sync({force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
    //console.log(result);
    //app.listen(3000);
})
.then(user => {
    if (!user) {
        return User.create({name: 'Bismark', email: 'test@tes.com'});
    }
    return user;
})
.then(user => {
    //console.log(user);
    app.listen(3000);
})
.catch(err => {
    console.log(err);

});

  