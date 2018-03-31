/* ProLogger
 *
 * Logger library by PROPHESSOR (2017 - 2018)
 *
 * Simple usage:
 * Log.setLevels(["name of level"]);
 * Log.log/warn/error/info("message", { //optional object
 * 	noconvert: true/false, //Disable convertation (timestamps and else)
 * 	level: "name of level"
 * });
 * Log.log("message");
 * Log.log("message", {noconvert:true});
 */

/**
  * options:
  *     level - Уровень, если работает скрытие. log/error/debug/
  *     from - 
  *     showMsgTypes
  *     showColors
  *     showDate
  *     dateFormat
  */

'use strict';

const node = typeof require === 'function';

const chalk = node ? require('chalk') : null;
const dateFormat = node ? require('dateformat') : null;
const { EventEmitter } = node ? require('events') : class { };

const symbols = {
	'checkForSend': Symbol('checkForSend'),
	'getFullOptions': Symbol('getFullOptions')
};

/**
 * @class
 */
class Logger extends EventEmitter {
	/**
	 * @constructor
	 * @param {object} options - Options
	 * @param {array} [options.levels] - Show only this levels of log
	 * @param {string} [options.from] - Default "from" prefix
	 * @param {bool} [options.showFrom] - Prefix like [App->Composer]: 
	 * @param {bool} [options.showMsgTypes] - Prefix like [LOG]: 
	 * @param {bool} [options.showColors] - Unix terminal colors
	 * @param {bool} [options.showDate] - Date/Time prefix
	 * @param {string} [options.dateFormat] - Date/Time prefix format (dateformat lib)
	 * @param {bool} [optinos.pure] - Disable all features. JUST (COLORFUL) console.log
	 */
	constructor(options = {}) {
		super();

		// Bind this
		{
			this.log = this.log.bind(this);
			this.warn = this.warn.bind(this);
			this.error = this.error.bind(this);
			this.info = this.info.bind(this);
			this.success = this.success.bind(this);
			this.addLevels = this.addLevels.bind(this);
			this.removeLevel = this.removeLevel.bind(this);
			this.setCallback = this.setCallback.bind(this);
			this.on = this.on.bind(this);
			this.emit = this.emit.bind(this);
		}

		this._config = {
			levels: [],
			from: '',
			showMsgTypes: true, //TODO:
			showColors: true,
			showDate: true,
			dateFormat: 'H:MM:ss',
			pure: false,
			logFormat: '%TYPE%%DATE%%FROM%%DATA%' // TODO:
		};

		Object.assign(this._config, options);

		this.on('error', () => { }); // No unhandled error
	}

	setOptions(options) {
		Object.assign(this._config, options);
		return this;
	}

	/** Returns full (config + current options) optinos
	 * @private
	 * @param  {object} options - Local options
	 * @returns {object} Full options (this._config + local)
	 */
	[symbols.getFullOptions](options) {
		const params = {};
		Object.assign(params, this._config);
		Object.assign(params, options);
		return params;
	}

	[symbols.checkForSend](options) {
		if (options.level && !this._config.levels.includes(options.level)) return false;

		return true;
	}


	/**
	 * Advance console.log
	 * @param  {any} data - data
	 * @param  {object} options - Options
	 * @param  {string} [options.from] - from prefix (like "Validator")
	 * @param  {string} [options.level] - custom log level
	 * @param  {bool} [options.pure] - Disable all features. JUST (colorful) console.log
	 * @param  {string} [options.dateFormat] - Date/time prefix format (for the dateformat library)
	 * @param  {bool} [options.showFrom] - Enable/disable from prefix
	 * @param  {bool} [optinos.showColors] - Enable/disable unix color mode
	 * @param  {bool} [options.showMsgTypes] - Enable/disable prefix like [LOG]:
	 * @param  {bool} [options.showDate] - Enable/disable date/time prefix
	 * @returns {this} this
	 */
	log(data, options = {}) {
		if (data instanceof Error) return this.error(data, options);
		let out = data;

		let params = this[symbols.getFullOptions](options);

		if (!this[symbols.checkForSend](params)) return this;

		if (!params.pure) {
			out = this.bundle(out, {
				from: params.from ? `{${params.from}}` : null,
				date: params.showDate ? `[${Logger.timestamp()}]` : null,
				type: params.showMsgTypes ? '[LOG]:' : null
			});
		}

		console.log(params.showColors ? chalk.cyan(out) : out);
		this.emit('log', out);

		return this;
	}

