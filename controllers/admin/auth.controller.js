const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");

module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: " Dang nhap",
  });
};

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email khong ton tai");
    res.redirect("back");
    return;
  }

  if (md5(password) != user.password) {
    req.flash("error", "Sai mat khau");
    res.redirect("back");
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", "Tai khoan da bi khoa");
    res.redirect("back");
    return;
  }
  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

module.exports.logout = (req, res) => {
  res.clearCookie("token")
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};