const errorHandler = require("express-async-handler");
const Contact = require("../Model/contactModel");
const getallcontact = errorHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  if (!contact) {
    res.status(404);
    throw new Error("No contact foundin database");
  }
  res.status(200).json({ message: "Get All Contact", contact });
});

const createcontact = errorHandler(async (req, res) => {
  console.log("this is the user info", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("All field are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json({
    id: contact._id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    message: "Contact Creation Done",
    success: true,
  });
});

const getsinglecontact = errorHandler(async (req, res) => {
  const contactid = req.params.id;
  const contact = await Contact.findById(contactid);
  if (!contact) {
    res.status(404);
    throw new Error("contact not find");
  }
  res.status(200).json({
    message: `Get Single Contact ${req.params.id}`,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    success: true,
  });
});

const updatecontact = errorHandler(async (req, res) => {
  const updatecontactid = req.params.id;
  const { new_name, new_email, new_phone } = req.body;
  if (!new_name || !new_email || !new_phone) {
    res.status(404);
    throw new Error("All field are required");
  }
  const updatecontact = await Contact.findByIdAndUpdate(
    updatecontactid,
    {
      name: new_name,
      email: new_email,
      phone: new_phone,
    },
    { new: true }
  );

  res.status(200).json({
    message: `Update Contact ${req.params.id}`,
    name: updatecontact.name,
    email: updatecontact.email,
    phone: updatecontact.phone,
  });
});

const deletecontact = errorHandler(async (req, res) => {
  const updatecontactid = req.params.id;
  const deletecontact = await Contact.findByIdAndDelete(updatecontactid);

  res.status(200).json({
    message: `Delete Contact ${req.params.id}`,
  });
});

module.exports = {
  getallcontact,
  createcontact,
  getsinglecontact,
  updatecontact,
  deletecontact,
};
