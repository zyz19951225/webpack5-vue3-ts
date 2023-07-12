<template>
  <h1 class="title">{{test}}</h1>
  <h1 class="title">hello app</h1>
  <ul>
    <li>
      <router-link to="/admin">admin</router-link>
    </li>
    <li>
      <router-link to="/hello">hello</router-link>
    </li>
  </ul>

  <router-view />
</template>


<script setup>
import { ref } from 'vue'
const test = ref("hello apdddp")
</script>

<style>
.title {
  color: #e21b3f;
}
</style>
