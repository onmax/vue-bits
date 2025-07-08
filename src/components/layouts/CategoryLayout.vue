<template>
  <main class="app-container">
    <Header />
    <section class="category-wrapper">
      <Sidebar />
      <div class="category-page">
        <router-view />
      </div>
    </section>
    <Toast position="bottom-right"
      :closeButtonProps="{ style: { justifyContent: 'flex-end', right: '0', margin: '0', outline: 'none', border: 'none' } }"
      :pt="{
        message: {
          style: {
            borderRadius: '10px'
          }
        },
        messageContent: {
          style: {
            alignItems: 'center'
          }
        },
        messageIcon: {
          style: {
            display: 'none'
          }
        }
      }" />
  </main>
</template>

<script setup lang="ts">
import Header from '../navs/Header.vue';
import Sidebar from '../navs/Sidebar.vue';
</script>