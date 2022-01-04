import * as express from "express";
const app = express();

app.get("/auth/discord", (req, res) => {
    res.json(req.query);
});

app.listen(4000, () => console.log("Backend launched"));
