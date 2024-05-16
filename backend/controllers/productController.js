const Product = require('../models/productModel')

const { getPostData } = require('../utils/utils')


// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(req, res){
    try{
        const products = await Product.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch(error){
        console.log(error)
    }
}


// @desc    Gets single Product
// @route   GET /api/products/:id
async function getProduct(req, res, id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else{
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
        
    } catch(error){
        console.log(error)
    }
}


// @desc    Create a Product
// @route   POST /api/products
async function createProduct(req, res){
    try{
        
        //get data from body
        const body = await getPostData(req)

        //trim data from body
        const { title, description, price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)
        res.writeHead(201, {'Content-Type': 'application/json'}) // 201 means something was created
        return res.end(JSON.stringify(newProduct))
        
    } catch(error){
        console.log(error)
    }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id){
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            //get data from body
            const body = await getPostData(req)

            //trim data from body
            const { title, description, price } = JSON.parse(body)

            const productData = {
                title : title || product.title, 
                description : description || product.description,
                price : price || product.price
            }

            const updatedProduct = await Product.update(id, productData)
            res.writeHead(200, {'Content-Type': 'application/json'}) // 201 means something was created
            return res.end(JSON.stringify(updateProduct))
        }
        
        
        
    } catch(error){
        console.log(error)
    }
}

// @desc    Delete a Product
// @route   Delete /api/products/:id
async function deleteProduct(req, res, id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else{
            await Product.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Product ${id} removed`}))
        }
        
    } catch(error){
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}