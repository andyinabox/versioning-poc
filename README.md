Imprint Versioning POC
======================

A quick POC to develop a versioning model for Imprint. Some additionl notes can also be found [on the confluence wiki](https://imprint.atlassian.net/wiki/display/~andydayton/%2378%3A+SPIKE%3A+explicit+control+between+imprint-web-common+version+and+imprint+and+imprint-mobile+releases).

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

### Managing Each Repo

Much of the workflow can be the same as it is currently: working in various feature branches and (at least in the case of the desktop) merge into an `integration` branch for QA. This strategy applies exclusively to changes in the `master` branch, with the assumption that `master` = production in all cases.

This is less relevant for the desktop site, where releases are already pretty closely managed -- but moreso in the `imprint-mobile` and `imprint-web-common` projects where more development is happening in `master` and we aren't really tracking versions currently.

The basic workflow would be:

 1. Merge changes into `master`
 2. Test locally
 3. Run `grunt release`
 4. Deploy to appropriate env

### Managing Dependencies

We can set our policy based on the [NPM semvar spec for consumers](https://www.npmjs.com/package/npm-check-updates).

For instance, in the imprint desktop `package.json` we might set our dependency:

```json
	"imprint-web-common": "1.0.x"
```
which means that for patch-level updates, the latest will automatically be installed with `npm update` or `npm install`, but any minor or major-level releases need to be upgraded manually.

Evaluation
---------- 

### Pros

  * Ensures that we keep an explicit version history for every push to master, and that each version has a corresponding tag.
  * Ensures that tags are only committed from `master` branch
  * Updates our versioning standard to use Semantic Versioning, which provides more information & is a common standard
  * Automates the commit/tag/push workflow to make things a little easier


### Cons

 * Only works if devs follow the rules (i.e. don't just run `git push master`)
 * Doesn't fully address the issue of managing versions for sub-dependencies, like managing which version of `imprint-web-common` is included within the desktop and mobile sites (only gives us handy tags & versions to aid in that process)
 * Current implementation requires double login for deploying branch/tags (annoying)
 * Could result in excessive number of tags (not sure if that really is a problem?)


