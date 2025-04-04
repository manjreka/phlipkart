const { app } = require("./app");

const port = process.env.PORT || 1514;

app.listen(port, () => {
  console.log("Server connected Successfully to port", port);
});
