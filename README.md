Przygotowanie środowiska do projektu:

1 Stworzenie folderu z projektem:   mkdir my-webapp && cd my-webapp

2 Inicjalizacja npm'a:  npm init -y

3 Zdefiowanie zaleznosci:   npm install --save express

4 Stworzenie pliku: src/index.js

    4.1 Otwórz plik index.js

    4.2 Import bibioteki: const express = require('express'); 

    4.3 Inicjalizacja aplikacji: const app = express();

    4.4 Zdefioniowanie handler'ów:

            app.get('/', (request, response, next) => {
                console.log(request.headers);

                response.json({'message': 'HELLO INCODE 22222!'});
            })

            app.get('/karolina', (request, response, next) => {
                console.log(request.headers);

                response.json({'message': 'totalnie inna odpowiedź!'});
            })

    4.5 Ustawienie portu nasłuchiwania: 
            
            app.listen(3000,() => {
                console.log('http://localhost:3000/');
                }
            )

5 Instalacja nodemon:  npm i --save-dev nodemon

6 Podmienić teks w pliku package.json ze "scripts": {"test": "..."} na:

            "scripts": {
                "start": "node src/index.js",
                "start:watch": "nodemon src/index.js"
            },