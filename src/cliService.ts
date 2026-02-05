import { Command } from "commander";

const cliTool = new Command();

cliTool.name("github_trending_api")
    .description("Find out what's trending at github")
    .version("1.0.0")
    .option('--debug', 'output extra debugging information')
    .option("-l, --limit <type>", "limit repos per view")
    .option("-d, --duration <days>", "specify time to trace back")
    .parse();

export default cliTool;