const http = require("http");

const todos = [
  { id: 1, text: "Todo One" },
  { id: 2, text: "Todo Two" },
  { id: 3, text: "Todo Three" },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      let status = 404;

      const response = {
        success: false,
        data: null,
        error: null,
      };

      if (method == "GET" && url == "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method == "POST" && url == "/todos") {
        const { id, text } = JSON.parse(body);

        // if id or text is missing in the received todo..
        // then send 400 response
        if (!id || !text) {
          status = 400;
          response.error = "please add id and text";
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });

      res.end(JSON.stringify(response));
    });

  // Below is shortcut way to write status code and headers

  // If you have only one thing to send as response... you can mention that directly inside res.end()
  // that will be sent as response and res.end() will end the response.

  // In below, I am sending JSON.
  // I took a plain object... converted it to JSON using JSON.stringify and sent that JSON as response.
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on Port Number: ${PORT}`);
});
