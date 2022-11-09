# Vite Plugin VEXT
A plugin to automatically build your vuic file for Venice Unleashed

## Installation
With npm
```
npm install --save-dev vite-plugin-vext
```

With yarn
```
yarn -D vite-plugin-vext
```

## Usage
When installing the VEXT plugin it will automatically download the latest vuicc.exe, so you don't have to download it.
The usage of this plugin is simple, it is just a regular Vite plugin and can be used as follows:
```js
// vite.config.ts
import { defineConfig } from 'vite'

import vext from 'vite-plugin-vext';

export default defineConfig({
  plugins: [vext()],
})
```