const mongoose = require("mongoose");

mongoose.connect(process.env.DBPASSWORD);

const BossSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Boss needs to have a name"],
    },
    attempts: {
      type: Number,
      required: [true, "Boss needs the number of attemps"],
    },
  },
  { timestamps: true }
);

const Boss = mongoose.model("BossEntry", BossSchema);

module.exports = {
  Boss: Boss,
};
