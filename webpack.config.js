## Webpack


#### eslint

- `npm init`
- install `eslint` => `npm install eslint -g`
- init configurations for `eslint` => `eslint --init`
- add `"comma-dangle": ["error", "never"]` under `rules` in `.eslint.json` file


#### Webpack

- install webpack => `npm i --save-dev webpack webpack-cli`
- under scripts in `package.json`
```js
"scripts": {
  "build-dev": "webpack -d --watch --mode development",
  "build-prod": "webpack --mode production"
}
```

#### Dev server
- `npm install webpack-dev-server --save-dev`
- add to scripts
```js
"scripts": {
  "start": "webpack-dev-server"
}
```
- add to webpack config file
```js
devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
```

#### HTML Plugin
- install htmlplugin => `npm i --save-dev html-webpack-plugin`
- add `const HtmlWebpackPlugin = require('html-webpack-plugin');` in top of `webpack.config.js`
- add this under plugins: [...] in `webpack.config.js`
```js
plugins: [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
  }),
]
```


#### CSS

- install `css-loader && style-loader` => `npm install --save-dev css-loader style-loader`
- include loader in `webpack.config.js` by adding a new rule => `{test: /\.css$/i, use: ['style-loader!css-loader']}`
- import css file `import css from 'file.css';`

##### MiniCssExtractPlugin:
- install -> `npm install --save-dev mini-css-extract-plugin`
- add `const MiniCssExtractPlugin = require('mini-css-extract-plugin');` top webpack config
- under plugins in webpack config add:
```js
new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
  ignoreOrder: false
}),
```
- add it first to list of css loaders and replace it with `style-loader`:
```
{
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
  ]
}
```


**Sass**
- `npm install sass-loader node-sass --save-dev`
- chain `sass-loader` with `css-loader` and `style-loader` at the **end** and change the regex to `/\.s[ac]ss$/i`
- import `import './style.scss'`
- to make seperate bundle for css files, you need `mini-css-extract-plugin`

**TailwindCSS**
- `npm install tailwindcss postcss-cli autoprefixer`
- install postcss loader => `npm i -D postcss-loader`
- create tailwind config file => `npx tailwind init`
- to generate full config file => `npx tailwind init tailwindcss-config.js --full`
- create `postcss.config.js`
- put this code inside it:
```js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
```
- add `post-css` loader to css files
- include tailwind classes into your css file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

##### Files and images

- install file loader => 'npm i --save-dev file-loader'
- For example `images`:
```js
{
  test: /\.(jpe?g|png|svg|gif)/,
  loader: 'file-loader',
  options: {
    name: 'images/[name].[ext]'
  }
}
```
-  For examle `fonts`:
```js
{
  test: /\.(ttf|woff|otf|gsv)/,
  loader: 'file-loader',
  options: {
    name: 'fonts/[name].[ext]'
  }
}
```

- install -> `npm install image-webpack-loader --save-dev`
- append the loader with optimizing and compression options:
```js
{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
  ],
}
```
