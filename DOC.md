<a name="Logger"></a>

## Logger
**Kind**: global class  

* [Logger](#Logger)
    * [.noprefix](#Logger+noprefix) : <code>boolean</code>
    * [.log(data, options, [noconvert], [prefix])](#Logger+log) ⇒ <code>this</code>
    * [.warn(data, options, [noconvert], [prefix])](#Logger+warn) ⇒ <code>this</code>
    * [.error(data, options, [noconvert], [prefix])](#Logger+error) ⇒ <code>this</code>
    * [.info(data, options, [noconvert], [prefix])](#Logger+info) ⇒ <code>this</code>
    * [.success(data, options, [noconvert], [prefix])](#Logger+success) ⇒ <code>this</code>
    * [.setLevels(levels, [noconvert], [prefix])](#Logger+setLevels) ⇒ <code>this</code>
    * [.removeLevel(level, [noconvert], [prefix])](#Logger+removeLevel) ⇒ <code>this</code>
    * [.setCallback(event, callback)](#Logger+setCallback) ⇒ <code>this</code>

<a name="Logger+noprefix"></a>

### logger.noprefix : <code>boolean</code>
Disable prefix by default

**Kind**: instance property of [<code>Logger</code>](#Logger)  
**Access**: public  
<a name="Logger+log"></a>

### logger.log(data, options, [noconvert], [prefix]) ⇒ <code>this</code>
Advance console.log

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>this</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |
| [options.level] | <code>string</code> | Log with custom log level |
| [noconvert] | <code>bool</code> | Disable timestamp |
| [prefix] | <code>bool</code> | Enable prefix |

<a name="Logger+warn"></a>

### logger.warn(data, options, [noconvert], [prefix]) ⇒ <code>this</code>
Advance console.warn

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>this</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |
| [options.level] | <code>string</code> | Log with custom log level |
| [noconvert] | <code>bool</code> | Disable timestamp |
| [prefix] | <code>bool</code> | Enable prefix |

<a name="Logger+error"></a>

### logger.error(data, options, [noconvert], [prefix]) ⇒ <code>this</code>
Advance console.error

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>this</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |
| [options.level] | <code>string</code> | Log with custom log level |
| [noconvert] | <code>bool</code> | Disable timestamp |
| [prefix] | <code>bool</code> | Enable prefix |

<a name="Logger+info"></a>

### logger.info(data, options, [noconvert], [prefix]) ⇒ <code>this</code>
Advance console.info

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>this</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |
| [options.level] | <code>string</code> | Log with custom log level |
| [noconvert] | <code>bool</code> | Disable timestamp |
| [prefix] | <code>bool</code> | Enable prefix |

<a name="Logger+success"></a>

### logger.success(data, options, [noconvert], [prefix]) ⇒ <code>this</code>
Analog of info but green

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>this</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | data |
| options | <code>object</code> \| <code>undefined</code> \| <code>any</code> | Options || disable [PREFIX] |
| [options.level] | <code>string</code> | Log with custom log level |
| [noconvert] | <code>bool</code> | Disable timestamp |
| [prefix] | <code>bool</code> | Enable prefix |

<a name="Logger+setLevels"></a>

### logger.setLevels(levels, [noconvert], [prefix]) ⇒ <code>this</code>
Add or replace log levels

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>this</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| levels | <code>array</code> \| <code>string</code> | If set (array) or add (string) the level |
| [options.level] | <code>string</code> | Log with custom log level |
| [noconvert] | <code>bool</code> | Disable timestamp |
| [prefix] | <code>bool</code> | Enable prefix |

<a name="Logger+removeLevel"></a>

### logger.removeLevel(level, [noconvert], [prefix]) ⇒ <code>this</code>
Remove log level

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>this</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | Level whitch you want to remove |
| [options.level] | <code>string</code> | Log with custom log level |
| [noconvert] | <code>bool</code> | Disable timestamp |
| [prefix] | <code>bool</code> | Enable prefix |

<a name="Logger+setCallback"></a>

### logger.setCallback(event, callback) ⇒ <code>this</code>
Bind callback to the event

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: <code>this</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event like log/error/success/warn etc. |
| callback | <code>function</code> | Function to bind to the event |

