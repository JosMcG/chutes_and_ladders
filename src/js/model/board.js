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
import { generateRandomNumber } from "./functions.js";
import { Space, SpaceType } from "./space.js";
import { Die } from "./die.js";

export class Board {
  #Start;
  #numSpaces;
  #numChutes;
  #numLadders;
  #End;
  #rowLength = 10;

  constructor(numSpaces, numChutes, numLadders) {
    this.#Start = new Space(1, SpaceType.START);
    this.#numSpaces = numSpaces;
    this.#numChutes = numChutes;
    this.#numLadders = numLadders;
  }

  get startSpace() {
    return this.#Start;
  }

  set startSpace(space) {
    this.#Start = space;
  }

  get endSpace() {
    return this.#End;
  }

  set endSpace(space) {
    space.type = SpaceType.END;
    this.#End = space;
  }

  setUpBoard() {
    let curSpace = this.startSpace;
    let nextSpace;
    let specialSpaces = {};
    let chuteCount = 0;
    let ladderCount = 0;
    let type;
    let end;
    for (let n = 1; n < this.#numSpaces; n++) {
      if (this.isSpecialEndAlready(n, specialSpaces)) {
        nextSpace = specialSpaces.n;
      } else {
        type = this.determineSpaceType();
        if (this.isSpecialTypeValid(n, type, chuteCount, ladderCount)) {
          end = this.determineSpecialEnd(n, type);
        } else {
          type = SpaceType.NORMAL;
        }
        switch (type) {
          case SpaceType.CHUTE:
            curSpace.special = this.goToEndOfChute(curSpace, n, end);
            chuteCount++;
            break;
          case SpaceType.LADDER:
            curSpace.special = this.createSpace(n, type);
            specialSpaces.n = curSpace.special;
            ladderCount++;
            break;
        }
        nextSpace = this.createSpace(n + 1, type);
      }
      curSpace.next = nextSpace;
      nextSpace.previous = curSpace;
      curSpace = nextSpace;
    }
    this.endSpace = curSpace;

    //check to see if all chutes and ladders exist
  }

  determineSpaceType() {
    const makeChute = 3;
    const makeLadder = 7;
    //This calculates a statistically close number relating to the probability of desired number
    //of chutes and ladders being rolled, with a high guarantee that at least that number is achieved
    const die = new Die(Math.round(this.#numSpaces / (this.#numChutes + this.#numLadders)));
    let type = die.roll();
    return type == makeChute ? SpaceType.CHUTE : type == makeLadder ? SpaceType.LADDER : SpaceType.NORMAL;
  }

  createSpace(label, type) {
    return new Space(label.toString(), type);
  }

  determineSpecialEnd(curPosition, type) {
    let endVal;
    do endVal = generateRandomNumber(this.#numSpaces);
    while (!this.isSpecialEndValid(curPosition, type, endVal));
    return endVal;
  }

  isSpecialEndAlready(curPosition, specialEndSpaces) {
    return Object.keys(specialEndSpaces).includes(curPosition);
  }

  isChuteInFirstRow(curPosition) {
    return curPosition <= this.#rowLength ? true : false;
  }

  isLadderInEndRow(curPosition) {
    return curPosition >= this.#numSpaces - this.#rowLength ? true : false;
  }

  isInSameRow(curPosition, endPosition) {
    return Math.round(endPosition / this.#rowLength) === Math.round(curPosition / this.#rowLength);
  }

  isSpecialEndValid(curPosition, type, endPosition) {
    let valid = false;
    let span = endPosition - curPosition;
    valid =
      type == SpaceType.CHUTE && span < 0 && span >= -40
        ? false
        : type == SpaceType.LADDER && span > 0 && span <= 40
        ? false
        : true;
    return valid && this.isInSameRow(curPosition, endPosition);
  }

  isSpecialTypeValid(curPosition, type, chuteCount, ladderCount) {
    let acceptablePosition = false;
    let acceptableNum = false;
    if (type == SpaceType.CHUTE) {
      acceptablePosition = !this.isChuteInFirstRow(curPosition);
      acceptableNum = chuteCount < this.#numChutes;
    } else if (type == SpaceType.LADDER) {
      acceptablePosition = !this.isLadderInEndRow(curPosition);
      acceptableNum = ladderCount < this.#numLadders;
    }
    return acceptablePosition && acceptableNum;
  }

  goToEndOfChute(curSpace, position, endVal) {
    for (let n = 0; n < position - endVal; n++) {
      curSpace = curSpace.previous;
    }
    return curSpace;
  }

  isAllChutesBuilt(count) {
    return count == this.#numChutes;
  }

  isAllLaddersBuilt(count) {
    return count == this.#numLadders;
  }

  /*  Need to change this method!!!
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
  }*/
}

let board = new Board(100, 5, 5);
board.setUpBoard();
let s = board.startSpace;
let cCount = 0;
let lCount = 0;
for (let n = 1; n <= 100; n++) {
  if (s.type == SpaceType.CHUTE) {
    cCount++;
  }
  if (s.type == SpaceType.LADDER) {
    lCount++;
  }
  s = s.next;
}
console.log(cCount);
console.log(lCount);
