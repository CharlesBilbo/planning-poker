<template>
  <div>
    <div class="flex h-screen">
      <div class="m-auto" v-if="!submitted">
        <div class="w-full max-w-xs text-center">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <input v-model="currentPlayer" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
            </div>
            <div class="flex items-center justify-center">
              <button @click="addPlayer(); sendNewPlayerSocket()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="m-auto" v-if="submitted">
        <div>
          <div ref="top" data-player-position="top" :class="{'grid-cols-': grid.top}" class="grid justify-items-center">
            <div v-for="card in cards.top" :key="card.name" :data-current-player="card.main">
              <div class="card mx-auto"></div>
              <div>
                <span class="text-white font-bold mt-1">
                  {{card.name}}
                </span>
              </div>
            </div>
          </div>
          <div class="card-table m-5 flex">
            <div class="m-auto reveal align-middle font-extrabold"> Reveal Cards</div>
          </div>
          <div ref="bottom" data-player-position="bottom" :class="{'grid-cols-': grid.top}" class="h-28 grid justify-items-center">
            <div v-for="card in cards.bottom" :key="card.name" :data-current-player="card.main">
              <div class="card mx-auto"></div>
              <div>
                <span class="text-white font-bold mt-1">
                  {{card.name}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import _ from 'lodash';

export default {
  data:() => ({
    socket: io('http://localhost:8080'),
    players: [],
    currentPlayer: null,
    submitted: false,
    cards: {
      top: [],
      bottom: []
    },
    grid: {
      top: 0,
      bottom: 0
    }
  }),
  methods: {
    addPlayer(main = true, name = this.currentPlayer) { 
      this.submitted = true
      this.cards.top.length > this.cards.bottom.length 
        ? this.cards.bottom.push({'name': name, 'main': true, 'score': null})
        : this.cards.bottom.push({'name': name, 'main': true, 'score': null})
    },
    sendNewPlayerSocket()
    {
      this.socket.emit('new-player-connected', {
        'name': this.currentPlayer
      })
    }
  }, 
  mounted() {
    this.$nextTick(() => { 
      this.socket.on('new-player', (data) => {
        if(data.name != this.currentPlayer) { 
          this.addPlayer(false, data.name)
        }
      })
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
 .user-input { 
   background: white;
   height:10rem;
   width: 35rem;
   border-radius: 1rem;
 }
</style>
