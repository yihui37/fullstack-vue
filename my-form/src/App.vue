<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <h1>LESSON 2 自己写一个el-form</h1>
      <demoForm></demoForm>
      <myForm></myForm>
    </div>
  </div>
</template>

<script>
import demoForm from "./components/DemoForm.vue";
import myForm from "./components/MyForm.vue";

export default {
  name: "app",
  components: {
    demoForm,
    myForm
  },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
