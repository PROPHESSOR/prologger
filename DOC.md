<a name="Logger"></a>

## Logger
**Kind**: global class  

* [Logger](#Logger)
    * [.log(data, options)](#Logger+log) ⇒ <code>object</code>
    * [.warn(data, options)](#Logger+warn) ⇒ <code>object</code>
    * [.error(data, options)](#Logger+error) ⇒ <code>object</code>
    * [.info(data, options)](#Logger+info) ⇒ <code>object</code>
    * [.success(data, options)](#Logger+success) ⇒ <code>object</code>
    * [.setLevels(levels)](#Logger+setLevels) ⇒ <code>object</code>
    * [.removeLevel(level)](#Logger+removeLevel) ⇒ <code>object</code>
    * [.setCallback(event, callback)](#Logger+setCallback) ⇒ <code>object</code>

<a name="Logger+log"></a>

### logger.log(data, options) ⇒ <code>object</code>
Advance console.log

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |

<a name="Logger+warn"></a>

### logger.warn(data, options) ⇒ <code>object</code>
Advance console.warn

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |

<a name="Logger+error"></a>

### logger.error(data, options) ⇒ <code>object</code>
Advance console.error

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |

<a name="Logger+info"></a>

### logger.info(data, options) ⇒ <code>object</code>
Advance console.info

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |

<a name="Logger+success"></a>

### logger.success(data, options) ⇒ <code>object</code>
Analog of info but green

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |

<a name="Logger+setLevels"></a>

### logger.setLevels(levels) ⇒ <code>object</code>
Add or replace log levels

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| levels | <code>array</code> \| <code>string</code> | If set (array) or add (string) the level |

<a name="Logger+removeLevel"></a>

### logger.removeLevel(level) ⇒ <code>object</code>
Remove log level

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | Level whitch you want to remove |

<a name="Logger+setCallback"></a>

### logger.setCallback(event, callback) ⇒ <code>object</code>
Bind callback to the event

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>object</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event like log/error/success/warn etc. |
| callback | <code>function</code> | Function to bind to the event |