	/**
	 * Advance console.warn
	 * @param  {any} data - data
	 * @param  {object} options - Options
	 * @param  {string} [options.from] - from prefix (like "Validator")
	 * @param  {string} [options.level] - custom log level
	 * @param  {bool} [options.pure] - Disable all features. JUST (colorful) console.log
	 * @param  {string} [options.dateFormat] - Date/time prefix format (for the dateformat library)
	 * @param  {bool} [options.showFrom] - Enable/disable from prefix
	 * @param  {bool} [optinos.showColors] - Enable/disable unix color mode
	 * @param  {bool} [options.showMsgTypes] - Enable/disable prefix like [LOG]:
	 * @param  {bool} [options.showDate] - Enable/disable date/time prefix
	 * @returns {this} this
	 */
	warn(data, options = {}) {
		if (data instanceof Error) return this.error(data, options);
		let out = data;

		let params = this[symbols.getFullOptions](options);

		if (!this[symbols.checkForSend](params)) return this;

		if (!params.pure) {
			out = this.bundle(out, {
				from: params.from ? `{${params.from}}` : null,
				date: params.showDate ? `[${Logger.timestamp()}]` : null,
				type: params.showMsgTypes ? '[WARN]:' : null
			});
		}

		console.warn(params.showColors ? chalk.yellow(out) : out);
		this.emit('warn', out);

		return this;
	}

	/**
	 * Advance console.error
	 * @param  {any} data - data
	 * @param  {object} options - Options
	 * @param  {string} [options.from] - from prefix (like "Validator")
	 * @param  {string} [options.level] - custom log level
	 * @param  {bool} [options.pure] - Disable all features. JUST (colorful) console.log
	 * @param  {string} [options.dateFormat] - Date/time prefix format (for the dateformat library)
	 * @param  {bool} [options.showFrom] - Enable/disable from prefix
	 * @param  {bool} [optinos.showColors] - Enable/disable unix color mode
	 * @param  {bool} [options.showMsgTypes] - Enable/disable prefix like [LOG]:
	 * @param  {bool} [options.showDate] - Enable/disable date/time prefix
	 * @returns {this} this
	 */
	error(data, options = {}) {
		let out = data;
		if (out instanceof Error) out = out.message;

		let params = this[symbols.getFullOptions](options);

		if (!this[symbols.checkForSend](params)) return this;

		if (!params.pure) {
			out = this.bundle(out, {
				from: params.from ? `{${params.from}}` : null,
				date: params.showDate ? `[${Logger.timestamp()}]` : null,
				type: params.showMsgTypes ? '[ERR]:' : null
			});
		}

		console.error(params.showColors ? chalk.red(out) : out);
		this.emit('error', out);

		return this;
	}

	/**
	 * Advance console.info
	 * @param  {any} data - data
	 * @param  {object} options - Options
	 * @param  {string} [options.from] - from prefix (like "Validator")
	 * @param  {string} [options.level] - custom log level
	 * @param  {bool} [options.pure] - Disable all features. JUST (colorful) console.log
	 * @param  {string} [options.dateFormat] - Date/time prefix format (for the dateformat library)
	 * @param  {bool} [options.showFrom] - Enable/disable from prefix
	 * @param  {bool} [optinos.showColors] - Enable/disable unix color mode
	 * @param  {bool} [options.showMsgTypes] - Enable/disable prefix like [LOG]:
	 * @param  {bool} [options.showDate] - Enable/disable date/time prefix
	 * @returns {this} this
	 */
	info(data, options = {}) {
		if (data instanceof Error) return this.error(data, options);
		let out = data;

		let params = this[symbols.getFullOptions](options);

		if (!this[symbols.checkForSend](params)) return this;

		if (!params.pure) {
			out = this.bundle(out, {
				from: params.from ? `{${params.from}}` : null,
				date: params.showDate ? `[${Logger.timestamp()}]` : null,
				type: params.showMsgTypes ? '[INFO]:' : null
			});
		}

		console.info(params.showColors ? chalk.blue(out) : out);
		this.emit('info', out);

		return this;
	}

