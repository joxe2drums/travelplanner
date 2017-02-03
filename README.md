# \<travelplaner\>

## Instalación

Para poder instalar Polymer CLI y descargar los componentes, debemos hacer lo siguiente:
1. Instalar [Git](https://git-scm.com/downloads).
2. Instalar la **versión LTS** de [Node.js](https://nodejs.org/es/download/).
3. Instalar la última versión de [Bower](https://bower.io/).
```
npm install -g bower
```
4. Instalar [Polymer CLI](https://www.npmjs.com/package/polymer-cli).
```
npm install -g polymer-cli
```

## Ver la aplicación

```
polymer serve
```

## Buildear la aplicación

```
polymer build
```

Esto creará una carpeta `build/` con las sub-carpetas `bundled/` y `unbundled/` que contienen las versiones empaquetadas (bundled) y desempaquetadas (unbundled), ambos con optimizaciones de HTML, CSS, y Javascript.

Puedes servir la versión buildeada indicando a `polymer serve` una carpeta desde la que servir:

```
polymer serve build/bundled
```

## Ejecutando Tests

```
polymer test
```

La aplicación está preparada para ser testeada via [web-component-tester](https://github.com/Polymer/web-component-tester). Ejecuta `polymer test` para ejecutar los test localmente.
