var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var flash = require('connect-flash');
var session = require('express-session');
var fs = require("fs");
var multer = require('multer')
const path = require('path');

const Category = require('../models/category')
const SubCategory = require('../models/subcategory')
const Product = require('../models/product')
const Order = require('../models/order')

router.get('/', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        res.render('admin/dashbord/index', { layout: 'admin' });
    }
})

router.get('/category', function (req, res) {

    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        var category = Category.find(function (err, docs) {
            var conversionChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < docs.length; i += chunkSize) {
                conversionChunks.push(docs.slice(i, i + chunkSize));
            }
            res.render('admin/dashbord/category/index', { layout: 'admin', category: conversionChunks });
        });
    }

});

router.get('/category/create', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        res.render('admin/dashbord/category/form', { layout: 'admin' })
    }

})

router.post('/category', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        const category = new Category({
            title: req.body.title,
            titleen: req.body.titleen,
            description: req.body.desc,
        });


        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('desc', 'Description is required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {
            console.log('error');
            res.redirect('error');
        } else {
            console.log('success');
            category.save();
            res.redirect('/admin/dashbord/category');
        }
    }
});

router.get('/category/:id/edit', function (req, res) {
	console.log('yess')
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    } else {
        var category = Category.findById(req.params.id).then(category => {
            res.render('admin/dashbord/category/form', { layout: 'admin', category: category });
        });;
    }
});

router.post('/category/:id', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        const category = {
            title: req.body.title,
            titleen: req.body.titleen,
            description: req.body.desc,
        };

        Category.findByIdAndUpdate(req.params.id, category, { new: true }, function (err, model) {
            if (err) {
                console.log('error');
            } else {
                console.log('success');
                res.redirect('/admin/dashbord/category');
            }
        })
    }
});

router.get('/category/:id/delete', function (req, res) {
	console.log('yes comming', req.params)
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        Category.findByIdAndRemove(req.params.id, function (err, model) {
            if (err) {
                console.log('error');
            } else {
                console.log('success');
                res.redirect('/admin/dashbord/category');
            }

        })
    }
});

//sub category start

router.get('/subcategory', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        var subcategory = SubCategory.find(function (err, docs) {
            var conversionChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < docs.length; i += chunkSize) {
                conversionChunks.push(docs.slice(i, i + chunkSize));
            }
            res.render('admin/dashbord/subcat/index', { layout: 'admin', subcategory: conversionChunks });
        });
    }
});

router.get('/subcategory/create', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        var category = Category.find(function (err, docs) {
            var conversionChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < docs.length; i += chunkSize) {
                conversionChunks.push(docs.slice(i, i + chunkSize));
            }
            res.render('admin/dashbord/subcat/form', { layout: 'admin', category: conversionChunks });
        });
    }
})

router.post('/subcategory', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        const subcategory = new SubCategory({
            title: req.body.title,
            titleen: req.body.titleen,
            description: req.body.desc,
            category: req.body.category,
        });


        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('desc', 'Description is required').notEmpty();
        req.checkBody('category', 'Description is required').notEmpty();


        var errors = req.validationErrors();

        if (errors) {
            console.log('error');
            res.redirect('error');
        } else {
            console.log('success');
            subcategory.save();
            res.redirect('/admin/dashbord/subcategory');
        }
    }
});

router.get('/subcategory/:id/edit', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        var subcategory = SubCategory.findById(req.params.id).then(subcategory => {
            ssubcategory = subcategory;
            var category = Category.find(function (err, docs) {
                var conversionChunks = [];
                var chunkSize = 3;
                for (var i = 0; i < docs.length; i += chunkSize) {
                    conversionChunks.push(docs.slice(i, i + chunkSize));
                }
                res.render('admin/dashbord/subcat/form', { layout: 'admin', subcategory: subcategory, category: conversionChunks });
            });
            //        
        });
    }
});

router.post('/subcategory/:id', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        const subcategory = {
            title: req.body.title,
            titleen: req.body.titleen,
            category:req.body.category,
            description: req.body.desc,
        };

        SubCategory.findByIdAndUpdate(req.params.id, subcategory, { new: true }, function (err, model) {
            if (err) {
                console.log('error');
            } else {
                console.log('success');
                res.redirect('/admin/dashbord/subcategory');
            }
        })
    }
});

router.get('/subcategory/:id/delete', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        SubCategory.findByIdAndRemove(req.params.id, function (err, model) {
            if (err) {
                console.log('error');
            } else {
                console.log('success');
                res.redirect('/admin/dashbord/subcategory');
            }

        })
    }
});

//sub category end


//start of product

router.get('/products', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        var products = Product.find(function (err, docs) {
            var conversionChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < docs.length; i += chunkSize) {
                conversionChunks.push(docs.slice(i, i + chunkSize));
            }
            res.render('admin/dashbord/product/index', { layout: 'admin', products: conversionChunks });
        });
    }
});

