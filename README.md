Imprint Versioning POC
======================

A quick POC to develop a versioning model for Imprint. Some additionl notes can also be found [on the confluence wiki](https://imprint.atlassian.net/wiki/display/~andydayton/%2378%3A+SPIKE%3A+explicit+control+between+imprint-web-common+version+and+imprint+and+imprint-mobile+releases).

The Grunt workflow itself is fairly simple, and can be found in `Gruntfile.js` above. It depends upon [grunt-bump](https://github.com/vojtajina/grunt-bump), [grunt-checkbranch](https://github.com/dominykas/grunt-checkbranch), and [grunt-git](https://github.com/rubenv/grunt-git). This repository uses the same process for version management, so you can checkout this repo if you want to test it out.

Installation
------------

```bash
npm install
```

Overview
--------

The basic idea here is to replace the command

    git push

with 

    grunt release

whenever you are pushing any changes to the `master` branch, in a way that is standardized across our repos.

The `grunt release` command handles the following tasks:

 1. Check to make sure you are in `master` branch
 2. Run any build tasks
 3. Bump the version using [Semantic Versioning](http://semver.org/)
 4. Commit the code in your working copy
 5. Tag with the current version
 6. Push the current branch and tags to GitHub
 7. Update the `stable` branch with the current version

Additionally, you can specify what kind of version you are releasing:

```bash
# at 0.0.1

# (same as grunt release:patch)
$ grunt release

# => 0.0.2

$ grunt release:minor

# => 0.2.0

$ grunt release:premajor

# => 1.0.0-rc.0

$ grunt release:major

    # => 1.0.0
```

There are more options documented in the [grunt-bump docs](https://github.com/vojtajina/grunt-bump).


Workflow
--------

### Managing Repositories

Much of the workflow can be the same as it is currently: working in various feature branches and (at least in the case of the desktop) merge into an `integration` branch for QA. This versioning strategy applies exclusively to changes in the `master` branch, with the assumption that `master` = production in all cases.

This is less relevant for the desktop site, where releases are already pretty closely managed -- but moreso in the mobile and web-common repos where more development is happening in `master` and we aren't really tracking versions closely.

The basic workflow would be:

 1. Merge changes into `master` (unless you're already working in master)
 2. Test locally
 3. Run `grunt release`
 4. Deploy to appropriate env (staging for QA, or production for a finished release)

### Managing Dependencies

~~We can set our policy based on the [NPM semvar spec for consumers](https://www.npmjs.com/package/npm-check-updates).~~ Since we are using a git repo rather than an NPM registry for our in-house dependencies, we will have to be more explicit. Since we're maintaining a `stable` branch we can use that to keep track of the latest.

```json
 dependencies: {
		"imprint-web-common": "git@github.com:ImprintDev/imprint-web-common.git#stable",
 }
```

Evaluation
---------- 

### Pros

  * Ensures that we keep an explicit version history for every push to master, and that each version has a corresponding tag.
  * Ensures that tags are only committed from `master` branch
  * Updates our versioning standard to use Semantic Versioning, which provides more information & is a common standard
  * Automates the commit/tag/push workflow to make things a little easier
  * Unifies release process between repos, regardless of specific architecture

### Cons

 * Only works if devs follow the rules (i.e. don't just run `git push master`)
 * Current implementation requires triple login for deploying branch/tags (annoying)
 * Could result in excessive number of tags (not sure if that really is a problem?)


