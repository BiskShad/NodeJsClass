const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
     Product.fetchAll(products => {
          res.render('shop/product-list', {prods: products, 
               pageTitle: 'Shop', 
               path:'/products', 
          });

     }); 

};

//visualizacion del producto en el boton detail
exports.getProduct = (req, res, next) => {
     const prodId = req.params.productId;
     Product.findById(prodId, product => {
       res.render('shop/product-detail', {product: product, 
          pageTitle: product.title,
     path: '/products'});
     });
     
   };


exports.getIndex = (req, res, next) => {
     Product.fetchAll((products) => {
          res.render('shop/index', {
               prods: products, 
               pageTitle: 'All Product', 
               path:'/', 
                });
           }); 

};

exports.getCart = (req, res, next) => {
     res.render('shop/cart' , {
          path: '/cart',
          pageTitle: 'Your Cart'

     });
};

//backen para agregar el producto al cart

exports.postCart = (req, res, next) => {
     const prodId= req.body.productId;
     console.log(prodId);
     res.redirect('/cart');

};

exports.getOrders = (req, res, next) => {
     res.render('shop/orders' , {
          path: '/orders',
          pageTitle: 'Your Orders'

     });
};

exports.getCheckout = (req, res, next) => {
res.render('shop/checkout', {
     path: '/checkout' , 
     pageTitle: 'Checkout'

});
};