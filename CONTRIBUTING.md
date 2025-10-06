# Welcome to Lazr contributing guide <!-- omit in toc; blame the file with original; check before commiting -->

Thank you for investing your time in contributing to our project! Any contribution you make will be reflected on the repo :sparkles:.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

Use the table of contents icon on the top left corner of this document to get to a specific section of this guide quickly.

## New contributor guide

To get an overview of the project, read the [README](README.md) file. Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/git-basics/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Getting started

Before you begin contributing, please take a moment to familiarize yourself with our guidelines and best practices. We encourage respectful collaboration and clear communication to ensure a positive experience for everyone involved. Whether you're reporting bugs, suggesting enhancements, or submitting code, your input is valued and helps improve the project for all users.

### Issues

#### Create a new issue

If you spot a problem with the app, [search if an issue already exists](https://github.com/xaviermontane/lazr/issues). If a related issue doesn't exist, you can open a new issue within the [new issues tab](https://github.com/xaviermontane/lazr/issues/new).

#### Solve an issue

Scan through our [existing issues](https://github.com/xaviermontane/lazr/issues) to find one that interests you. You can narrow down the search using `labels` as filters. See "[Label reference](https://docs.github.com/en/contributing/collaborating-on-github-docs/label-reference)" for more information. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes

#### Make changes in the UI

Click **Make a contribution** at the bottom of any docs page to make small changes such as a typo, sentence fix, or a broken link. This takes you to the `.md` file where you can make your changes and [create a pull request](#pull-request) for a review.

#### Make changes in a codespace

For more information about using a codespace for working on GitHub documentation, see "[Working in a codespace](https://docs.github.com/en/contributing/setting-up-your-environment-to-work-on-github-docs/working-on-github-docs-in-a-codespace)."

#### Make changes locally

1. Fork the repository.

    - Using GitHub Desktop:
        - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
        - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

    - Using the command line:
        - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

2. Install or update to **Node.js**, at the version specified in `.node-version`.

3. Create a working branch and start with your changes!

### Commit your update

Commit the changes once you are happy with them. Don't forget to use the "[Self review checklist](https://docs.github.com/en/contributing/collaborating-on-github-docs/self-review-checklist)" to speed up the review process :zap:.

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
Once you submit your PR, a Lazr team member will review your proposal. We may ask questions or request additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: The Lazr team thanks you :sparkles:.

Once your PR is merged, your contributions will be publicly visible on the [Lazr description](https://discord.com/oauth2/authorize?client_id=1368251393395396690&permissions=8&integration_type=0&scope=bot+applications.commands).

Thank you for becoming part of the Lazr community, your contributions make the internet a better place! :heart:

## Windows

If you're contributing to Lazr on Windows, keep these points in mind:

1. **Line Endings:** Windows uses `\r\n` for line endings, while Unix-based systems use `\n`. When handling text or writing regular expressions, use `\r?\n` to support both. The Node.js [`os.EOL`](https://nodejs.org/api/os.html#os_os_eol) property can help ensure compatibility.
2. **File Paths:** Windows paths use backslashes (`\`). Use Node's `path` module to handle paths correctly, and consider `path.posix` or the [slash](https://ghub.io/slash) module if you need forward slashes (e.g., for URLs).
3. **Scripts:** Not all Windows environments support Bash. Prefer writing scripts in JavaScript for cross-platform compatibility when automating bot tasks.
4. **Filename Length:** Windows has a 260-character filename limit with some Git installations. If you encounter errors, try updating your Git config with `git config --system core.longpaths true`, or use a different Git client.

These tips will help ensure your contributions to the Discord bot work smoothly across platforms.
