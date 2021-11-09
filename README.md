# WALMART PALINDROMO
Líder quiere realizar una nueva campaña a través del sitio, pero esta ocasión quiere que sea
especial y que sea una sorpresa para sus clientes.
La campaña consiste en que cada vez que un cliente busque con un palíndromo, todos los
productos encontrados tendrán un **50%** de descuento, esta búsqueda aplica para
**identificadores (Id de Producto), marcas y descripciones de productos.**
## Instalacion y configuracion de ambiente con Docker

- *Importante: Version docker utilizada **20.10.8, build 3967b7d***
- *Todos los comandos mencionados a continuacion deben ser ejecutados en la raiz del repositorio y paso a paso*

### 1. Creacion de imagenes de imagenes

```
cd .
docker-compose build
```
Se espera la creacion de 3 imagenes:
* be-walmart-backend-container
* fe-walmart-backend-container
* db-walmart-backend-container

### 2. Ejecución de contenedores
```
docker-compose up -d
```

### 3. Cargar base de datos
```
docker exec db-walmart-backend-container bash -c './app/database/import.sh'
```

### 4. Acceso App Palindromo 🤖

Ingreso Front ✅:

http://127.0.0.1:80

Ruta de API ✅:

http://127.0.0.1:3000

### 5. Destruir ambiente (Utilizar al final de la revisión)
```
docker-compose down
```

