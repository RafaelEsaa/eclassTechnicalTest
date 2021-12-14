## _Prueba tecnica eclass_

## Ejercicio Spotify
Antes de iniciar el proyecto hay que agregar el proyecto a spotifyDeveloper y asi obtener el clientId, secret y redirect uri
## Backend
1- En el archivo .env agregar las variables que se encuentran en el .env.example con los respectivos datos a llevar que seran los que se obtendran de spotifyDeveloper
2- Levantar el proyecto con el siguiente comando, el proyecto levantara en el puerto 9000
```sh
npm run dev
```

## Frontend
1- En el archivo .env agregar las variables que se encuentran en el .env.example con los respectivos datos a llevar que seran los que se obtendran de spotifyDeveloper y la url del backend que sera: http://localhost:9000
> Nota: `IMPORTANTE` que el redirect que se configure en el spotifyWeb debe ser el mismo que se tomo al levantar el proyecto frontend luego de correr el script. Si el frontend levanto con http://localhost:5001, ese debe ser el que se debe agregar en spotifyDeveloper.

```sh
npm run start
```

## Ejercicio 2
El componente ListNicknames.js se encuentra en la carpeta de componentes