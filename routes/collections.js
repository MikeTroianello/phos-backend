const chalk = require("chalk");
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const getId = require("../middleware/getId");

const Collection = require("../models/Collection");
const User = require("../models/User");
const Card = require("../models/Card");

//CREATE COLLECTION
router.post("/create", auth, async (req, res) => {
  let { name, tags, private } = req.body;
  if (!private) private = false;
  tags = tags.split(" ");
  const newCollection = new Collection({
    name,
    tags,
    private,
    creatorId: req.user.id,
  });
  const savedCollection = await newCollection.save();
  let user = await User.findById(req.user.id);
  user.collections.push(newCollection._id);
  await user.save();
  res.json(savedCollection);
});

//SEE ALL COLLECTIONS
router.get("/all", getId, async (req, res) => {
  let collections = await Collection.find().populate("creatorId");
  let newCollections = collections.map((collection) => {
    console.log("WHAT IS HAPPENING", collection);
    let { name, cards, tags, likes, _id, creatorId } = collection;
    return {
      name,
      cards,
      tags,
      likes,
      _id,
      userCreated: creatorId._id == req.user.id,
      creatorUsername: creatorId.username,
    };
  });
  res.json(newCollections);
});

//VIEW COLLECTION
router.get("/:collectionId/view", async (req, res) => {
  console.log("SOMETHING SHOULD BE HAPPENEING HERE");
  let results = await Collection.findById(req.params.collectionId).populate(
    "cards"
  );
  console.log(results);
  res.json(results);
});

//ADD ARRAY TO COLLECTION
router.post("/add/:collectionId", auth, async (req, res) => {
  try {
    console.log("REQ DAT BODY", req.body);
    let theArrayToPush = await Card.insertMany(req.body);
    console.log(req.params);
    //MADE IT THIS FAR
    let collection = await Collection.findOne({ _id: req.params.collectionId });
    console.log("this is the collection", collection);
    // collection.cards.push(req.params.cardId);
    let idArr = [];
    for (let i = 0; i < theArrayToPush.length; i++) {
      idArr.push(theArrayToPush[i]._id);
    }
    console.log("ARRR MAYTEEE", idArr);
    collection.cards = [...collection.cards, ...idArr];
    console.log("THIS IS THE COLLECTION NOW", collection);
    await collection.save();
    console.log("ADDED NEW CARD", collection);
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.json({ msg: err });
  }
});

//ADD AN EXISTING CARD TO A COLLECTION. MAYBE USE THIS LATER
router.post("/add/:collectionId/:cardId", async (req, res) => {
  try {
    let collection = await Collection.findOne({ _id: req.params.collectionId });
    console.log("this is the collection", collection);
    collection.cards.push(req.params.cardId);
    console.log("THIS IS THE COLLECTION NOW", collection);
    await collection.save();
    console.log("ADDED NEW CARD", collection);
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.json({ msg: err });
  }
});

//GET ALL YOUR COLLECTIONS

//SEARCH FOR RELATED CONNECTIONS

// router.patch('/add/:collectionId/:cardId', (req, res) => {
//   Collection.findByIdAndUpdate(
//     req.params.collectionId,
//     {
//       $push: { cards: req.params.cardId },
//     },
//     (err, success) => {
//       if (err) {
//         console.log('failed', error);
//       }
//     }
//   ).then((expandedCollection) => {
//     console.log('ADDED NEW CARD', expandedCollection);
//     res.json(expandedCollection);
//   });
// });

// router.patch('/add/:collectionId/:cardId', (req, res) => {
//   Collection.findByIdAndUpdate(req.params.collectionId, {
//     $push: { cards: req.params.cardId },
//   }).then((a) => {
//     console.log('ADDED NEW CARD', a);
//     res.json(a);
//   });
// });

router.post("/add/:collectionId/:cardId", (req, res) => {
  Collection.findByIdAndUpdate(req.params.collectionId, {
    $push: { cards: req.params.cardId },
  }).then((a) => {
    console.log("ADDED NEW CARD", a);
    res.json(a);
  });
});

//REMOVE CARDS FROM ARRAY
router.patch("/remove/:collectionId/:cardId", async (req, res) => {
  Collection.findByIdAndUpdate(
    req.params.collectionId,
    {
      $pull: { cards: req.params.cardId },
    },
    (err, success) => {
      if (err) {
        console.log("failed", error);
      }
      // else {
      //   console.log('s', success);
      //   // res.json(success);
      // }
    }
  ).then((a) => {
    console.log(a);
    res.json(a);
  });
});

//EDIT COLLECTION

router.patch("/:collectionId", auth, async (req, res) => {
  let { name, tags, private } = req.body;
  console.log("ATTEMPTING TO CHANGE", req.body);
  try {
    await Collection.findByIdAndUpdate(req.params.collectionId, {
      $set: { name, tags, private },
    });
    res.json({ msg: "changed" });
  } catch (err) {
    res.json(err);
  }
});

//DELETE COLLECTION

router.delete("/:collectionId", (req, res) => {
  console.log(chalk.blueBright("IS THIS WORKING"));
  console.log(req.params.collectionId);
  Collection.findByIdAndDelete(req.params.collectionId).then(() => {
    res.json({ message: "deleted" });
  });
});

module.exports = router;
