<!--
MyApp - Una aplicación Ionic Vue con un diseño de panel dividido.

@component
@example
<MyApp />

@remarks
Esta aplicación utiliza Ionic con Vue y presenta un diseño de panel dividido.
El panel dividido proporciona una interfaz de usuario donde se pueden colocar
dos áreas separadas, como un menú lateral y el contenido principal.
-->
<template>
  <ion-app>
    <!-- Componente IonSplitPane para el diseño de panel dividido -->
    <ion-split-pane content-id="main-content">
       <!-- Componente IonRouterOutlet para manejar la navegación -->
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
// Importa componentes de Ionic Vue para su uso en la plantilla
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
</script>
