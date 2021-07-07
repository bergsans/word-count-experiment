#!/bin/bash


echo "Imperative version"
time ./imperative-version.js | tail -n 1

echo "Fp version"
time ./fp-version.js | tail -n 1