router.get('/product/create', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        var conversionChunks = [];
        var conversionChunks1 = [];
        var category = Category.find(function (err, docs) {
            var chunkSize = 3;
            for (var i = 0; i < docs.length; i += chunkSize) {
                conversionChunks.push(docs.slice(i, i + chunkSize));
            }
        });

        var subcategory = SubCategory.find(function (err, docs1) {
            var chunkSize1 = 3;
            for (var i = 0; i < docs1.length; i += chunkSize1) {
                conversionChunks1.push(docs1.slice(i, i + chunkSize1));
            }
            res.render('admin/dashbord/product/form', { layout: 'admin', category: conversionChunks, subcategory: conversionChunks1 });
        });
    }

})

//file uploading functions
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

//end file uploading functions

router.post('/product', function (req, res) {
	console.log('yyyes')
    upload(req, res, (err) => {
        console.log(req.file)
        if (err) {
            res.redirect('/admin/dashbord/product/create', {
                msg: err
            });
        } else {
            if (!req.file) {
                res.redirect(404, '/admin/dashbord/product/create', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                filename = req.file.filename
                console.log(filename, req.body.title);
                const product = new Product({
                    title: req.body.title,
                    titleen: req.body.titleen,
                    description: req.body.description,
                    category: req.body.category,
                    subcategory: req.body.subcategory,
                    image: filename,
                    price: req.body.price,
                    discount: req.body.discount,
                    discountprice: (1-(req.body.discount/100))*req.body.price,
                    createdat: Date.now
                })

                req.checkBody('title', 'Title is required').notEmpty();
                req.checkBody('description', 'Title is required').notEmpty();
                req.checkBody('category', 'Price is required').notEmpty();
                // req.checkBody('discount', 'discount is required').notEmpty();
                req.checkBody('subcategory', 'Title is required').notEmpty();
                req.checkBody('price', 'Description is required').notEmpty();

                var errors = req.validationErrors();

                if (errors) {
                    console.log('error');
                    res.redirect('error');
                } else {
                    console.log('success');
                    product.save();
                    res.redirect('/admin/dashbord/products');
                }
            }
        }
    });
});

router.get('/product/:id/edit', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        var subcategory = Product.findById(req.params.id).then(subcategory => {
            ssubcategory = subcategory;
            var category = Category.find(function (err, docs) {
                var conversionChunks = [];
                var chunkSize = 3;
                for (var i = 0; i < docs.length; i += chunkSize) {
                    conversionChunks.push(docs.slice(i, i + chunkSize));
				}
                res.render('admin/dashbord/product/form', { layout: 'admin', subcategory: subcategory});
            });
            //        
        });
    }
});

router.post('/product/:id', function (req, res) {
    console.log('hello from product')
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        const product = {
            title: req.body.title,
            titleen: req.body.titleen,
            description: req.body.description,
            category: req.body.category,
            image: filename,
            price: req.body.price,
            discount: req.body.discount,
            discountprice: (1-(req.body.discount/100))*req.body.price,
        };

        Product.findByIdAndUpdate(req.params.id, product, { new: true }, function (err, model) {
            if (err) {
                console.log('error');
            } else {
                console.log('success');
                res.redirect('/admin/dashbord/product');
            }
        })
         console.log('productbsdhf')
    }
});

router.get('/product/:id/delete', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        Product.findByIdAndRemove(req.params.id, function (err, model) {
            if (err) {
                console.log('error');
            } else {
                console.log('success');
                res.redirect('/admin/dashbord/products');
            }

        })
    }
});
//end of product

//order

router.get('/orders', function(req, res) {
	Order.find((err, value)=>{
	  if (err){
		console.log(err)
	  }
	  let x = [];
      value.map(v=>{
          x.push(v)
      })
      x.reverse()
	  res.render('admin/dashbord/order/index', {layout: 'admin',products: {x}});
	})
  });


router.get('/ordersss', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        var subcategory = Order.find(function (docs, err) {
			// console.log( JSON.stringify(err), 'docs')
			let strinfyRes =  JSON.stringify(err);
			console.log(strinfyRes, 'stringfy res')
			var ress = JSON.parse(strinfyRes);
			console.log(res, 'result is showing')

            // var conversionChunks = [];
            // var chunkSize = 3;
            // for (var i = 0; i < ress.length; i += chunkSize) {
            //     conversionChunks.push(ress.slice(i, i + chunkSize));
			// }
            // res.render('admin/dashbord/order/index', { layout: 'admin', subcategory: conversionChunks });
        });
    }
});

router.get('/order/:id/edit', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        const order = {
           accpeted: true,
        };

        Order.findByIdAndUpdate(req.params.id, order, { new: true }, function (err, model) {
            if (err) {
                console.log('error');
            } else {
                console.log('success');
                res.redirect('/admin/dashbord/orders');
            }
        })
         console.log('productbsdhf')
    }
});

router.get('/order/:id/delete', function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/admin/auth/login');
    }
    else {
        Order.findByIdAndRemove(req.params.id, function (err, model) {
            if (err) {
                console.log('error');
            } else {
                console.log('success');
                res.redirect('/admin/dashbord/orders');
            }

        })
    }
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        console.log(err);
    });
    res.clearCookie('user_sid');
    res.redirect('/admin/auth/login');
});

module.exports = router;