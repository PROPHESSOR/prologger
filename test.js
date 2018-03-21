#!/usr/env node

// Node.js test
'use strict';

const Logger = require('./');
const logger = new Logger({
	levels: ['test']
});
const {	log, warn, error, info,success } = logger;

log('Logger.log');

warn('Logger.warn');

info('Logger.info');

success('Logger.success');

error('Logger.error');

log('Log with a custom log level "test"', {
	level: 'test'
});

log('Log with a custom log level "test2"', {
	level: 'test2'
});

log('Log without timestamp', {
	noconvert: true
});

log('Log with prefix and without timestamp', {
	prefix: true,
	noconvert: true
});

log('Log with prefix and timestamp', {
	prefix: true,
	noconvert: false
});