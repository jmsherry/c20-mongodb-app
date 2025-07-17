import "dotenv/config";
import express from "express";
import mongoose, { Schema } from "mongoose";

const { PORT = 3333, MONGODB_URI = "mongodb://127.0.0.1/cars" } = process.env;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

try {
  const conn = await mongoose.connect(MONGODB_URI);
  console.log("connected", conn);

  // this is for errors after a connection has been established
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
} catch (error) {
  // this is for connection error
  console.log(error);
}

const carSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bhp: {
    type: Number,
    required: true,
    max: 10000,
  },
  avatar_url: {
    type: String,
    default: "https://static.thenounproject.com/png/449586-200.png",
  },
});

const Car = mongoose.model("Car", carSchema);

// const cars = [{ name: "ferarri" }, { name: "lamborghini" }];

app.get("/api/v1/cars{/:id}", async (req, res) => {
  const query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }

  try {
    const cars = await Car.find(query);
    // if(!cars.length) return res.sendStatus(404);
    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/api/v1/cars", async (req, res) => {
  const carData = req.body;
  console.log(carData);
  if (carData.avatar_url === "") {
    delete carData.avatar_url;
  }
  console.log(carData);
  try {
    const newCar = new Car(carData);
    const result = await newCar.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.put("/api/v1/cars/:id", async (req, res) => {
  console.log("id", req.params);
  console.log("data", req.body);

  try {
    const result = await Car.updateOne({ _id: req.params.id }, req.body);
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.delete("/api/v1/cars/:id", async (req, res) => {
  try {
    const result = await Car.deleteOne({ _id: req.params.id });
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

app.all("/*splat", async (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
