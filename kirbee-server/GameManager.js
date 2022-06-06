module.exports = class GameManager {
  constructor() {
    this.players = [];
  }

  playerJoin(playerId) {
    switch (this.players.length) {
      case 0: {
        this.players.push({
          name: "kirby",
          id: playerId,
          ready: false,
        });
        return this.players[0];
      }
      case 1: {
        this.players.push({
          name: this.players[0].name === "kirby" ? "knight" : "kirby",
          id: playerId,
          ready: false,
        });
        return this.players[1];
      }
      default: {
        return false;
      }
    }
  }

  playerLeave(playerId) {
    const newPlayers = this.players.filter(({ id }) => id !== playerId);

    if (!newPlayers) return;

    this.players = newPlayers;

    io.emit("oponnent-leave");
  }

  playerReady(playerId) {
    const player = this.players.find(({ id }) => id == playerId);

    if (!player) return;

    player.ready = true;
  }

  resetReady() {
    this.players[0].ready = false;
    this.players[1].ready = false;
  }
};
