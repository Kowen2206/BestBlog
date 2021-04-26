# Configuración de entorno de desarrollo de una app con react

En este archivo se especifican las tecnologías y configuración de un proyecto echo con react, redux y ssr con express.


## herramientas usadas:

- ##### Babel:
Es una herramienta que nos permite usar js moderno en navegadores antiguos.
esta es la configuración y los presets utilizados.

<pre>
npm install @babel/core @babel/preset-env @babel/preset-react --save-dev

{
  "presets": ["@babel/preset-env", @babel/preset-react]
}
</pre>


<pre>
{
  module: {
    rules: [
      {
        test: /\.m?js||jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ]
  }
}


</pre>

- ##### webpack:


- ##### react:

- ##### react-dom: