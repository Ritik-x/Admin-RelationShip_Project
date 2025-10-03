import multer from "multer";
import fs from "fs";
import path from "path";

// ensure tmp folder exists
const tmpDir = path.join(__dirname, "..", "tmp");
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// Accept csv, xls, xlsx, axls
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = [".csv", ".xls", ".xlsx", ".axls"];
  if (allowedExt.includes(ext)) cb(null, true);
  else cb(new Error("Only csv, xls, xlsx, axls files are allowed"));
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter,
});

module.exports = upload;
