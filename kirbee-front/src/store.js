import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";

const socket = io(`${location.protocol}//${location.hostname}:3006`);

Vue.use(Vuex);

const state = {
  player: null,
  status: "connecting...",
  buttonLabel: "join",
  winnerName: null,
};

const mutations = {
  syncSocket(state) {
    socket.on("connect", () => {
      state.status = "Connected";
      state.buttonLabel = "Join";
    });
    socket.on("disconnect", () => {
      state.status = "Disconnected";
      state.buttonLabel = "Join";
    });
    socket.on("reconnect", () => {
      state.status = "connected";
      state.buttonLabel = "Join";
    });

    socket.on("room-full", () => {
      state.status = "Full";
      state.buttonLabel = "Refresh";
    });

    socket.on("joined", (playerStatus) => {
      state.status = "Waiting for a player";
      state.player = playerStatus.name;
    });

    socket.on("start-chrono", () => {
      state.status = "Wait";
    });

    socket.on("match-ready", () => {
      state.status = "Match can start";
      state.buttonLabel = "Ready";
    });

    socket.on("oponnent-leave", () => {
      if (state.status !== "connected") state.status = "Waiting for a player";
    });

    socket.on("chrono-end", () => {
      state.status = "Go";
    });

    socket.on("win", (winnerName) => {
      state.winnerName = winnerName;
      state.status = "Win";
      state.buttonLabel = "Revenge";
    });
  },

  handleButtonClick() {
    switch (state.status) {
      case "Connected":
      case "Full": {
        socket.emit("join");
        break;
      }
      case "Win": {
        state.status = "Match can start";
        state.buttonLabel = "Ready";
        break;
      }
      case "Player found":
      case "Match can start": {
        socket.emit("ready");
        state.buttonLabel = null;
        state.winnerName = null;
        break;
      }
      default: {
        // socket.emit("Join");
      }
    }
  },

  playerClick() {
    socket.emit("playerClick");
  },

  playerFailed() {
    socket.emit("playerFailed");
  },
};

const store = new Vuex.Store({
  mutations,
  state,
});

export default store;
