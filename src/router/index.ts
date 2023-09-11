import express from "express";
const router = express.Router();

router.use("", require("./routes/auth"));
router.use("", require("./routes/board"));
router.use("", require("./routes/comment"));

module.exports = router;