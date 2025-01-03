const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars'); CUANDO QUIERAR HANDLEBARS COMO TEMPLATE

const app = express();

//installing express pug dinamic template
//app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout:'main-layout', extname:'hbs' }));
app.set('view engine' , 'ejs');
app.set('views', 'views');

//Routes Link
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true}));

//Acces to css forms
app.use(express.static(path.join(__dirname, 'public')));

//Acces to admin Routes
app.use('/admin',adminData.routes);
app.use(shopRoutes);

//Acess response to 404.html
app.use((req, res, next) => {
   res.status(404).render('404', {pageTitle: 'Page Not Found'});
});


app.listen(3000);  