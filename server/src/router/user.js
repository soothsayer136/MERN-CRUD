const express = require("express");
const router = new express.Router();

const User = require("../model/user");
const authentication = require("../middleware/authenticaiton");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // res.cookie("jwt", token, {
    //   exipres: new Date(Date.now() + 25892000000),
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // });
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.post("/users/logout",);

router.get("/users/me", authentication, async (req, res) => {
  res.send(req.user);
});

router.post("/users/logout", authentication, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ message: "Successfully Logged out" });
  } catch (e) {
    res.status(500).send({ e });
  }
});

router.patch("/users/myprofile/update", authentication, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "firstname", "lastname", "address"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/changepassword", authentication, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/myprofile", authentication, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
