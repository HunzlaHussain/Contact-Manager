const express = require("express");
const router = express.Router();
const {
  getallcontact,
  createcontact,
  getsinglecontact,
  updatecontact,
  deletecontact,
} = require("../Controller/ContactController");
const validationUser = require("../Middleware/validationUser");
router.use(validationUser);
router.route("/contacts").get(getallcontact).post(createcontact);

router
  .route("/contacts/:id")
  .get(getsinglecontact)
  .put(updatecontact)
  .delete(deletecontact);

module.exports = router;
