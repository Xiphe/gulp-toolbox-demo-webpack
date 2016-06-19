'use strict';

const gulp = require('gulp');
const GulpToolboxRegistry = require('gulp-toolbox-registry');
const demoWebpack = require('./index');

gulp.registry(new GulpToolboxRegistry({
  toolboxes: [
    demoWebpack,
  ],
}));
