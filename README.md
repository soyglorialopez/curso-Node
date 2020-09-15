# Curso de Node

Backend con Express, una Api que cuenta con crear usuarios, login con  autenticacion con JWT, creacion de post  <br>
Ya que el proyecto es bastante relacional, y se trata de usarios que siguen a otros usuarios, y la creacion de post, utlizamos <br> 
como Base de Datos mysql <br>
Para mejor navegacion al usuario y accceso utilzamos redis, en la cual una vez que se consulto a la BD se guarda en la cache. <br> 
Hacemos uso de microservicios, y apartamos la BD, cache y post para que funcionen como servicos independientes y en la cual podamos comunicarnos con ellos.

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


 * Clona el proyecto

```
git clone https://github.com/soyglorialopez/curso-Node.git
```

* Intala las dependencias

```
npm install
```

* create una cuenta en remotemysql (si ya tienes instalado el motor mysl, no hay nencidad de este paso)   <br>
    -crea una Base de Datos  <br>
* Create una cuenta en redisLab <br>
    -crea una Base de Datos  <br>
   
## Haz correr el proyecto

Como tendras que levantar varios servidores hacemos uso de pm2
```
pm2 start api/index.js --name api-principal
```
```
pm2 start post/index.js --name servicio-post
```
```
pm2 start mysq/index.js --name servicio-DB
```
```
pm2 start cache/index.js --name servicio-cache
```
