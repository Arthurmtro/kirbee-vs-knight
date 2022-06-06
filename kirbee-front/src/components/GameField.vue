<template>
  <div class="game">
    <div class="scene">
      <GameInformations />
      <div class="battle-field">
        <div class="game-start">
          <img
            v-if="$store.state.status === 'Go'"
            v-bind:class="{ show: isActive, hidden: !isActive }"
            src="/images/action-mark.png"
            alt="action-mark"
          />
        </div>
        <Opponents />
      </div>
    </div>
  </div>
</template>

<script>
import Opponents from "./Opponents.vue";
import GameInformations from "./GameInformations.vue";
export default {
  name: "GameField",
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    ping() {
      // socket.emit("ping");
    },
  },
  components: { Opponents, GameInformations },
};
</script>

<style scoped>
.game {
  width: 512px;
  max-width: 90%;
  height: 444px;
  max-height: 90%;
  background: url(/images/background.png) center center;
  box-shadow: 0 0 9px rgb(0 0 0 / 60%), 0 0 0 9999px rgb(255 255 255 / 40%);
  border-radius: 5px;
  overflow: hidden;
}

.scene {
  height: 100%;
  padding: 0.7rem;
  text-align: center;
  color: white;
}

.scene p {
  margin-bottom: 2rem;
}

.game-start {
  height: 66px;
  display: flex;
  justify-content: center;
}

.game-start .hidden {
  height: 66px;
  display: none;
}

.game-start .show {
  height: 66px;
  display: block;
}

.opponents {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.opponents img {
  height: 66px;
}
</style>