	/**
	 * Analog of info but green
	 * @param  {any} data - data
	 * @param  {object} options - Options
	 * @param  {string} [options.from] - from prefix (like "Validator")
	 * @param  {string} [options.level] - custom log level
	 * @param  {bool} [options.pure] - Disable all features. JUST (colorful) console.log
	 * @param  {string} [options.dateFormat] - Date/time prefix format (for the dateformat library)
	 * @param  {bool} [options.showFrom] - Enable/disable from prefix
	 * @param  {bool} [optinos.showColors] - Enable/disable unix color mode
	 * @param  {bool} [options.showMsgTypes] - Enable/disable prefix like [LOG]:
	 * @param  {bool} [options.showDate] - Enable/disable date/time prefix
	 * @returns {this} this
	 */
	success(data, options = {}) {
		if (data instanceof Error) return this.error(data, options);
		let out = data;

		let params = this[symbols.getFullOptions](options);

		if (!this[symbols.checkForSend](params)) return this;

		if (!params.pure) {
			out = this.bundle(out, {
				from: params.from ? `{${params.from}}` : null,
				date: params.showDate ? `[${Logger.timestamp()}]` : null,
				type: params.showMsgTypes ? '[OK]:' : null
			});
		}

		console.log(params.showColors ? chalk.green(out) : out);
		this.emit('success', out);

		return this;
	}
	/**
	 * Add or replace log levels
	 * @param  {(array|string)} levels - If set (array) or add (string) the level
	 * @param {string} [options.level] - Log with custom log level
	 * @param {bool} [options.noconvert] - Disable timestamp
	 * @param {bool} [options.prefix] - Enable prefix
	 * @returns {this} this
	 */
	addLevels(levels) {
		if (levels instanceof Array) {
			this._config.levels = Array.from(new Set(this._config.levels.concat(levels)));
		} else if (typeof levels === 'string') {
			this._config.levels.push(levels);
		} else {
			throw new Error('Levels must be an Array or a String');
		}

		return this;
	}

	/**
	 * Remove log level
	 * @param  {string} level - Level whitch you want to remove
	 * @param {string} [options.level] - Log with custom log level
	 * @param {bool} [options.noconvert] - Disable timestamp
	 * @param {bool} [options.prefix] - Enable prefix
	 * @returns {this} this
	 */
	removeLevel(level) {
		if (typeof level !== 'string') throw new Error('Argument must be a String');
		const idx = this._config.levels.indexOf(level);

		if (idx >= 0) {
			this._config.levels.splice(idx, 1);
		}

		return this;
	}

	/**
	 * Bind callback to the event
	 * @param  {string} event - Event like log/error/success/warn etc.
	 * @param  {function} callback - Function to bind to the event
	 * @returns {this} this
	 */
	setCallback(event, callback = () => { }) {
		this.on(event, callback);

		return this;
	}

	bundle(data, { from, date, type }) {
		if (!data) throw new Error('Can\'t bundle enhanced data without itself');

		from = from ? from + '\t' : '';
		date = date ? date + '\t' : '';
		type = type ? type + '\t' : '';

		return this._config.logFormat
			.replace(/%TYPE%/, type)
			.replace(/%DATE%/, date)
			.replace(/%FROM%/, from)
			.replace(/%DATA%/, data);
	}


	/**
	 * Add timestamp
	 * @private
	 * @static
	 * @param {string} [format="H:MM:ss"] - Date string format
	 * @returns {string} Formatted date string
	 */
	static timestamp(format = 'H:MM:ss') {
		return node ? dateFormat(new Date(), format) : Date.now.toString();
	}

	get symbols() {
		return symbols;
	}
}

module.exports = Logger;