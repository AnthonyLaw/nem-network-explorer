<template>
  <div id="app">
    <PageHeader />
    <PageMenu />
    <router-view />
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import PageMenu from "@/components/PageMenu.vue";
import PageFooter from "@/components/PageFooter.vue";

export default {
  name: "App",
  components: {
    PageHeader,
    PageMenu,
    PageFooter
  }
};
</script>

