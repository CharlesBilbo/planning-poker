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
      <div class="card-table m-5 flex">
        <div class="m-auto reveal align-middle font-extrabold"> Reveal Cards</div>
      </div>
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
 .card-table { 
  width:28rem;
  height:8rem;
  background-color: #D99AC5; 
  border-radius: 2.4rem;
 }
 .card { 
   background-color:#14BDEB;
   width: 50px;
   height: 75px;
   border-radius: 15%;
 }

 .reveal { 
   color: black;
   font-weight: bold;
   padding: 5px;
   border-radius: .5rem;
   font-size: x-large;
 }
</style>
