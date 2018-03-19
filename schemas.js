exports.proposal = {
  description: "text"
};

exports.participant = {
  name: "text unique"
};

exports.vote = {
  participantID: "integer unique",
  proposalID: "integer"
};
