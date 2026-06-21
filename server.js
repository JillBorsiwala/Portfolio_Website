const path = require("path");
const express = require("express");
const ejs = require("ejs");

const certificatesRouter = require('./routes/certificates');

const app = express();
const port = Number(process.env.PORT) || 3002;

app.engine("js", ejs.renderFile);
app.set("view engine", "js");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// 3. Serve the CERTIS folder specifically so the PDFs can be fetched
app.use('/CERTIS', express.static(path.join(__dirname, 'CERTIS')));

app.get("/", (req, res) => {
  res.render("index");
});

app.use('/certificates', certificatesRouter);

app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});