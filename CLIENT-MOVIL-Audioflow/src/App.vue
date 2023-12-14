<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();

</script>
