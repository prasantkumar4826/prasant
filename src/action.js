const fetch = require('node-fetch');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  const TENOR_TOKEN = core.getInput('TENOR_TOKEN');


  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;
  await octokit.rest.issues.createComment({
  ...context.repo,
  issue_number: pull_request.number,
  body: 'Thank you for submitting a pull request! We will try to review this as soon as we can.\n\n<a href="https://media.tenor.com/images/283e4a6fd8d9e14f042aff896544d172/tenor.gif">Visit W3Schools</a>'
});
  }
   
  run();
