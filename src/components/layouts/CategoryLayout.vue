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
      :closeButtonProps="{ style: { right: '0', margin: '0', outline: 'none', border: 'none' } }"
      :pt="{
        message: {
          style: {
            borderRadius: '10px',
            border: '1px solid #142216',
            backgroundColor: '#0b0b0b',
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