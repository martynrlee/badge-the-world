# Gulpfile
-----

This file contains the various gulp tasks available for your usage.
The first thing we have to do is require a few libraries:

    gulp = require 'gulp'
    ghDeploy = require 'gulp-gh-pages'
    path = require 'path'

Then we define the various tasks.

## Tasks
-----

All tasks are run from the command line.

### default

`gulp`

Run the default gulp task, deploy_gh_staging.

    gulp.task 'default', ['deploy_gh_pages']

### deploy_gh_pages

`gulp deploy_gh_pages`

Deploys the Badge the World website to Github pages for staging review.

    gulp.task 'deploy_gh_pages', () ->
      return gulp.src [
        path.join '.', 'app', '**', '*'
      ], { push: true }
      .pipe ghDeploy cacheDir: 'deploy_cache'