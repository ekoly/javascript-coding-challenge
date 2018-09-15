# Advanced

## Promise vs async...await

Please list the output of the following questions and briefly explain the result.

### async...await then Promise.resolve.then

```js
(async () => {
  await Promise.resolve(1)
  console.log('async')
})()
Promise.resolve().then(() => console.log('promise'));
```

### Promise.resolve.then inside async function

```js
(async () => {
  await Promise.resolve(1).then(() => console.log('promiseAsync'))
  console.log('async')
})()
Promise.resolve().then(() => console.log('promise'));
```

### Promise.resolve without await in async function

```js
Promise.resolve(1).then(console.log);

(async () => {
  const a = Promise.resolve(2);

  a.then(console.log);

  console.log('promiseAsync');
})();

Promise.resolve().then(() => console.log('promise'));
```

### Promise.all

```js
const a = Promise.resolve(1);

(async () => {
  const a = Promise.resolve(2);

  a.then(console.log);
  
  console.log('promiseAsync');
})();

const b = Promise.resolve(3);

Promise.all([a, b]).then(console.log);
```

### Promise.race

```js
const a = Promise.resolve(1);

(async () => {
  const a = Promise.resolve(2);
  
  a.then(console.log);
  
  console.log('promiseAsync');
})();

const b = Promise.resolve(3);

Promise.race([a, b]).then(console.log);
```

### setTimeout + Promise.resolve

```js
(async () => {
  await Promise.resolve(2).then(console.log);
  
  console.log('promiseAsync');
})();

setTimeout(() => Promise.resolve(3).then(console.log), 0);
```

😄 Good luck!
