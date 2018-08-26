/* globals: mathrandom, wasmrandom, seedrandom, freq, gc */
mathrandom = Math.random;
wasmrandom = require("./index")(1234567);
seedrandom = require("seedrandom")("hello.");

/*
➜  xoroshiro128starstar git:(master) ✗ node --version
v10.3.0
➜  xoroshiro128starstar git:(master) ✗ node --expose-gc bench.js
testing
- wasmrandom
- mathrandom
- seedrandom
running first test, please wait...
[ '0: 42146182',
  '1: 42148386',
  '2: 42153646',
  '3: 42144405',
  '4: 42144909',
  '5: 42158476',
  '6: 42148614',
  '7: 42158866',
  '8: 42159396',
  '9: 42157740' ]
  wasmrandom ... 81,378,360.44 op/s
[ '0: 37542836',
  '1: 37539301',
  '2: 37535161',
  '3: 37529417',
  '4: 37537757',
  '5: 37531666',
  '6: 37534126',
  '7: 37525276',
  '8: 37530273',
  '9: 37534915' ]
  mathrandom ... 73,710,609.62 op/s
[ '0: 12522212',
  '1: 12514140',
  '2: 12514547',
  '3: 12522859',
  '4: 12514075',
  '5: 12514475',
  '6: 12515543',
  '7: 12515380',
  '8: 12512982',
  '9: 12522182' ]
  seedrandom ... 24,012,405.56 op/s
fastest: wasmrandom
 */

// ensure we do the same test, and name === function
function bench(name) {
  return {
    name,
    onStart: () => {
      if (typeof gc === "function") gc();
      freq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    },
    onComplete: () => {
      // check counts uniformly distributed
      console.log(freq.map((count, i) => `${i}: ${count}`));
    },
    fn: `freq[(${name}() * 10) | 0]++;`
  };
}

require("do-you-even-bench")([
  bench("wasmrandom"),
  bench("mathrandom"),
  bench("seedrandom")
]);
