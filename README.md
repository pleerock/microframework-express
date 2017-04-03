> This repository is deprecated. Microframework architecure has changed. Please consider writing your own module for a newer versions of microframework.

# Express module for Microframework

Adds integration between [express.js](http://expressjs.com) and [microframework](https://github.com/pleerock/microframework).

## Usage

1. Install module:

    `npm install microframework-express --save`

2. Simply register module in the microframework when you are bootstrapping it.

    ```typescript
        import {MicroFrameworkBootstrapper} from "microframework/MicroFrameworkBootstrapper";
        import {ExpressModule} from "microframework-express/ExpressModule";

        new MicroFrameworkBootstrapper({ baseDirectory: __dirname })
            .registerModules([
                new ExpressModule()
            ])
            .bootstrap()
            .then(result => console.log('Module is running. Open localhost:3000'))
            .catch(error => console.error('Error: ', error));
    ```

3. ES6 features are used, so you may want to install [es6-shim](https://github.com/paulmillr/es6-shim) too:

    `npm install es6-shim --save`

    you may need to `require("es6-shim");` in your app.

## Todos

* cover with tests
* add more docs
