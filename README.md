Imprint Versioning POC
======================

A quick POC to develop a versioning model for Imprint. 

The basic idea here is to replace the command

   git push

with 

  grunt release

whenever you are pushing non-WIP code. This will handle the following tasks:

 1. Running any build tasks
 2. Bumping the version using [semver](http://semver.org/)
 3. Committing code in your working copy
 4. Tagging with the current version
 5. Pushing the current branch and tags to GitHub

Additionally, you can specify what kind of version you are releasing:

    grunt release
    grunt release:patch

will increment the patch-level versioning digit (n.n.n+1)

    grunt release:minor

will increment the minor-level versioning digit (n.n+1.n)

    grunt release:major

will increment the major-level versioning digit (n+1.n.n)
