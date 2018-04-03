<template>
  <div>
    <h1>Login till genomgångsförslagsapp</h1>
    <ul>
      <li>Namn: <input type="text" v-model="name"></li>
      <li>Lösenord: <input type="password" v-model="password"></li>
      <li><button v-on:click="login()">Logga in</button></li>
    </ul>
    <div class="loginFeedback">
      {{loginFeedback}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: '',
      loginFeedback: ''
    }
  },
  sockets: {
    msgFromServer(data) {
      console.log('Message from server incoming!')
      console.log(data)
    }
  },
  methods: {
    login: function () {
      this.$http.get('http://localhost:3000/rest/login?name=' + this.name + '&password=' + this.password).then(res => {
        if (res.status === 200) {
          this.$session.start();
          console.log(res);
          this.$session.set('participant', res.data);
          window.location.href = 'http://localhost:8080/#/proposals';
        }
      }, err => {
        this.loginFeedback = err.response.data;
      })
    }
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
  width: 400px;
  margin: auto;
  padding: 0;
}

.loginFeedback {
  color: red;
  width: 400px;
  margin: auto;
  text-align: left;
  padding-top: 10px;
}
</style>
