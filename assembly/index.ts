let s0: u64;
let s1: u64;

// splitmix64
// 2015 by Sebastiano Vigna (public domain)
// http://xoshiro.di.unimi.it/splitmix64.c
function splitmix64(seed: u64): u64 {
  seed += 0x9e3779b97f4a7c15;
  seed = (seed ^ (seed >> 30)) * 0xbf58476d1ce4e5b9;
  seed = (seed ^ (seed >> 27)) * 0x94d049bb133111eb;
  return seed ^ (seed >> 31);
}

// Initialize state using splitmix64 using a double as the seed
export function initState(seed: f64): void {
  s0 = splitmix64(reinterpret<u64>(seed));
  s1 = splitmix64(s0);
}

// Random between 0 and 9007199254740991 inclusive.
// 9007199254740991 == Number.MAX_SAFE_INTEGER
@inline
function nextUint53(): f64 {
  return <f64>(nextUint64() >> 11);
}

// Random between 0 and 0.9999999999999999 inclusive.
// This matches Math.random() >= 0 and < 1.
// A uniform random between 0-9 would be `Math.floor(next() * 10)`
// To be inclusive of 10 you would do `Math.floor(next() * 11)`. Don't
// use `Math.round(next() * 10)` as it will split the probability between
// 0 and 10.
export function next(): f64 {
  // MAX_SAFE_INTEGER == 9007199254740991
  // 9007199254740992 would be 1.0
  // 9007199254740991 / 9007199254740992 == 0.9999999999999999
  // 2^-53 == 1 / 9007199254740992 == 1.1102230246251565e-16
  return nextUint53() * 1.1102230246251565e-16;
}

// Random u64 using xoroshiro128starstar
// 2018 by David Blackman and Sebastiano Vigna (public domain)
// http://xoshiro.di.unimi.it/xoroshiro128starstar.c
@inline
function nextUint64(): u64 {
  let _s0 = s0;
  let _s1 = s1;

  let result = rotl<u64>(_s0 * 5, 7) * 9;

  _s1 ^= _s0;
  _s0 = rotl<u64>(_s0, 24) ^ _s1 ^ (_s1 << 16); // a, b
  _s1 = rotl<u64>(_s1, 37); // c

  s0 = _s0;
  s1 = _s1;

  return result;
}
