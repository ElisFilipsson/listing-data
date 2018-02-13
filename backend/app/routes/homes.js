import express from "express";
import * as homes from "../controllers/homes";

const router = express.Router();
router.post("/:name/data", homes.getAHome);
router.get("/all/data", homes.getSomeHomes);
module.exports = router;