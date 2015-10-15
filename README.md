# Express module for Microframework

Adds integration between [express.js](http://expressjs.com) and [microframework](https://github.com/PLEEROCK/microframework).

## Usage

Simply register module in the microframework when you are bootstrapping it.

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

## Todos

* cover with tests
* add more docs