import { Indexity } from "@nmhillusion/n2ngin-indexity";
import * as fs from "fs";
import * as path from "path";

const dirname = process.cwd();

const indexity_ = new Indexity().config({
  relativeTo: "dist",
  srcDir: path.join(dirname, "dist"),
  baseHref: ".",
});

console.log("Building site map...");

const indexityBuilder_ = await indexity_.build();

const siteMapContent = indexityBuilder_.operator.html.basicUI();

fs.writeFileSync(
  "dist/index.html",
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${indexityBuilder_.metadata.metadata.title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap" rel="stylesheet">

    <style>
      html, body {
        font-family: "Jura", sans-serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
      }
    </style>
  </head>
  <body>
    ${siteMapContent}
  </body>
  </html>
  `
);
