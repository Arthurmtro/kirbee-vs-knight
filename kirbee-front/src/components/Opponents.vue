<template>
  <div class="opponents">
    <img
      v-if="$store.state.winnerName === null && $store.state.status !== 'Win'"
      src="/images/kirby/kirby_start.png"
      alt="kirby"
    />
    <img
      v-else
      :src="
        $store.state.winnerName === 'knight'
          ? '/images/knight/knight_win.png'
          : '/images/knight/knight_lose.png'
      "
      alt="knight"
    />

    <img
      v-if="$store.state.winnerName === null && $store.state.status !== 'Win'"
      src="/images/knight/knight_start.png"
      alt="knight"
    />
    <img
      v-else
      :src="
        $store.state.winnerName === 'kirby'
          ? '/images/kirby/kirby_win.png'
          : '/images/kirby/kirby_lose.png'
      "
      alt="kirby"
    />
  </div>
</template>

<script>
export default {
  name: "Opponents",
};
</script>

<style scoped>
.opponents {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.opponents img {
  height: 66px;
}
</style>
