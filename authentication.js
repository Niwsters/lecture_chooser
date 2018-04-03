const passwords = require('./passwords');
const ParticipantModel = require('./models/participant_model');

// TODO: PLEASE clean this mess up. Suggestion: Use some classes >_<

let participantName = '';

let cookieCreator = {
  login: function(participant) {
    this.req.session.participant = participant;
    this.res.send(participant);
  }
};

function processParticipantData(participant) {
  participant = participant[0]; // The database returns an array. Deal with it.
  if(participant) {
    cookieCreator.login(participant);
  } else {
    let participant = new ParticipantModel({
      name: participantName
    });

    // TODO: Optimize this. It's bloody ugly.
    participant.save().then(() => {
      ParticipantModel.getByName(participantName).then(participant => {
        participant = participant[0];
        cookieCreator.login(participant);
      }, participantDBError);
    });
  }
}

function participantDBError(err) { 
  res.status(401);
  res.send('Authentication failed, something went wrong when fetching participant: ' + err);
}

exports.login = function (req, res, next) {
  participantName = req.query.name;

  cookieCreator.req = req;
  cookieCreator.res = res;

  let password = req.query.password;
  let correctPassword = passwords.participant;

  if (password === correctPassword) {
    ParticipantModel.getByName(participantName).then(processParticipantData, participantDBError);
  } else {
    res.status(401);
    res.send('Wrong password! ):<');
  }
};
