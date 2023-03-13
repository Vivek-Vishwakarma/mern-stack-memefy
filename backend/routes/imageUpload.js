const router = require("express").Router();
const auth = require("../middleware/config");
const Image = require("../models/ImageModel");

router.post("/upload", auth, async (req, res) => {
  const imgUrl = req.body.imageUrl;
  const tag = req.body.tags;
  const name = req.body.name;
  const tags = tag.split(",");
  try {
    const newImage = new Image({
      name,
      imgUrl,
      tags,
      userId: req.user,
    });
    const image = await newImage.save();
    res.send(image);
  } catch (error) {
    res.status(401).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const pageSize = 8; // Number of items to return per page
    const page = req.query.page || 1; // Current page number (default is 1)
    const skip = (page - 1) * pageSize;
    const images = await Image.find()
      .limit(pageSize)
      .skip(skip)
      .sort({ date: -1 })
      .populate("userId");
    const totalItems = await Image.countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);
    res.json({ images, totalPages });
  } catch (error) {
    res.send(error);
  }
});
router.get("/search", async (req, res) => {
  const pageSize = 4; // Number of items to return per page
  const page = req.query.page || 1; // Current page number (default is 1)
  const skip = (page - 1) * pageSize;
  const query = req.query.q;
  try {
    const image = await Image.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(pageSize)
      .skip(skip)
      .sort({ date: -1 })
      .populate("userId");
    const totalItems = await Image.countDocuments({
      name: { $regex: query, $options: "i" },
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    res.send({ image, totalPages });
  } catch (error) {
    res.send(error);
  }
});
router.get("/tag", async (req, res) => {
  const pageSize = 8; // Number of items to return per page
  const page = req.query.page || 1; // Current page number (default is 1)
  const skip = (page - 1) * pageSize;
  const query = req.query.tagname;
  const q = query.split(",");
  try {
    const image = await Image.find({
      tags: { $all: q.map((tag) => new RegExp(tag, "i")) },
    })
      .limit(pageSize)
      .skip(skip)
      .sort({ date: -1 })
      .populate("userId");
    // image.map((e) => {
    //   if (e.tags.includes(query)) {
    //     tagImg.push(e);
    //   }
    // });
    res.send(image);
  } catch (error) {
    res.send(error);
  }
});

router.get("/all", async (req, res) => {
  const { name, tags, page = 1, limit = 4 } = req.query;
  let query = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (tags) {
    const tagArray = tags.split(",").map((tag) => tag.trim());
    query.tags = { $all: tagArray.map((tag) => new RegExp(tag, "i")) };
  }
  try {
    const count = await Image.countDocuments(query);
    const results = await Image.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("userId");
    const totalPages = Math.ceil(count / limit);
    res.status(200).json({
      totalPages,
      totalResults: count,
      results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:userId", async (req, res) => {
  const pageSize = 8; // Number of items to return per page
  const page = req.query.page || 1; // Current page number (default is 1)
  const skip = (page - 1) * pageSize;
  const user = req.params.userId;
  try {
    const image = await Image.find({ userId: user })
      .limit(pageSize)
      .skip(skip)
      .sort({ date: -1 })
      .populate("userId");
    res.send(image);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
