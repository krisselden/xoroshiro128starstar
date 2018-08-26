- [xoroshiro128starstar](#xoroshiro128starstar)
  - [Install](#install)
  - [Usage](#usage)
    - [Using with random](#using-with-random)
    - [Seeded Math.random replacement](#seeded-mathrandom-replacement)
  - [Benchmark](#benchmark)

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

### Seeded Math.random replacement

```js
const SEED = 12345;
const Math.random = require("xoroshiro128starstar")(SEED);

function randomInt(start, end) {
  return (Math.random() * (end - start + 1) + start) | 0;
}

// returns a uniform random between 0 and 100 inclusive.
randomInt(0, 100);
```

## Benchmark

[bench.js](./bench.js)

```sh
➜  xoroshiro128starstar git:(master) ✗ node --version
v10.3.0
➜  xoroshiro128starstar git:(master) ✗ node --expose-gc bench.js
testing
- wasmrandom (0 <= int < 10)
- mathrandom (0 <= int < 10)
- seedrandom (0 <= int < 10)
running first test, please wait...
frequency
[ '0: 41069751',
  '1: 41073989',
  '2: 41078799',
  '3: 41070726',
  '4: 41072933',
  '5: 41084158',
  '6: 41074424',
  '7: 41084506',
  '8: 41084073',
  '9: 41083843' ]
  wasmrandom (0 <= int < 10) ... 81,321,598.18 op/s
frequency
[ '0: 37063747',
  '1: 37079010',
  '2: 37069394',
  '3: 37063328',
  '4: 37062678',
  '5: 37069730',
  '6: 37068098',
  '7: 37068668',
  '8: 37066801',
  '9: 37058401' ]
  mathrandom (0 <= int < 10) ... 73,658,101.35 op/s
frequency
[ '0: 11982125',
  '1: 11982173',
  '2: 11981276',
  '3: 11980644',
  '4: 11984042',
  '5: 11983492',
  '6: 11986362',
  '7: 11977713',
  '8: 11986711',
  '9: 11982949' ]
  seedrandom (0 <= int < 10) ... 24,057,933.98 op/s
fastest: wasmrandom (0 <= int < 10)
```
