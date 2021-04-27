# Configuración del entorno de desarrollo

En este archivo se especifican las tecnologías y configuración de este proyecto echo con react, redux y ssr con express.


## herramientas usadas:

- ## Babel:
Es una herramienta que nos permite usar js moderno en navegadores antiguos.
esta es la configuración y los presets utilizados.
- ### loaders:
- ##### html-loader:
Convierte nuestros archivos js en strings y cambia los
`<img src="./img/my-image.jpg">`
por
	`<img src="${require( ./ img/my-image.jpg )}" />`.
- ##### sass-loader:
Nos permite trabajar con archivos .sass importandolos directamente en nuestros archivos.js


- ### plugins:
- ##### HtmlWebpackPlugin:
Es un plugin para inyectar javascript, css, favicons, y nos facilita la tarea de enlazar los bundles a nuestro template

<pre>
npm install @babel/core @babel/preset-env @babel/preset-react --save-dev

{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
</pre>


<pre>
{
  module: {
    rules: [
    {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
               loader: 'babel-loader',
              },
            },
    ]
  }
}


</pre>

- ##### webpack:


- ##### react:

- ##### react-dom: