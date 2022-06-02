<template>
<div class="flex h-screen">
  <div class="m-auto">
    <div>
      <div data-player-position="top" class="grid grid-cols-5 justify-items-center">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
      <div class="table m-5"></div>
      <div data-player-position="bottom" class="h-28 grid grid-cols-5 justify-items-center">
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
      </div>
    </div>
  </div>
</div>
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
<style scoped>
 .table { 
  width:28rem;
  height:8rem;
  background-color: cyan; 
  border-radius: 2.4rem;
 }
 .card { 
   background-color:blue;
   width: 50px;
   height: 75px;
   border-radius: 15%;
 }
</style>
