var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // Autoload quizId

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//router.get('/author', quizController.author);
// GET /author
router.get('/author', function(req, res) {
	res.render('author', { author: 'Ricardo Taveras' });
});

// GET Busqueda de pregunta
router.get('/search', function(req, res) {
	res.render('quizes/search', {});
});

module.exports = router;