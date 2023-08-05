import express from "express";
const router = express.Router();

router.use("", require("./routes/auth"));

module.exports = router;