#!/bin/bash

echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > ~/.npmrc
echo "@sivaraj-v:registry=https://npm.pkg.github.com" >> ~/.npmrc
./node_modules/.bin/lerna publish from-git --yes