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
import { Space, SpaceType } from "./space.js";

export class Board {
  #Start;
  #numSpaces;
  #numChutes;
  #numLadders;
  #End;

  constructor(numSpaces, numChutes, numLadders) {
    this.#Start = new Space(1, SpaceType.START);
    this.#numSpaces = numSpaces;
    this.#numChutes = numChutes;
    this.#numLadders = numLadders;
  }

  get spaces() {
    return this.#Start;
  }

  setUpBoard() {
    let curSpace = this.#Start;
    let nextSpace;
    //Get the start values and end spaces for the special spaces
    let specials = this.specialSpaces(this.numChutes, this.numLadders);
    //Build as many spaces as numSpaces in board
    for (let n = 1; n < this.#numSpaces; n++) {
      if (n < this.#numSpaces - 1) {
        /* Check to see if the current space value is a special space.
         * If it is, set the type to chute or ladder &
         * set special to point to the destination */
        if (specials.startValues.includes(curSpace.value)) {
          let index = specials.startValues.findIndex((e) => e == curSpace.value);
          curSpace.type =
            specials.endSpaces[index].value > specials.startValues[index] ? SpaceType.LADDER : SpaceType.CHUTE;
          curSpace.special = specials.endSpaces[index];
        }

        /* Check to see if the next space already exists in the
         * special end spaces array. If it does exist, set next space
         * pointer to that space, rather than creating a new space */
        for (let i = 0; i < specials.endSpaces.length; i++) {
          if (curSpace.value + 1 == specials.endSpaces[i].value) {
            nextSpace = specials.endSpaces[i];
          }
        }
        if (curSpace.next == undefined) {
          nextSpace = new Space(n + 1, SpaceType.NORMAL);
        }
        curSpace.next = nextSpace;
        nextSpace.previous = curSpace;
        curSpace = nextSpace;
      } else {
        this.#End = new Space(n + 1, SpaceType.END);
        curSpace.next = this.#End;
        this.#End.previous = curSpace;
        curSpace = this.#End;
      }
    }
  }

  createChutes(num) {
    let c = [[], []];
    let startChute;
    let endChute;
    for (let n = 0; n < num; n++) {
      startChute = Math.floor(Math.random() * this.#numSpaces) + 1;
      endChute = Math.floor(Math.random() * startChute) + 1;
      if (c[0].includes(startChute) || Math.round(startChute / 10) === 0) {
        n = n - 1;
        continue;
      } else {
        c[0].push(startChute);
      }
      while (
        c[1].includes(endChute) ||
        endChute >= startChute ||
        Math.round(endChute / 10) === Math.round(startChute / 10)
      ) {
        endChute = Math.floor(Math.random() * this.#numSpaces) + 1;
      }
      c[1].push(endChute);
    }
    return c;
  }

  createLadders(num) {
    let l = [[], []];
    let startLadder;
    let endLadder;
    for (let n = 0; n < num; n++) {
      startLadder = Math.floor(Math.random() * this.#numSpaces) + 1;
      endLadder = Math.floor(Math.random() * this.#numSpaces) + 1;
      if (l[0].includes(startLadder) || Math.round(startLadder / 10) === Math.round((this.#numSpaces - 1) / 10)) {
        n = n - 1;
        continue;
      } else {
        l[0].push(startLadder);
      }
      while (
        l[1].includes(endLadder) ||
        endLadder <= startLadder ||
        Math.round(endLadder / 10) === Math.round(startLadder / 10)
      ) {
        endLadder = Math.floor(Math.random() * this.#numSpaces) + 1;
      }
      l[1].push(endLadder);
    }
    return l;
  }

  specialSpaces() {
    let specialSpaceLocations = {
      startValues: [],
      endSpaces: [],
    };
    let chutes = [[], []];
    let ladders = [[], []];
    let endValues = [];
    while (!this.uniqueValues(chutes, ladders)) {
      chutes = this.createChutes(this.#numChutes);
      ladders = this.createLadders(this.#numLadders);
    }

    specialSpaceLocations.startValues = chutes[0].concat(ladders[0]);
    endValues = chutes[1].concat(ladders[1]);
    for (let n = 0; n < specialSpaceLocations.startValues.length; n++) {
      specialSpaceLocations.endSpaces[n] = new Space(endValues[n], SpaceType.NORMAL);
    }
    return specialSpaceLocations;
  }

  uniqueValues(chutes, ladders) {
    let unique = false;
    let chutesAndLaddersValues = chutes[0].concat(chutes[1], ladders[0], ladders[1]);
    let uniqueVals = Array.from(new Set(chutesAndLaddersValues));
    if (uniqueVals.length == (this.#numChutes + this.#numLadders) * 2) {
      unique = true;
    }
    return unique;
  }

  display() {
    let cur = this.#End;
    let arr = [];
    //let color;
    while (cur) {
      if (Math.floor(cur.value / 10) % 2 == 0) {
        for (let n = 0; n < 10; n++) {
          //color = !cur.special ? "\x1b[30m" : cur.special.type == SpaceType.LADDER ? "\x1b[32m" : "\x1b[35m";
          cur.value > 99 ? process.stdout.write(`  ${cur.value} `) : process.stdout.write(`   ${cur.value} `);
          cur = cur.previous;
        }
      } else {
        arr.push(cur.value);
        for (let n = 1; n < 10; n++) {
          arr.push(cur.previous.value);
          cur = cur.previous;
        }
        cur = cur.previous;
        let arrLength = arr.length;
        let val = 0;
        for (let n = 0; n < arrLength; n++) {
          val = arr.pop();
          val < 10 ? process.stdout.write(`    ${val} `) : process.stdout.write(`   ${val} `);
        }
      }
      console.log();
    }
  }
}

const chutesAndLadders = new Board(100, 5, 5);
chutesAndLadders.setUpBoard();
chutesAndLadders.display();
