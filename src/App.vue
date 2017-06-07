<template>
  <div id="app">
    <vue-dragula class="list-container" v-model="sampleList" :copy="true">
      <div class="list-item" v-for="value in sampleList" :key="value">{{value}}</div>
    </vue-dragula>
    <vue-dragula class="list-container" v-model="sampleListTwo">
      <div class="list-item" v-for="value in sampleListTwo" style="background: red;" :key="value">{{value}}</div>
    </vue-dragula>
    <div class="list-container" >
      <div class="list-item" v-for="value in sampleListTwo" style="background: lightblue;" :key="value">{{value}}</div>
    </div>
  </div>
</template>

<script>
import VueDragula from './components/VueDragula'

export default {
  name: 'app',
  data () {
    return {
      sampleList: ['a', 'b', 'c', 'd'],
      sampleListTwo: [1, 2, 3, 4]
    }
  },
  components: {
    VueDragula
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.list-container {
  display: inline-block;
}
.list-item {
  padding: 10px;
  display: block;
  width: 100px;
  height: 100px;
  margin: 10px;
  background: grey;
}
</style>
