# Schedule webapp

A web application for the Mr Coffee website to run a work schedule.

## Description

An application created for educational purposes.

## Getting Started

### Dependencies

You will need:
* node.js and a node global package
* frameworks/libraries:
    - "express" version: "^4.17.3",
    - "js-sha256" version: "^0.9.0",
    - "mustache-express" verstion: "^1.3.2"

### Installing

```
    $ git clone git@github.com:pl-incode/mr-coffee-backend-glasscandy.git
    $ cd mr-coffee-backend-glasscandy
    $ npm init -y
    $ npm install --save express
    $ npm install joi --save
    $ npm install nodemon --save-dev
    $ npm install js-sha256 --save
    $ npm i --save mustache-express
```

### Executing program

```
    $ cd mr-coffee-backend-glasscandy
    $ node src/index.js
    or
    $ npx nodemon src/index.js
```