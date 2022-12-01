echo ***********Creando proyecto, ISI Tecnology***********
set /p "projectPath=Ingrese el path o ruta donde se creara el proyecto: "
echo %projectPath%/src
copy package.json %projectPath%
copy webpack.config.js %projectPath%
copy webpack.prod.js %projectPath%
xcopy src %projectPath%\src /E/H/C/I

cd %projectPath%

git init && npm install --save-dev

echo fin de la ejecucion, su proyecto esta listo para usar

:End
PAUSE