const { app } = require("./app");

const port = process.env.PORT || 1414;

app.listen(port, () => {
  console.log("Server connected Successfully to port", port);
});
