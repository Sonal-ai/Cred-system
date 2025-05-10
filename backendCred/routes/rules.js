const express = require("express");

const {handleCreateRule, handleDeleteRules, handleEditRules, handleFetchAllRules} = require("../controllers/rules");

const router = express.Router();

router.get("/", handleFetchAllRules);
router.post("/", handleCreateRule);
router.delete("/:id", handleDeleteRules);
router.put("/:id", handleEditRules);

module.exports = router;
