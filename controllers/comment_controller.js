var models = require('../models/models.js');

//  GET /quizes/:quizId/comments/new
exports.new = function (req, res) {
  res.render('comments/new.ejs', {quizId: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments/
exports.create = function (req, res) {
  var comment = models.Comment.build(
    { texto: req.body.comment.text,
      QuizId: req.body.quizId
    }
  );

  comment
    .validate()
    .then(
      function(err){
        if (err) {
          res.render('comments/new.ejs',
            {comment: comment, quizId: req.params.quizId, errors: err.errors});
        } else {
          comment // save: guarda en DB campo texto de comment
            .save()
            .then(  function(){ res.redirect('/quizes/'+req.params.quizId)})
        }
      }
  ).catch(function(error){next(error)});
};