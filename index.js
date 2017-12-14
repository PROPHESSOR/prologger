/* ProLogger
 *
 * Logger library by PROPHESSOR (2017)
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

"use strict";

const chalk = require("chalk");
/**
 * @class
 */
class Logger {
    /**
     * @constructor
     */
    constructor() {
        this.log = this.log.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);
        this.info = this.info.bind(this);
        this.success = this.success.bind(this);
        this.setLevels = this.setLevels.bind(this);
        this.removeLevel = this.removeLevel.bind(this);
        this.setCallback = this.setCallback.bind(this);

        this._noprefix = false;

        this.levels = [];
        this.callbacks = {
            log() {},
            error() {},
            warn() {},
            info() {},
            success() {}
        };
    }

    /**
     * Disable prefix by default
     * @public
     * @type {boolean}
     */

    get noprefix() {
        return this._noprefix;
    }

    set noprefix(bool) {
        this._noprefix = !!bool;
    }


    /**
   * Advance console.log
   * @param  {any} data - data
   * @param  {(object|undefined|any)} options - Options || disable [PREFIX]
   * @param {string} [options.level] - Log with custom log level
   * @param {bool} [noconvert] - Disable timestamp
   * @param {bool} [prefix] - Enable prefix
   * @returns {this} this
   */
    log(data, options = {}) {
        let out = data;
        if (typeof options === "object") { // It can be a number (0)/boolean (false)/string ('') etc.
            if (options.level && this.levels.indexOf(options.level) < 0) return this;
            out = !options.noconvert ? Logger.convert(data) : data;
            if(!this._noprefix || options.prefix) out = `[LOG]: ${out}`;
        }

        console.log(chalk.cyan(out));
        this.callbacks.log(out);

        return this;
    }

    /**
   * Advance console.warn
   * @param  {any} data - data
   * @param  {(object|undefined|any)} options - Options || disable [PREFIX]
   * @param {string} [options.level] - Log with custom log level
   * @param {bool} [noconvert] - Disable timestamp
   * @param {bool} [prefix] - Enable prefix
   * @returns {this} this
   */
    warn(data, options = {}) {
        let out = data;
        if (typeof options === "object") { // It can be a number (0)/boolean (false)/string ('') etc.
            if (options.level && this.levels.indexOf(options.level) < 0) return this;
            if (!options.noconvert) out = Logger.convert(data);
            if(!this._noprefix || options.prefix) out = `[WARN]: ${out}`;
        }

        console.warn(chalk.yellow(out));
        this.callbacks.warn(out);

        return this;
    }

    /**
   * Advance console.error
   * @param  {any} data - data
   * @param  {(object|undefined|any)} options - Options || disable [PREFIX]
   * @param {string} [options.level] - Log with custom log level
   * @param {bool} [noconvert] - Disable timestamp
   * @param {bool} [prefix] - Enable prefix
   * @returns {this} this
   */
    error(data, options = {}) {
        let out = data;
        if (typeof options === "object") { // It can be a number (0)/boolean (false)/string ('') etc.
            if (options.level && this.levels.indexOf(options.level) < 0) return this;
            if (!options.noconvert) out = Logger.convert(data);
            if(!this._noprefix || options.prefix) out = `[ERROR]: ${out}`;
        }

        console.error(chalk.red(out));
        this.callbacks.error(out);

        return this;
    }

    /**
   * Advance console.info
   * @param  {any} data - data
   * @param  {(object|undefined|any)} options - Options || disable [PREFIX]
   * @param {string} [options.level] - Log with custom log level
   * @param {bool} [noconvert] - Disable timestamp
   * @param {bool} [prefix] - Enable prefix
   * @returns {this} this
   */
    info(data, options = {}) {
        let out = data;
        if (typeof options === "object") { // It can be a number (0)/boolean (false)/string ('') etc.
            if (options.level && this.levels.indexOf(options.level) < 0) return this;
            if (!options.noconvert) out = Logger.convert(data);
            if(!this._noprefix || options.prefix) out = `[INFO]: ${out}`;
        }

        console.info(chalk.blue(out));
        this.callbacks.info(out);

        return this;
    }

    /**
   * Analog of info but green
   * @param  {any} data - data
   * @param  {(object|undefined|any)} options - Options || disable [PREFIX]
   * @param {string} [options.level] - Log with custom log level
   * @param {bool} [noconvert] - Disable timestamp
   * @param {bool} [prefix] - Enable prefix
   * @returns {this} this
   */
    success(data, options = {}) {
        let out = data;
        if (typeof options === "object") { // It can be a number (0)/boolean (false)/string ('') etc.
            if (options.level && this.levels.indexOf(options.level) < 0) return this;
            if (!options.noconvert) out = Logger.convert(data);
            if(!this._noprefix || options.prefix) out = `[SUCCESS]: ${out}`;
        }

        console.log(chalk.green(out));
        this.callbacks.success(out);

        return this;
    }
    /**
     * Add or replace log levels
     * @param  {(array|string)} levels - If set (array) or add (string) the level
     * @param {string} [options.level] - Log with custom log level
     * @param {bool} [noconvert] - Disable timestamp
     * @param {bool} [prefix] - Enable prefix
     * @returns {this} this
     */
    setLevels(levels) {
        if (levels instanceof Array) {
            this.levels = levels;
        } else if (typeof levels === "string") {
            this.levels.push(levels);
        } else {
            this.log(new Error("Levels must be a Array or String"));
        }

        return this;
    }

    /**
     * Remove log level
     * @param  {string} level - Level whitch you want to remove
     * @param {string} [options.level] - Log with custom log level
     * @param {bool} [noconvert] - Disable timestamp
     * @param {bool} [prefix] - Enable prefix
     * @returns {this} this
     */
    removeLevel(level) {
        const idx = this.levels.indexOf(level);

        if (idx >= 0) {
            this.levels.splice(idx, 1);
        }

        return this;
    }

    /**
     * Bind callback to the event
     * @param  {string} event - Event like log/error/success/warn etc.
     * @param  {function} callback - Function to bind to the event
     * @returns {this} this
     */
    setCallback(event, callback = () => {}) {
        if (!this.callbacks[event]) return this.log(new Error(`[LOGGER]: Invalid event ${event}`));
        this.callbacks[event] = callback;

        return this;
    }

    /**
     * Add timestamp and more modifications
     * @private
     * @static
     * @param {any} data - Data to convert
     */
    static convert(data) {
        let out = data;
        let error = null;

        if (out instanceof Error) {
            error = out;
            out = out.message;
        }

        if (typeof out === "object") {
            try {
                out = JSON.stringify(out);
            } catch (e) {
                // Ok...
            }
        }

        if (error) {
            console.error(error.stack); // Debug
        }

        return Logger.timestamp(out); //TODO: options.timestamp
    }

    
    /**
     * Add timestamp
     * @private
     * @static
     * @param {string} data - String
     */
    static timestamp(data) {
        return `[${Date.now()}] ${data}`;
    }

}

module.exports = new Logger();