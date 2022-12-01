# ISI Technology - project implementation
***
_This repository contains the base structure for the development of projects of the company isi techonolgy based on NodeJs and express, it contains an executable file [batch] that automatically performs the installation of the necessary requirements for a basic project._
#
_Este repositorio contiene la estructura base para el desarrollo de proyectos de la empresa isi tecnología basada en NodeJs y express, contiene un archivo ejecutable [batch] que automáticamente realiza la instalación de los requisitos necesarios para un proyecto básico._


[![Build Status](https://img.shields.io/badge/estado-en%20preparaci%C3%B3n-orange)](https://github.com/cristianvr/OS-TARGET-ZERO)

## 📖 Instructions for use:
##### 1. Run the initProject.bat file and a terminal will open asking for the path where the project will be created. enter it. 
##### ejemplo: _C:\Users\usuario\Documents\ISI\MyNewProject_
#
##### 2. press enter
#
##### 3. Your project is ready with all the necessary basic dependencies.
#
#
## 💻📍 Start local server:
***
local server for development
```
$ npm run dev
```
* _Under the basic configuration the server will start on port 3000, this parameter can be edited_
* _Bajo la configuración básica, el servidor comenzará en el puerto 3000, este parámetro se puede editar_

## 🔨 WebPack - Development
* _Empaquetar script front-end en modo desarrollo_
* _Package front-end script in development mode_
***
```
$ npm run build:dev    
```
## 🔨 WebPack - Production
* _Empaquetar scripts front-end en modo producción_
* _Packaging front-end scripts in production mode_
***
```
$ npm run build    
```
## 💻🛑 Start WebPack Server
* _Iniciar servidor WebPack_
***
```
$ npm run start    
```
## 💻🔨 
## Start server in folder resulting from the compilation of the project with webpack
* _Iniciar servidor en carpeta resultante de la compilación del proyecto con webpack_
***
```
$ npm run dev:buildProject    
```
## 🚩 
* _El package.json contiene una confirgacion "type":"module" lo que facilita la importación de modulos en los diferentes scripts, este parametro crea incompatibilidad con los scripts de configuración de webpack  [webpack.prod.js, webpack.config.js] por lo que es necesario editar la configuración y editar la variable por "type":"commonJs", de igual forma se debe volver a la configuración iniciar para correr el servidor local con express ["type":"module"]._
#
* _El package.json contiene una confirmación "type":"module" lo que facilita la importación de módulos en los diferentes scripts, este parámetro crea incompatibilidad con los scripts de configuración de webpack [webpack.prod.js, webpack.config.js] por lo que es necesario editar la configuración y editar la variable por "type":"commonJs", de igual forma se debe volver a la configuración iniciar para correr el servidor local con express ["type":"module"]._
