const fs = require("fs");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Node.js</title></head>");
    res.write("<body><h1>Welcome to the web</h1>");
    res.write('<form action="/submit-details" method="POST">'); // Corrected the form action URL

    res.write(
      '<input type="text" name="username" placeholder="Enter Your Name"></br>'
    );
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" name="gender" id="male" value="male"/>');
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" name="gender" id="female" value="female"/>');
    res.write('<br><input type="submit" value="Submit">');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method === "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      const bodyObject = Object.fromEntries(params.entries());
      console.log(bodyObject);
      fs.writeFileSync("user.txt", JSON.stringify(bodyObject));
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Node.js</title></head>");
    res.write("<body><h1>Page Not Found</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
};
module.exports = requestHandler;
