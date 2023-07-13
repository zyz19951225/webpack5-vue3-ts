<template>
  <div class="test">{{ xx }}</div>
  <div class="people">{{ tt.name }}</div>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
const xx = ref("xxxx")
const tt = reactive({
  name:"xxxxx",
  age:'12312'
})
</script>

<style scoped>
.test{
  color: #00ff91;
}
</style>
