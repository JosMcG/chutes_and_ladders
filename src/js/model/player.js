// Copyright 2023 Josilyn McGuinness
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { Die } from "./die.js";

export class Player {
  constructor(name) {
    this.name = name;
    this.avatar = undefined;
    this.next = null;
  }

  selectAvatar(avatar) {
    this.avatar = avatar;
  }

  //Returns true if on END space
  takeTurn = (die) => {
    return this.avatar.move(die.roll());
  };
}

export class PlayerOrder {
  constructor(players) {
    this.players = this.playerOrder(players);
    this.firstPlayer = this.players[0];
  }

  //determines order of players, handling the same number being rolled by multiple players at any stage of the roll-off
  //and inserting them in appropriate order at the appropriate place
  playerOrder(players) {
    let order = {}; //stores the rolled number and player(s) that rolled it
    let holdOrder = []; //stores an array of players that rolled the same number
    let die = new Die(6);
    let rolledNum;
    players.forEach((p) => {
      rolledNum = die.roll();
      Object.keys(order).includes(rolledNum.toString()) ? order[rolledNum].push(p) : (order[rolledNum] = [p]);
      if (order[rolledNum].length > 1 && !holdOrder.includes(rolledNum)) {
        holdOrder.push(rolledNum);
      }
    });
    let subOrder = [];
    if (holdOrder) {
      holdOrder.forEach((n) => {
        subOrder = this.playerOrder(order[n]);
        order[n] = subOrder;
      });
    }
    return Object.values(order).reduce((player, cur) => player.concat(cur));
  }

  linkPlayers() {
    let cur = this.firstPlayer;
    for (let p = 0; p < this.players.length - 1; p++) {
      cur.next = this.players[p + 1];
      cur = cur.next;
    }
    cur.next = this.firstPlayer;
  }
}
