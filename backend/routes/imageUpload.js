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
    const images = await Image.find({}).populate("userId");
    res.send(images);
  } catch (error) {
    res.send(error);
  }
});
router.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const image = await Image.find({
      name: { $regex: query, $options: "i" },
    }).populate("userId");
    res.send(image);
  } catch (error) {
    res.send(error);
  }
});
router.get("/tag", async (req, res) => {
  const query = req.query.tagname;
  const q = query.split(" ");
  try {
    const image = await Image.find({ tags: { $all: q } }).populate("userId");
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

router.get("/:userId", async (req, res) => {
  const user = req.params.userId;
  try {
    const image = await Image.find({ userId: user }).populate("userId");
    res.send(image);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
