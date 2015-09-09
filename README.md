Imprint Versioning POC
======================

A quick POC to develop a versioning model for Imprint. 

Overview
--------

The basic idea here is to replace the command

    git push

with 

    grunt release

whenever you are pushing non-WIP code. This will handle the following tasks:

 1. Check to make sure you are in `master` branch
 2. Run any build tasks
 3. Bump the version using [semver](http://semver.org/) versioning
 4. Committing code in your working copy
 5. Tagging with the current version
 6. Pushing the current branch and tags to GitHub

Additionally, you can specify what kind of version you are releasing:

    # at 0.0.1

    $ grunt release
    
    # (same as grunt release:patch)
    # => 0.0.2

will increment the patch-level versioning digit (n.n.n+1)

    # at 0.0.2

    $ grunt release:minor

    # => 0.2.0

will increment the minor-level versioning digit (n.n+1.n)

    # at 0.2.0

    $ grunt release:major

    # => 1.0.0

will increment the major-level versioning digit (n+1.n.n)


Workflow
--------



