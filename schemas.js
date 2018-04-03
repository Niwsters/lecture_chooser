exports.proposal = {
  description: "text"
};

exports.participant = {
  name: "text unique"
};

exports.vote = {
  participantID: "integer",
  proposalID: "integer",
  CONSTRAINT: "unq UNIQUE (participantID, proposalID)"
};
