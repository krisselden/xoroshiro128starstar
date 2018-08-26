# xoroshiro128starstar

A WebAssembly port of [xoroshiro128starstar.c](http://xoshiro.di.unimi.it/xoroshiro128starstar.c)
using [AssemblyScript](http://assemblyscript.org/).

Uses 2 u64 globals for the state so the WebAssembly module does not allocate any
pages of memory and is only 262 bytes.

## Install

```sh
npm install xoroshiro128starstar
```

## Usage

### Using with random

```js
const random = require("random");
const SEED = 12345;
random.use(require("xoroshiro128starstar")(SEED));

// log normal distributed random variable
// mu = 0 and sigma = 1
random.logNormal(0, 1);
```

### Math.random replacement

```js
const SEED = 12345;
const Math.random = require("xoroshiro128starstar")(SEED);

function randomInt(start, end) {
  return (Math.random() * (end - start + 1) + start) | 0;
}

// returns a uniform random between 0 and 100 inclusive.
randomInt(0, 100);
```
