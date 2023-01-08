# BUSCADOR PALÍNDROMO

Cada vez que un usuario busque con un palíndromo, todos los
productos encontrados tendrán un **50%** de descuento, esta búsqueda aplica para **Identificadores (Id de Producto), marcas y descripciones de productos.**

## Stack de tecnologías
* **Backend**: NestJs --version 8.0.0
* **Fronted**: React --version 17.0.2
* **DB**: MongoDB
* **Test**: Jest, Enzyme (Componentes React)


## Instalación y configuración de ambiente con Docker

- *Importante: Versión docker utilizada **20.10.8, build 3967b7d***
- *Todos los comandos mencionados a continuación deben ser ejecutados en la raíz del repositorio y paso
por paso*

### 1. Creación de imágenes

```
cd .
$ docker-compose build
```
Se espera la creación de 3 imágenes:
* be-buscador-palindromo-image
* fe-buscador-palindromo-image
* mongo:3.6.8

### 2. Ejecución de contenedores
```
$ docker-compose up -d
```

### 3. Cargar base de datos
```
$ docker exec db-buscador-container bash -c './database/import.sh'
```

### 4. Ejecución de tests
Backend 
```
$ docker exec be-buscador-palindromo-container sh -c 'npm run test'
```
Fronted
```
$ docker exec fe-buscador-palindromo-container sh -c 'npm run test'
```

### 5. Acceso App Palíndromo 🤖

Ingreso Front ✅

http://127.0.0.1:3001

Ruta de API ✅

http://127.0.0.1:3000

### 6. Destruir ambiente (Utilizar al final de la revisión)
```
$ docker-compose down
```