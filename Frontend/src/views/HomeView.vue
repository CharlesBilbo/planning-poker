<template>
  <button @click="sendWeb">
    <h1> send to webhook</h1>
  </button>
</template>

<script>
import { io } from 'socket.io-client';
export default {
  data:() => ({
    socket: io('http://localhost:8080')
  }),
  methods: {
    sendWeb() {
      this.socket.emit("user-connected");
    }
  },
  mounted() { 
    this.$nextTick(() => {
      this.socket.on('accepted', () => console.log(true))
    })
  }
}
</script>