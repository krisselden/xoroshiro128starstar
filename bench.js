/* globals: mathrandom, wasmrandom, seedrandom, freq, gc */
mathrandom = Math.random;
wasmrandom = require("./index")(1234567);
seedrandom = require("seedrandom")("hello.");

// ensure we do the same test, and name === function
function bench(name) {
  return {
    name: `${name} (0 <= int < 10)`,
    onStart: () => {
      if (typeof gc === "function") gc();
      freq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    },
    onComplete: () => {
      // check counts uniformly distributed
      console.log("frequency");
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
