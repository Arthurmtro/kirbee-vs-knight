<template>
  <div
    @click="clickPage"
    class="App"
    id="app"
    :class="{ win: this.$store.state.status === 'Win' }"
  >
    <GameField />
  </div>
</template>

<script>
import GameField from "./components/GameField.vue";

export default {
  name: "App",
  components: {
    GameField,
  },

  mounted() {
    this.$store.commit("syncSocket");
  },

  methods: {
    clickPage() {
      if (this.$store.state.status === "Go") {
        this.$store.commit("playerClick");
      } else if (this.$store.state.status === "Wait") {
        this.$store.commit("playerFailed");
      }
    },
  },
};
</script>

<style scoped>
.App {
  width: 100%;
  height: 100%;
  background: url(/images/background.png) center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.win {
  animation: flash 2s linear;
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  2% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
