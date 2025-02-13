const Product = require('../models/product');



exports.getProducts = (req, res, next) => {
     Product.findAll()
     .then(products => {
          res.render('shop/product-list', {
               prods: products, 
               pageTitle: 'All Products', 
               path:'/products', 
               
          });

     })
     .catch(err => {
          console.log(err);
     });
}; 



//visualizacion del producto en el boton detail
exports.getProduct = (req, res, next) => {
     const prodId = req.params.productId;
      Product.findByPk(prodId)
     .then(product => {
          res.render('shop/product-detail', {
               product: product,
               pageTitle: product.title,
               path: '/products'
         });
        })
       .catch(err => console.log(err));
};


// exportando la base de datos, recibiendo data de ka base

exports.getIndex = (req, res, next) => {
     Product.findAll()
     .then(products => {
          res.render('shop/index', {
               prods: products, 
               pageTitle: 'Shop', 
               path:'/', 
               
          });

     })
     .catch(err => {
          console.log(err);
     });
};


//agregando products al carro
exports.getCart = (req, res, next) => {
     req.user
          .getCart()
          .then(cart => {
               return cart
                    .getProducts()
                    .then(products => {
                         res.render('shop/cart', {
                         path: '/cart',
                         pageTitle: 'Your Cart',
                         products: products
                         });
                    })
                    .catch(console.log(cart));
          })
     .catch(err => console.log(err));
};
     


//backen para agregar el producto al cart para que lleve agregando la cantidad de producto
//al carro

exports.postCart = (req, res, next) => {
     const prodId= req.body.productId;
     let fetchedCart;
     let newQuantity = 1;
     req.user
          .getCart()
          .then(cart => {
               fetchedCart = cart;
               return cart.getProducts({where: { id: prodId }});
          })
          .then(products => {
               let product;
               if(products.length > 0) {
                    product = products[0];
               }
               if(product) {
                    const oldQuantity = product.cartItem.quantity;
                    newQuantity = oldQuantity + 1;
                    return product;
                    
               }

               return Product.findByPk(prodId);
          })   
               .then(product => {
                    return fetchedCart.addProduct(product, { 
                         through: {quantity: newQuantity}
                });
               })
               .then(() => {
                    res.redirect('cart');
               })
               .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
     const prodId = req.body.productId;
     req.user
     .getCart()
     .then(cart => {
          return cart.getProducts({ where: { id: prodId }});
     })
     .then(products => {
          const product = products[0];
          return product.cartItem.destroy();
     })
     .then(result => {
          res.redirect('/cart');
     })
     .catch(err => console.log(err));
};

exports.postOrder = (res, req, next) => {
     let fetchedCart;
     req.user
     .getCart()
     .then(cart => {
          fetchedCart = cart;
          return cart.getProducts();
     })
     .then(products => {
          return req.user
          .createOrder()
          .then(order => {
               return order.addProducts(
                    products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity};
                    return product;
               })
               );
          })
          .catch(err => console.log(err));

     })
     .then(result => {
         return fetchedCart.setProducts(null);

     })
     .then(result => {
          res.redirect('/orders');
     })
     .catch(err => console.log(err));
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