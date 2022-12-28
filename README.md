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
* _Under the basic configuration the server will start on port 8080, this parameter can be edited_
* _Bajo la configuración básica, el servidor comenzará en el puerto 8080, este parámetro se puede editar_

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
$ npm run start-webpack    
```
## 💻🔨 
## Start server in folder resulting from the compilation of the project with webpack
* _Iniciar servidor en carpeta resultante de la compilación del proyecto con webpack_
***
```
$ npm run devBuildProject
```
## 🚩 
* _The package.json contains a "type":"module" config which makes it easy to import modules into different scripts, this parameter creates incompatibility with webpack configuration scripts [webpack.prod.js, webpack.config.js] so it is necessary to edit the configuration and edit the variable by "type":"commonJs", in the same way you must return to the configuration start to run the local server with express ["type":"module"]._
#
* _El package.json contiene una confirmación "type":"module" lo que facilita la importación de módulos en los diferentes scripts, este parámetro crea incompatibilidad con los scripts de configuración de webpack [webpack.prod.js, webpack.config.js] por lo que es necesario editar la configuración y editar la variable por "type":"commonJs", de igual forma se debe volver a la configuración iniciar para correr el servidor local con express ["type":"module"]._

## 💻 
## Start server in folder resulting from the compilation of the project with webpack (dist) used for deploy on Google Cloud
* _Iniciar servidor en carpeta resultante de la compilación del proyecto con webpack (dist) es usado para el despliegue en Google Cloud_
***
```
$ npm run start   
```

## 🆕 Deploy on Google Cloud
* Despliegue en Google Cloud
### For deployment on Google Cloud it is important to download and install the Google Cloud Console SDK.
* Para el despliegue en Google Cloud es importante descargar e instalar el SDK Google Cloud Console.

🚩 Antes de desplegar, recuerde modificar nuevamente el packcage.json y parametrizar _"type":"module"_ 
* Before deploying, remember to modify the packcage.json again and parameterize _"type":"module"_

🚩 Tenga en cuenta que solo se subirán los archivos almacenados en la carpeta (dist)
* Please note that only files stored in the (dist) folder will be uploaded


Ubiquese en la carpeta del proyecto y ejecute el comando:
* Go to the project folder and run the command:
```
gcloud app deploy
```
_Siga las instrucciones mostradas en la consola._
* _Follow the instructions displayed on the console._
#
* 🛑El archivo app.yaml puede ser editado segun su necesidad.
* The app.yaml file can be edited as per your need.
#
* 🛑Para efectos del despliegue es importante que el servidor escuche las conexiones en el puerto 8080.
* For deployment purposes it is important that the server listens for connections on port 8080