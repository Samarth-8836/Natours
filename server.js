const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});