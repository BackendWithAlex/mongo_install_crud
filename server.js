const mongoose = require("mongoose");
const express = require('express');
const app = express();

app.use(express.json());

cars = [
  {
    id: 1,
    name: "Toyota Corolla",
    price: "$ 20000",
    available_quantity: 5
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    price: "$ 30000",
    available_quantity: 3
  }
];

// Connect to Mongo DB
mongoose.connect(
  "mongodb://localhost:27017"
  )       
.then(() => {
console.log("Connected to Database");
})
.catch((error) => {
console.log("Connection failed!");
});

app.get('/' , (req, res) => {
 res.send('Car Showroom Project!');
});

// GET cars
app.get('/cars' , (req, res) => {
 res.send(cars);
});

// POST cars
app.post('/cars' , (req, res) => {
  const car = {
    id: cars.length + 1,
    name: req.body.name,
    price: req.body.price,
    available_quantity: req.body.available_quantity,
  };

  cars.push(car);
  res.send(car);
});

// PUT cars
app.put('/cars' , (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.body.id));

  if(!car) return res.status(404).send('car not found!');

  car.name = req.body.name;
  car.price = req.body.price;
  car.available_quantity = req.body.available_quantity;
  res.send(car);
});

// DELETE cars
app.delete('/cars' , (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.body.id));

  if(!car) return  res.status(404).send('car not found!');

  const index = cars.indexOf(car);
  cars.splice(index, 1);

  res.send(car);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
 console.log(`Express app Listening on Port ${port}`);
});