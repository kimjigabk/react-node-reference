const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: "you must log in" });
    }
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id, // obtained with Stripe.js
      description: "5$fff"
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
