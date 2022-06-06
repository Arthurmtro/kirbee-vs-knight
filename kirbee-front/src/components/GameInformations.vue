<template>
  <div class="informations">
    <p v-if="$store.state.player">Joined as {{ $store.state.player }}</p>

    <p v-if="$store.state.status !== 'Go' && $store.state.status !== 'Win'">
      {{ $store.state.status }}
    </p>
    <p v-else-if="$store.state.status === 'Win'">
      {{ $store.state.winnerName }} win!
    </p>

    <button
      v-if="
        $store.state.buttonLabel !== null &&
          $store.state.status !== 'Wait' &&
          $store.state.status !== 'Go' &&
          $store.state.status !== 'Waiting for a player'
      "
      @click="handleClick"
    >
      {{ $store.state.buttonLabel }}
    </button>
  </div>
</template>

<script>
export default {
  name: "GameInformations",

  methods: {
    handleClick() {
      this.$store.commit("handleButtonClick");
    },
  },
};
</script>

<style scoped>
.informations {
  height: 35%;
}
</style>
