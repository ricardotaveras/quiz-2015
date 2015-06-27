var path = require('path');

// Postgres DATABASE_URL = postgres://user:passw@host:port/database
// SQLite 	DATABASE_URL = sqlite://:@:/
process.env.DATABASE_URL = 'sqlite://:@:/';
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name		= (url[6]||null);
var user		= (url[2]||null);
var pwd			= (url[3]||null);
var protocol	= (url[1]||null);
var dialect		= (url[1]||null);
var port		= (url[5]||null);
var host		= (url[4]||null);
var storage		= 'quiz.sqlite'; //process.env.DATABASE_STORAGE;

//Cargar modulo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd,
	{dialect: dialect,
	port: 	  port,
	host: 	  host,
	protocol: protocol,
	storage:  storage,
	omitNull: true
	}
);

// Importar la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definici�n de la tabla Comment
var comment_path = path.join(__dirname, 'comments');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // Exportar la definicion de la tabla Quiz
exports.Comment = Comment; // Exportar la tabla Comment

// sequelize.sync() crea e inicializa tabla de preguntas dn DB
sequelize.sync().then(function() {
	// then(..) ejecuta el manejador de una vez creada la tabla
	Quiz.count().then(function (count){
		if (count === 0) {
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma',
						  tema: 'Otro'
						});
			Quiz.create({ pregunta: 'Capital de Portugal',
						  respuesta: 'Lisboa',
						  tema: 'Otro'
		})
		.then(function(){console.log('Base de datos inicializada.')});
		}
	});
});
