# Async
JavaScript library that streamlines real asynchronous code execution through use
of web workers.

## Usage
`async(action [, scope] [, args])` returns `Promise` instance

### Parameters
+ `action` - Function to be executed asynchronously. It's important to note
that the it needs to be serializable, so it all external references
__must__ be injected through either `scope` or `args` parameters.

+ `scope` - Scope of `this` within the action body. It must be JSON
serializable.

+ `args` - Arguments `Array` to be passed to the `action` call. All arguments
must also be JSON serializable.

### Returns
+ `Promise` instance - Resolves with return value of `action`. Rejects with
uncaught `Error` object.

## Examples

### Simple
```javascript
async(function () {
  return 'Hello World!'
})
.then(function (data) {
  console.log(data)
})
```
Prints `Hello World`

### With `scope` & `args`
```javascript
async(function (x, y) {
  return this.total + x * y
}, {total: 1}, [2, 3])
.then(function (result) {
  console.log(result)
})
```
Prints `7`

