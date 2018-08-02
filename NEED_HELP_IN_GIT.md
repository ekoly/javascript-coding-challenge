# How to git clone and modify origin

## Clone an original project and modify the origin URL

```sh
$ git clone <REPO_URL>
$ git remote remove origin
$ git remote add origin <YOUR_REPO_URL>
```

## (Optional) View the logs to ensure you have the initial commit

Make sure you commit the new cloned project untouched to your new repo as `initial commit` first before starting to work on it.

```sh
$ git log
```

## (Optional) Push to the new origin if you haven't already had initial commit

While this is an optional step, you have to push an `initial commit` to your new repo first before anything else so that anyone can know what changes you have made to your new repo.

```sh
$ git push origin master
```

## Useful resources

- [Git cheat sheet][git-cheat-sheet-url]
- [git][git-url]
- [Setting up git SSH before you can git][setting-up-git-ssh-url]

[git-cheat-sheet-url]: https://www.git-tower.com/blog/git-cheat-sheet
[git-url]: https://git-scm.com/docs
[setting-up-git-ssh-url]: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
