const express = require("express");
const bodyParser = require("body-parser");
const Product = require("./models/product");
require("./mongodb");
//ROUTES
const store = require("./routes/store");

const app = express();
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(
    products.map((item) => {
      return {
        product: `${item.brand} ${item.name}`,
        price: item.price,
        inventory: item.inventory,
      };
    })
  );
});

app.use("/store", store);

const port = 3000;
app.listen(port, () => {
  console.log(`Started listening on ${port} port`);
});
