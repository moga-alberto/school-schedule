<template>
  <div>
    <div><h1>eeeeee</h1></div>
  </div>
</template>
<script>
export default {
  name: 'Teachers',

  mounted() {
    const page = document.getElementById('teachers-link');
    page.classList.add('active');
  },
  destroyed() {
    const page = document.getElementById('teachers-link');
    page.classList.remove('active');
  },
};
</script>

<style scoped></style>
