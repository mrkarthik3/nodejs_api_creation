const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log(req);
  //   console.log(req.method); // prints method (GET/POST...) of incoming request
  const { headers, url, method } = req; // getting these three properties via object destructuring
  console.log(headers);
  console.log(url);
  console.log(method);
  res.end();
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on Port Number: ${PORT}`);
});
