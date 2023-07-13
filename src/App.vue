<template>
  <h1 class="title">{{test}}</h1>
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
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
