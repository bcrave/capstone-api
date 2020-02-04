const express = require("express");
const photoRouter = express.Router();

// Import the model
const Photo = require("../models/photo-model");

// GET
photoRouter.route("/photos").get((req, res) => {
  Photo.find((err, photos) => {
    if (err) {
      console.log(`get photo error: ${err}`);
      res.status(500).send(`Get podo error: ${err}`);
    } else {
      res.status(200).json(photos);
    }
  });
});

// POST
photoRouter.route("/photo").post((req, res) => {
  const photo = new Photo(req.body);

  photo
    .save()
    .then((photo) => {
      res.status(200).json(photo);
    })
    .catch((err) => {
      res.status(400).send(`unable to add photo: ${err}`);
    });
});

// PATCH
photoRouter.route("/photo/:id").patch((req, res) => {
  const id = req.params.id;

  Photo.findById(id, (err, photo) => {
    if (err) {
      res.status(404).send(`Item not found: ${err}`);
    } else {
      photo.done = req.body.done;

      photo
        .save()
        .then((photo) => {
          res.json(`Photo: "${photo.title}" updated!`);
        })
        .catch((err) => {
          res.status(400).send(`Unable to update item: ${err}`);
        });
    }
  });
});

// DELETE
photoRouter.route("/photo/:id").delete((req, res) => {
  Todo.findByIdAndRemove({ _id: req.params.id }, (err, todo) => {
    if (err) {
      res.status(404).json(`Could not delete: ${err}`);
    } else {
      res.json("Got rid of that ish yo");
    }
  });
});

module.exports = photoRouter;
