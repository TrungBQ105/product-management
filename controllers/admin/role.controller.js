const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Role.find(find);

  res.render("admin/pages/roles/index", {
    pageTitle: "Nhom quyen",
    records: records,
  });
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tao nhom quyen",
  });
};

module.exports.createPost = async (req, res) => {
  const records = new Role(req.body);
  await records.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Role.findOne({
      _id: id,
      deleted: false,
    });

    res.render("admin/pages/roles/edit", {
      pageTitle: "Chinh sua nhom quyen",
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  try {
    await Role.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật nhóm quyền thành công");
  } catch (error) {
    req.flash("error", "Cập nhật nhóm quyền thất bại: ");
  }
  res.redirect("back");
};

module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Phan quyen",
    records: records,
  });
};

module.exports.permissionsPatch = async (req, res) => {

  const permissions = JSON.parse(req.body.permissions);
  for (const item of permissions) {
    await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
  }
  req.flash("success", "Cap nhat phan quyen thanh cong!");

  res.redirect("back");
};


