Link Heroku Account to Github Account
=====

For Heroku developers, perhaps it may be thought easier to not deploy with every commit.  I am lazy and probably haven't come across the command
to commit to Heroku without deploying.  I decided to link my project up with Github, not just to have a visual tool to show the differences
in my code or manage other functions.  I also want to commit my code without needing to wait for deployment to finish.  Here is what I did
to accomplish the goal of faster development (code commits).

These instructions assume that a heroku account has already been created.

Configuration of .git/config file to accommodate pushing to heroku and github.

```
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = false
[remote "origin"]
        fetch = +refs/heads/*:refs/remotes/origin/*
        url = git@heroku.personal:<heroku-project-name>.git
[remote "heroku"]
        fetch = +refs/heads/*:refs/remotes/origin/*
        url = git@heroku.personal:<heroku-project-name>.git
[remote "github"]
        fetch = +refs/heads/*:refs/remotes/origin/*
        url = git@github.com:<user-name>/<heroku-project-name>.git
[branch "master"]
        remote = origin
        merge = refs/heads/master
[heroku]
        account = personal
```


Create new github account with the same name as the heroku account.
Copy the commit hash for the first commit of the newly created github account.

```
git pull github master

git reset <commit-hash>
git rm README.md
git commit -m "trying to link up to github master"
```

Save to github (don't need to publish to heroku).

```
git push github master
```

Publish to heroku.

```
git push heroku master
```

