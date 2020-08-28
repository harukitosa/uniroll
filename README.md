# uniroll

Opinionated in browser compiler.

demo https://focused-raman-3ce115.netlify.com/

## Run in browser

```
npm install uniroll --save
```

```js
import { compile } from "uniroll";
const files = {
  "/foo.tsx": "export default 1",
  "/index.tsx": "import foo from 'foo';\nconsole.log('hello', foo)",
};
const bundle = await compile({
  files,
  input: "/index.tsx",
});
const out = await bundle.generate({ format: "esm" });
console.log(out.output[0]);
```

## via CDN

```html
<script
  async
  src="https://cdn.jsdelivr.net/npm/uniroll@2.0.0/dist/uniroll.js"
></script>
<script>
  Uniroll.compile({...})
</script>
```

## Example: import npm registry

```tsx
import { h, render } from "preact";
import { styled, setPragma } from "goober";

setPragma(h);

const PopupWrapper = styled("div")`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 200px;
  height: 100px;
  background-color: wheat;
`;

function Popup() {
  return <PopupWrapper>Hello!</PopupWrapper>;
}

const el = document.createElement("div");
render(<Popup value={text} />, el);
document.body.appendChild(el);
```

## Run in node

Run compiler with same logics.

```bash
$ npm install uniroll-tools -g
$ uniroll foo.js --out out.js
```

## How it works

- mount files on virtual fs with `memfs`: `rollup-plugin-memfs`
- transform with `@babel/preset-env`, `@babel/preset-typescript` and `uniroll/packages/babel-plugin-transform-import-to-skypack-cdn`
- load npm modules with `ev` via `uniroll/packages/rollup-plugin-skypack-cdn-resolver`
- resolve ext with `.js` `.ts` `.tsx` `.json` `.mjs`
- transform `.css` with `uniroll/packages/rollup-plugin-uniroll-css`(like style-loader, css-loader);
- compile as `rollup(...)` and return `RollupOutput` object

## Chrome Extension

![](https://i.gyazo.com/2654174b726b6d396cfdec004cb42199.gif)

1. Check if your Node.js version is >= 12.
2. Clone this repository.
3. Install [yarn](https://yarnpkg.com/lang/en/docs/install/).
4. Run `yarn build`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `packages/uniroll-extension/build` folder.
6. Have fun.

See detail

- [Webpack docs](https://webpack.js.org)
- [Chrome Extension](https://developer.chrome.com/extensions/getstarted)

## How to develop

```
yarn workspace uniroll-ui demo
```

## LICENSE

MIT

- Kotaro Chikuba ~ [@mizchi](https://twitter.com/mizchi)
