import { BullEngine } from "@nmhillusion/n2ngin-bull-engine";
import { parser } from "@nmhillusion/n2mix";
import * as path from "path";

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
