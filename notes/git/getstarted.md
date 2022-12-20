# GETSTARTED.MD

In this file, you'll learn how to set up your git, in case you want to have a repository, on github, with all your code




## Guides Followed

In order to create this simple git/getstarted.md file, I used 2 guides:
- [Hubspot: Git and Github tutorial for Beginners](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners)
- [Rocketseat: Git & Github: O que é? Por que? Como iniciar?](https://blog.rocketseat.com.br/iniciando-com-git-github/)





## What is git?

[Git](https://git-scm.com/downloads) is a open-source control version system used by most developers. With Git, you can create a whole history of changes from the code of your project and easily navigate through them.

## Github

Github, on the other hand, is a online service to host repositories Git (projects made with Git). With GitHub, we can have all commits and branchs syncronized with the members of a team.



## In Practice

#### Download Git

Download Git at [https://git-scm.com/downloads](https://git-scm.com/downloads)

When you install it, open your terminal and use the command `git --version`. It a version of git appears, it means it was installed.



#### Set up

Now that you have Git, you have to link it with your Github account. To do that, in the terminal, write the code below:
```m
git config --global user.name "Your Github Account Name"
git config --global user.email "your-email@example.com"
```



#### Starting a Git (locally)

If you don't have a project which you want to create a repository of, simply create a empty folder and do the following command:
> git init

It'll create a hidden folder called ".git" where all the changes will be registered. If you delete this folder, you'll lose all your history of the project.

When iniciating the command, you should have the following message:

```m
Initialized empty Git repository in C:/Users/YOUR_USER/.../.git/
```



#### Testing and commiting changes (locally)

In order to test if it's working, you can create a new txt file called "file.txt".
Write something in it and do `git status`:

```m
On branch master

No commits yet

Untracked files:
 (use "git add <file>..." to include in what will be committed)

file.txt

nothing added to commit but untracked files present (use "git add" to track)
```

the command `git status` gives us all the status related to the project (a record/report).



You can add the file with the command `git add file.txt` or `git add .` to add everything (staging):

```m
Changes to be committed:
 (use "git rm --cached <file>..." to unstage)

new file: file.txt
```


Now, we can commit the file with the command `git commit -m "write a message here"`. Since this is our very first commit, we can simply type `git commit -m "first commit"`:

```m
[master (root-commit) 646845c] Primeira versão do projeto
1 file changed, 1 insertion(+)
create mode 100644 file.txt
```


And that's how you commit changes `locally`.




## Git (on a GitHub repository)

> git checkout -b <my branch name>.
Creates a new branch

> git branch
See all the branchs made



Now, create a new GitHub repository. Once it's created, you can choose the option `'....or push an existing repository from the command line'`

Then, you can copy the link and use the following command:

```m
git remote add origin your_link_here.git
```

To push all changes to your new repository, simply use the command `git push`:

```m
git push -u origin master

Counting objects: 3, done.
Writing objects: 100% (3/3), 263 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/your_github_name/project.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.
```



If you have a different branch to be pushed into the project, use the code below:
```md
git push origin my-new-branch

Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 313 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/your_github_name/project.git
 * [new branch]      my-new-branch -> my-new-branch
```




If you ever need to get all the changes from GitHub to your local machine, you can use `git pull` command:
```m
git pull origin master

remote: Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (1/1), done.
From https://github.com/your_github_name/project.git
 * branch            master     -> FETCH_HEAD
   b345d9a..5381b7c  master     -> origin/master
Merge made by the 'recursive' strategy.
 file.txt | 1 +
 1 file changed, 1 insertion(+)
```



The last command I want to talk about is `git log` which, as the name suggests, logs everything you have done.




#### SSH KEY

In order to push changes from your local machine to your github repository, you need a SSH Key.

Please, follow the guide made by GitHub clicking in the following [link: Connecting to Github with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)