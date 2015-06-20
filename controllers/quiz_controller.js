var models = require('../models/models.js');

// Autoload - factoriza el código is la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {  
	var options = {};
	if (req.query.search) {
		options = {where: ["pregunta like ?", '%'+req.query.search.split(' ').join('%')+'%'], order: 'pregunta ASC'}
	}
 	models.Quiz.findAll(options).then(function(quizes) {
 		res.render('quizes/index.ejs', { quizes: quizes});
 	})
 };

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', { quiz: req.quiz});
}; 

// GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
 	  if (req.query.respuesta === req.quiz.respuesta) {
 	  	resultado = 'Correcto';
	 }
	res.render('quizes/answer',	{quiz: req.quiz, respuesta: resultado});
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build( // Crea objeto quiz
		{pregunta: "pregunta", respuesta: "respuesta"}
	);

	res.render('quizes/new', {quiz: quiz});
};

// GET /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz	);

// Guarda en DB los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes');
	}); // Redirecciona HTTP (URL: relativo) lista de preguntas
};
