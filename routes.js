const fs = require("fs");
const eventlistner = (req, res) => {
  // console.log(req);
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>fist head</title></head>");
    res.write(
      '<body><form action="/message1" method="POST"><input type="text" name="message"><button type="submit" >Send the request</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message1" && method === "POST") {
    let body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });

    return req.on("end", () => {
      let parsedBody = Buffer.concat(body).toString();

      console.log(parsedBody);
      let mes = parsedBody.split("=")[1];
      fs.writeFile("message.txt", mes, (error) => {
        if (error) {
          console.log(error);
        } else {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>fist head</title></head>");
  res.write("<body><h1>this is the prectice server</h1></body>");
  res.write("</html>");
  res.end();
};
 


// module.exports = {
//   handler : eventlistner,
//   someMessage : "this is a routes"
// }


// module.exports.handler = eventlistner;
// module.exports.someMessage = "this is a routes"


 exports.handler = eventlistner;
 exports.someMessage = "this is export"