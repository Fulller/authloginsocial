import express from "express";
import passport from "passport";

const route = express.Router();
route.get("/login/failed", (req, res) => {
  return res.status(401).json({
    success: false,
    message: "failure login",
  });
});
route.get("/login/success", (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: "successfull login",
      user: req.user,
    });
  }
});
route.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL + "/login");
});
route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: process.env.FRONTEND_URL + "/login/failed",
  })
);
route.get("/github", passport.authenticate("github", { scope: ["profile"] }));
route.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: process.env.FRONTEND_URL + "/login/failed",
  })
);
export default route;
