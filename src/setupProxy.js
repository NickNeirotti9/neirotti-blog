/*
 * Development-server only. Create React App loads this file automatically when
 * `npm start` runs; it never ships with the site.
 *
 * It powers the /editor page:
 *   GET  /__editor/api/content   -> every post and portfolio item (drafts too)
 *   POST /__editor/api/check     -> validate without saving
 *   POST /__editor/api/save      -> write content/<kind>/<file>.md and rebuild
 *   POST /__editor/api/upload    -> store an image under public/images/posts
 * and it re-generates src/generated/*.json whenever a file in content/ changes.
 */
const express = require("express");
const lib = require("../scripts/content-lib.cjs");

module.exports = function setupEditorApi(app) {
  const api = express.Router();
  api.use(express.json({ limit: "40mb" }));

  api.get("/content", (req, res) => {
    const content = lib.loadContent();
    res.json({
      ...content,
      categories: lib.categories,
      nextId: content.posts.reduce((m, p) => Math.max(m, p.id || 0), 0) + 1,
    });
  });

  api.post("/check", (req, res) => {
    const { kind, file, previousFile, data } = req.body || {};
    try {
      const result =
        kind === "portfolio"
          ? lib.checkPortfolioItem({ file, item: data, previousFile })
          : lib.checkPost({ file, post: data, previousFile });
      res.json(result);
    } catch (err) {
      res.status(500).json({ ok: false, errors: [err.message] });
    }
  });

  api.post("/save", (req, res) => {
    const { kind, file, previousFile, data } = req.body || {};
    try {
      const result =
        kind === "portfolio"
          ? lib.savePortfolioItem({ file, item: data, previousFile })
          : lib.savePost({ file, post: data, previousFile });
      if (result.ok) console.log(`[editor] saved content/${kind === "portfolio" ? "portfolio" : "posts"}/${result.file}`);
      res.json(result);
    } catch (err) {
      res.status(500).json({ ok: false, errors: [err.message] });
    }
  });

  api.post("/upload", (req, res) => {
    const { name, data } = req.body || {};
    try {
      const base64 = String(data || "").replace(/^data:[^;]+;base64,/, "");
      res.json(lib.saveImage(name, base64));
    } catch (err) {
      res.status(500).json({ ok: false, errors: [err.message] });
    }
  });

  app.use("/__editor/api", api);

  lib.watchContent((result) => {
    if (result.changed) console.log("[content] rebuilt src/generated from content/");
    for (const e of result.errors) console.log(`[content] ${e}`);
  });
};
