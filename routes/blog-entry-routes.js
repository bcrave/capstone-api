const express = require("express");
const blogEntryRouter = express.Router();

// Import the model
const BlogEntry = require("../models/blog-entry-model");

// GET
blogEntryRouter.route("/blog-entries").get((req, res) => {
  BlogEntry.find((err, blogEntries) => {
    if (err) {
      console.log(`get blog entry error: ${err}`);
      res.status(500).send(`Get blog entry error: ${err}`);
    } else {
      res.status(200).json(blogEntries);
    }
  });
});

// POST
blogEntryRouter.route("/blog-entry").post((req, res) => {
  const blogEntry = new BlogEntry(req.body);

  blogEntry
    .save()
    .then((blogEntry) => {
      res.status(200).json(blogEntry);
    })
    .catch((err) => {
      res.status(400).send(`unable to add blog entry: ${err}`);
    });
});

// PATCH
blogEntryRouter.route("/blog-entry/:id").patch((req, res) => {
  const id = req.params.id;

  BlogEntry.findById(id, (err, blogEntry) => {
    if (err) {
      res.status(404).send(`Item not found: ${err}`);
    } else {
      blogEntry.done = req.body.done;

      blogEntry
        .save()
        .then((blogEntry) => {
          res.json(`Blog Entry: "${blogEntry.title}" updated!`);
        })
        .catch((err) => {
          res.status(400).send(`Unable to update item: ${err}`);
        });
    }
  });
});

// DELETE
blogEntryRouter.route("/blog-entry/:id").delete((req, res) => {
  Todo.findByIdAndRemove({ _id: req.params.id }, (err, todo) => {
    if (err) {
      res.status(404).json(`Could not delete: ${err}`);
    } else {
      res.json("Got rid of that ish yo");
    }
  });
});

module.exports = blogEntryRouter;
