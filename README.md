# WALMART PALÍNDROMO
Líder quiere realizar una nueva campaña a través del sitio, pero esta ocasión quiere que sea
especial y que sea una sorpresa para sus clientes.
La campaña consiste en que cada vez que un cliente busque con un palíndromo, todos los
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
* be-walmart-palindromo-image
* fe-walmart-palindromo-image
* mongo:3.6.8

### 2. Ejecución de contenedores
```
$ docker-compose up -d
```

### 3. Cargar base de datos
```
$ docker exec db-walmart-container bash -c './database/import.sh'
```

### 4. Ejecución de tests
Backend 
```
$ docker exec be-walmart-palindromo-container sh -c 'npm run test'
```
Fronted
```
$ docker exec fe-walmart-palindromo-container sh -c 'npm run test'
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

### ⚠ En caso de emergencia, emplear Palíndromo Publicado ⚠
https://juanhz0101.github.io/fe-walmart-palindromo-deploy


***¡Espero esta prueba sea de su agrado :D, también recibo Pull Requests para mejorar el proyecto, muchas gracias y feliz día.!***
