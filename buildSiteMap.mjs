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

fs.writeFileSync("dist/index.html", siteMapContent);