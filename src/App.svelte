<script>
  // import Header from "./lib/Header.svelte";
  // @ts-ignore
  import router from "page";
  import Login from "./lib/Login.svelte";
  // @ts-ignore
  import MainContainer from "./lib/MainContainer.svelte";
  import Register from "./lib/Register.svelte";

  let page;
  router("/", () => (page = Login));
  // router("/register", () => (page = Register));
  router("/mainContainer", () => (page = MainContainer));
  router.start();
</script>

<main>
  <!-- <Header /> -->
  <div class="layout">
    <svelte:component this={page} />
  </div>

  <!-- <Login /> -->
</main>

<style>
</style>
