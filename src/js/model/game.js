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

import { generateRandomNumInRange } from "./functions.js";
import { Space, SpaceType } from "./space.js";
import { Board } from "./board.js";
import { Player, PlayerOrder } from "./player.js";
import { Avatar } from "./avatar.js";
import { Die } from "./die.js";

//const AVATARS = [pawn(Color.RED), pawn(Color.YELLOW), pawn(Color.GREEN), pawn(Color.BLUE), pawn(Color.PURPLE)];
const NUM_SPACES = 100;
const ROW_LENGTH = 10;
const SPAN = 40;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;

const createSpace = (label, type) => {
  return new Space(label.toString(), type);
};

const isAlreadySpecial = (position, specialArr) => {
  return specialArr.includes(position.toString());
};

const determinePosition = (min, max, type, specialSpaces) => {
  let position;
  do {
    position = generateRandomNumInRange(min, max);
  } while (isAlreadySpecial(position, Object.keys(specialSpaces)));
  specialSpaces[position] = createSpace(position, type);
  return position;
};

//determine the chute and ladder positions,
//add the corresponding created spaces to the specialSpaces object,
//and do the same for the end positions by calling assignSpecialEnd()
const assignSpecial = (type, specialSpaces) => {
  let min;
  let max;
  switch (type) {
    case SpaceType.CHUTE:
      min = ROW_LENGTH + 1;
      max = NUM_SPACES - 1;
      break;
    case SpaceType.LADDER:
      min = 2;
      max = NUM_SPACES - ROW_LENGTH + 1;
      break;
  }
  let startPosition = determinePosition(min, max, type, specialSpaces);
  specialSpaces = assignSpecialEnd(startPosition, type);
  return specialSpaces;
};

const assignSpecialEnd = (startPosition, type, specialSpaces) => {
  let min;
  let max;
  switch (type) {
    case SpaceType.CHUTE:
      min = startPosition - SPAN > 0 ? startPosition - SPAN : 2;
      max = Math.floor(startPosition / ROW_LENGTH) * ROW_LENGTH;
      break;
    case SpaceType.LADDER:
      min = Math.ceil(startPosition / ROW_LENGTH) * ROW_LENGTH + 1;
      max = NUM_SPACES - startPosition > SPAN ? startPosition + SPAN : NUM_SPACES - 1; //This does not allow ladder to winning space. Do we include the final space???
      break;
  }
  let endPosition = determinePosition(min, max, SpaceType.NORMAL, specialSpaces);
  specialSpaces[startPosition].special = specialSpaces[endPosition];
  return specialSpaces;
};

//create all chutes, all ladders, and final space and return them in an object
const createSpecials = (numChutes, numLadders) => {
  let specialSpaces = new Object();
  for (let n = 0; n < numChutes; n++) {
    specialSpaces = assignSpecial(startPosition, SpaceType.CHUTE, specialSpaces);
  }
  for (let n = 0; n < numLadders; n++) {
    specialSpaces = assignSpecial(startPosition, SpaceType.LADDER, specialSpaces);
  }
  specialSpaces[NUM_SPACES] = createSpace(NUM_SPACES, SpaceType.END);
  return specialSpaces;
};

// //determines order of players, handling the same number being rolled my multiple players at any stage of the roll-off
// const playerOrder = (players) => {
//   let order = {}; //stores the rolled number and player(s) that rolled it
//   let holdOrder = []; //stores an array of players that rolled the same number
//   let die = new Die(6);
//   let rolledNum;
//   players.forEach((p) => {
//     rolledNum = die.roll();
//     Object.keys(order).includes(rolledNum.toString()) ? order[rolledNum].push(p) : (order[rolledNum] = [p]);
//     if (order[rolledNum].length > 1 && !holdOrder.includes(rolledNum)) {
//       holdOrder.push(rolledNum);
//     }
//   });
//   let subOrder = [];
//   if (holdOrder) {
//     holdOrder.forEach((n) => {
//       subOrder = playerOrder(order[n]);
//       order[n] = subOrder;
//     });
//   }
//   return Object.values(order).join();
// };

const pawn = (color) => {
  return new Avatar(color);
};

export class Game {
  players = []; //an array of player objects
  selectedAvatars = [];
  firstPlayer = undefined; //Do I want to link the players???
  //order = []; //an array of players in the order they should play -> changed to linking the players in order
  die = new Die(6);

  constructor(numChutes, numLadders) {
    this.startSpace = new Space(1, SpaceType.START);
    this.specialSpaces = createSpecials(numChutes, numLadders); //put #chutes and ladders here and eliminate the this. values
    this.board = new Board(this.startSpace, NUM_SPACES, specialSpaces, createSpace);
  }

  //Sets up a new board with avatars set on start space
  resetBoard() {
    this.board = new Board(this.startSpace, NUM_SPACES, this.specialSpaces, createSpace);
    this.selectedAvatars.forEach((a) => (a.location = this.startSpace));
  }

  //Returns true if more players can register
  registerPlayer(player) {
    this.players.push(new Player(player));
    if (this.players.length == 1) {
      this.firstPlayer = this.players[0];
    }
    let canAddPlayer = player.length < MAX_PLAYERS ? true : false; //not sure if I will use a bool or just check number
    return canAddPlayer;
  }

  setAvatar(player, avatar) {
    if (!this.selectedAvatars.includes(avatar)) {
      player.selectAvatar(avatar);
      avatar.location = this.startSpace;
      this.selectedAvatars.push(avatar);
    }
  }
  setUpGame() {
    if (this.players.length > MIN_PLAYERS) {
      console.log("Need more players."); //redirect to invite players
    }
    this.players = new PlayerOrder(this.players);
    this.firstPlayer = this.players[0];
  }

  verifySetUp() {
    let ready = true;
    this.players.forEach((p) => {
      if (!p.avatar) {
        ready = false;
      }
      return ready;
    });
  }

  // //Not sure if this will be needed
  // playRound() {
  //   let gameOver = [false];
  //   this.order.forEach((p) => {
  //     gameOver[0] = p.takeTurn(this.die);
  //     if (gameOver[0]) {
  //       gameOver.push(p);
  //     }
  //   });
  //   return gameOver; //returns an array with one false boolean or an array with a true and a player
  // }

  playGame() {
    let gameOver = false;
    let curPlayer = this.firstPlayer;
    while (!gameOver) {
      gameOver = curPlayer.takeTurn(this.die);
      if (gameOver) {
        console.log(curPlayer.avatar.color + " won!");
      }
      curPlayer = curPlayer.next;
    }
  }
}
