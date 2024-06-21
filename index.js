const express = require("express");
const model = require("./model");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/ds3boss", async (request, response) => {
  try {
    console.log("GET check");
    let bosses = await model.Boss.find();
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.json(bosses);
  } catch (error) {
    response.status(400).send("Could not GET");
  }
});

app.post("/ds3boss", async (request, response) => {
  const data = request.body;
  try {
    let new_boss = new model.Boss({
      name: data.name,
      attempts: data.attempts,
    });

    let error = new_boss.validateSync();
    if (error) {
      response.status(400).json(error);
      return;
    }
    await new_boss.save();
    response.setHeader("Access-Controll-Allow-Origin", "*");
    response.status(201).json(new_boss);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
});

app.delete("/ds3boss/:id", async (request, response) => {
  try {
    let is_deleted = await model.Boss.findOneAndDelete({
      _id: request.params.id,
    });
    if (!is_deleted) {
      response.status(404).send("Could not find boss");
      return;
    }
    response.status(204).send("Boss deleted");
  } catch (error) {
    console.log(error);
    response.status(400).send("Welp something went wrong");
  }
});

app.get("/ds3boss/:id", async (request, response) => {
  try {
    let single_get = await model.Boss.findOne({ _id: request.params.id });
    if (!single_get) {
      response.status(404).send("Boss has not been found");
      return;
    }
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.json(single_get);
  } catch (error) {
    response.status(400).send("Just aint workin");
  }
});

app.put("/ds3boss/:id", async (request, response) => {
  try {
    const updatedBoss = {
      name: request.body.name,
      attempts: request.body.attempts,
    };
    let put_boss = await model.Boss.findByIdAndUpdate(
      { _id: request.params.id },
      updatedBoss,
      {
        new: true,
      }
    );
    if (!put_boss) {
      response.status(404).send("Could not find boss");
      return;
    }
    response.status(204).send("Boss updated");
  } catch (error) {
    console.log(error);
    response.status(400).send("Something went wrong");
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost/8080");
});
