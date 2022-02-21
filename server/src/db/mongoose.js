const mongoose = require("mongoose");
const db =
  "mongodb+srv://trainee:Trainee@trainingpractice.pygzl.mongodb.net/bikram-db?retryWrites=true&w=majority";
mongoose.connect(db, {
  useNewUrlParser: true,
});
