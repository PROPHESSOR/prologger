#!/usr/env node

// Node.js test
'use strict';

const Logger = require('./');

const logger = new Logger({
	levels: ['test'], // Optional. Display only logs with this levels.
	showFrom: true // Show breadcrumps if they're avaliable.
});

const { log, warn, error, info,success } = logger;

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
	showDate: false
});

log('Log with message type and without timestamp', {
	showDate: false
});

log('Log with breadcrumps and without timestamp', {
	showDate: false,
	from: 'test.js->Test breadcrumps'
});

logger.setOptions({
	dateFormat: 'DD.MM.YYYY (HH.MM.ss)'
});

warn('Warn with custom date format "dd.mm.yyyy (HH:MM:ss)" and without msg type', {
	showMessageTypes: false,
	dateFormat: 'dd.mm.yyyy (HH:MM:ss)'
});

logger.setOptions({
	logFormat: '%DATE%%TYPE%%DATA%%FROM%'
});
error('Error with custom style (%DATE%%TYPE%%DATA%%FROM%)');