
"localhost:3000/api/mysql/crear" //post
//Crea un registro en  mysql
const bodyPostExample = {
    "nombre": "Tomas Sanchez",
    "email": "tomas_sanchez@hotmail.com",
    "password": "123456",
    "rol": "ADMIN",
};

"localhost:3000/api/mysql/update" //put
//Actualiza un registro en mysql por id
const bodyPutExample = {
    "nombre": "Anita Juarez",
    "email": "patito@hotmail.com",
    "id": 4
};

"localhost:3000/api/mysql/" //get
//Selecciona todos los registros en mysql

"localhost:3000/api/mysql/getById?id=2"//get
//Selecciona un registro por id

"localhost:3000/api/mysql/delete"//delete
//borra un registro por id
const deleteBodyExample = {
    "id": 1
};

"localhost:3000/api/mysql/hacerOperacion"//POST
//Simula hacer una operacion siempre cuando el usuario tenga el rol de ADMIN en la db
const bodyPostExample2 = {
    "id": 7,
    "operacion": "tarea x"
};

//Instalar mysql con docker
"sudo docker run -d -p 3306:3307 --name mysql-test -e MYSQL_ROOT_PASSWORD=123456 mysql"