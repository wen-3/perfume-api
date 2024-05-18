const dotenv = require("dotenv")
const mongoose = require('mongoose');
const Product = require("./models/product");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  dotenv.config({path: "./config.env"});
  
  const DB = process.env.DATABASE.replace(
      '<password>',
      process.env.DATABASE_PASSWORD
  )

  // 連接資料庫
  mongoose.connect(DB)
    .then(()=>{
        console.log('資料庫連線成功')
    })
    .catch((error)=>{
        console.log(error);
    });

// 取得商品列表(全部)
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.json(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 新增商品
app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        const newProduct = await product.save();
        res.json(newProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 修改商品
app.put('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProduct = req.body;
        await Product.findByIdAndUpdate(id, updatedProduct);
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// 刪除商品
app.delete('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.status(200).send('成功刪除');
    } catch (err) {
        res.status(500).send(err);
    }
});  

// 監聽 port
app.listen(process.env.PORT);
// app.listen(3000);