<template>
  <div>
    <h1>Förslag på genomgångar</h1>
    <ul>
      <li v-for="proposal in proposals">
        <button v-on:click="removeProposal(proposal.proposalID)">x</button>
        {{ proposal.description }}
        {{ proposal.votes.length }}
        <button v-on:click="addVote(proposal.proposalID)">Vote</button>
      </li>
      <li>
        <textarea v-model="newProposalDescr" rows="4"></textarea>
        <button v-on:click="addProposal()">+</button>
      </li>
    </ul>
    <button v-on:click="pingServer()">Ping server!</button>
  </div>
</template>

<script>
export default {
  name: 'LectureChooser',
  data () {
    return {
      proposals: [],
      newProposalDescr: ''
    }
  },
  sockets: {
    msgFromServer(data) {
      console.log('Message from server incoming!')
      console.log(data)
    }
  },
  methods: {
    pingServer: (data) => {
      console.log("I'm trying ):")
      this.$socket.emit('pingServer', 'Ping!')
    },
    addProposal: function () {
      let data = { description: this.$data.newProposalDescr }
      this.$http.post('http://localhost:3000/rest/proposal', data).then(res => {
        this.getProposals()
        this.$data.newProposalDescr = '';
      }, err => {
        console.log(err)
      });
    },
    removeProposal: function(id) {
      this.$http.delete('http://localhost:3000/rest/proposal/' + id).then(res => {
        this.getProposals()
      }, err => {
        console.log(err)
      });
    },
    pingServer: function() {
      this.$socket.emit('pingServer', 'Hi from client! :D')
    },
    addVote: function (proposalID) {
      let participant = this.$session.get('participant')
      let participantID = participant.participantID
      let data = {
        participantID: participantID,
        proposalID: proposalID
      }
      this.$http.post('http://localhost:3000/rest/vote', data).then(res => {
        this.getProposals()
      }, err => {
        console.log(err)
      })
    },
    getProposals: function () {
      this.$http.get('http://localhost:3000/rest/proposal').then(res => {
        this.proposals = res.data
      }, err => {
        console.log(err)
      }); 
    }
  },
 created () {
    this.getProposals()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  text-align: left;
  width: 600px;
  margin: auto;
}
a {
  color: #42b983;
}
textarea {
  resize: none;
  width: 500px;
}
</style>
