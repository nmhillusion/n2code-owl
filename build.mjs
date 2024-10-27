import { BullEngine } from "@nmhillusion/n2ngin-bull-engine";
import { parser } from "@nmhillusion/n2mix";
import * as path from "path";
import * as fs from "fs";
import { Indexity } from "@nmhillusion/n2ngin-indexity";

const dirname = process.cwd();

const params = parser.cliParamsParser(process.argv);

const watchMode = params.get("watch") ? true : false;

const envPath = params.get("env-path") ? params.get("env-path") : "env.json";

console.log({
  params,
});

new BullEngine()
  .config({
    copyResource: {
      enabled: true,
      config: {
        extsToCopy: [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".ico",
          ".woff",
          ".ttf",
          ".yml",
          ".yaml",
        ],
      },
    },
    markdown: {
      enabled: true,
    },
    pug: {
      enabled: true,
    },
    scss: {
      enabled: true,
    },
    typescript: {
      enabled: true,
    },
    rewriteJavascript: {
      enabled: true,
    },
    outDir: path.join(dirname, "dist"),
    rootDir: path.join(dirname, "src"),
    watch: {
      enabled: watchMode,
      config: {
        minIntervalInMs: 500,
      },
    },
  })
  .setVariableFilePathToInject(path.join(dirname, envPath))
  .render();

const indexity_ = new Indexity().config({
  relativeTo: "dist",
  srcDir: path.join(dirname, "dist"),
  baseHref: ".",
});

const indexityBuilder_ = await indexity_.build();

const siteMapContent = indexityBuilder_.operator.html.basicUI();

fs.writeFileSync("dist/index.html", siteMapContent);
