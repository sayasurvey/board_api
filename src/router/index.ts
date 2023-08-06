import express from "express";
const router = express.Router();

router.use("", require("./routes/auth"));
router.use("", require("./routes/board")); //追記

module.exports = router;