"use strict";
const readFileSync = require("fs").readFileSync;
const now =
  typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now
    : Date.now;

/**
 * Returns a random function that returns a number >= 0 and < 1
 * (>= 0 and <= 0.9999999999999999) using a xoroshiro128starstar PRNG.
 *
 * Its state initialized using the splitmix64 PRNG with the
 * specified double seed.
 *
 * This function can be used to replace Math.random.
 *
 * To get a uniform random int between 0-9 you would do
 * `Math.floor(next() * 10)` and if you want to be inclusive
 * of 10 you would do `Math.floor(next() * 11)`.  Do not use
 * `Math.round(next() * 10)` because this will split the
 * probability in half for 0 and 10.
 *
 * 2018 by David Blackman and Sebastiano Vigna (public domain)
 * http://xoshiro.di.unimi.it/xoroshiro128starstar.c
 *
 * 2015 by Sebastiano Vigna (public domain)
 * http://xoshiro.di.unimi.it/splitmix64.c
 *
 * @param {number} seed a number to seed the splitmix64 PRNG
 *                 used to initialize the 128 bit state.
 */
module.exports = function xoroshiro128starstar(seed) {
  const mod = new WebAssembly.Instance(
    new WebAssembly.Module(readFileSync(__dirname + "/assembly/index.wasm"))
  );
  const { initState, next } = mod.exports;
  if (typeof seed !== "number" || seed === 0) {
    seed = now();
  }
  initState(seed);
  return next;
};
