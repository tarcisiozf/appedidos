#!/bin/bash

rm scripts/build.js

echo "'use strict';" >> scripts/build.js
echo "window.onload = function () {" >> scripts/build.js

cat scripts/pages.js >> scripts/build.js
cat scripts/products.js >> scripts/build.js
cat scripts/main.js >> scripts/build.js

echo "}" >> scripts/build.js

babel --presets es2015 scripts/build.js -o scripts/build.js