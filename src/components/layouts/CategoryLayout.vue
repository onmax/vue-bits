<template>
  <main class="app-container">
    <header>
      <h2>Header Component</h2>
    </header>
    <section class="category-wrapper">
      <aside>
        <h3>Sidebar Component</h3>
      </aside>
      <router-view />
    </section>
  </main>
</template>

<script setup lang="ts">
// Layout component for category pages
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
}

.category-wrapper {
  display: flex;
}

aside {
  width: 250px;
  background-color: #f5f5f5;
  padding: 1rem;
}
</style>
