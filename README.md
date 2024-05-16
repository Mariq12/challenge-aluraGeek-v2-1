# <p align="center">Challenge AluraGeek</p>

## Objetivo del Desafío
En este desafío se desarrollará una aplicación para:
* listar productos
* registrar productos
* eliminar productos

## Métodos HTTP utilizados:
* GET: para listar productos
* POST: para registrar productos
* DELETE: para eliminar productos
---
## Principales Tecnologías utilizadas
* HTML5
* CSS3
* JAVASCRIPT
---
## Tecnologías secundaria
* Node.js y npm (incluyendo node_modules)
* JSON Server (db.json para simular API)
* VsCode
* Git
* GitHub
---
## Herramientas de Gestión y Diseño
* **Trello:** herramienta de colaboración y gestión de proyectos.
* **Figma:**  se creo un modelo que muestra una representación visual del Alura Geek.
---
## Comandos utilizados
Se ejecuta los siguientes comando:

    1. npm init

*Se puede ejecutar el comando `npm init -y` para no tener que ingresar los datos.*

---
    2. Crear archivo db.json:

        2.1. Crear una carpeta database
        2.2. Crear dentro de database un archivo db.json

            {
                "products": [
                    {
                        "name": "Laptop Notebook HP 350",
                        "price": "1300",
                        "image_url": "https://i5.walmartimages.com/asr/57bb38e9-90a1-4532-8f4b-0e76e4538846.b8710b156887abf438daa8aa6905b47d.jpeg",
                        "id": 1
                    }
                ]
            }
---
    3. npm install json-server
Se crea el archivo **node_modules** y dentro del **package.json** se agrega la siguiente dependencia:

        "json-server": "^1.0.0-beta.0"
---
    4. npx json-server --watch db.json --port 3000

*Sin embargo, se puede modificar el package.json agregando en el campo scripts el siguiente script:*

            "start": "npx json-server --watch database/db.json --port 3000"

Con este cambio, simplemente se inicia el servidor JSON ejecutando:

           npm start

Este comando levantará el servidor JSON y observará el archivo db.json en el puerto 3000.

---
##
        
