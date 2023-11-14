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
import { generateRandomNumber } from "./functions.js";
import { Space, SpaceType } from "./space.js";

// limitations under the License.
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

  get numSpaces() {
    return this.#numSpaces;
  }

  get numChutes() {
    return this.#numChutes;
  }

  get numLadders() {
    return this.#numLadders;
  }

  setUpBoard() {
    let curSpace = this.startSpace;
    let nextSpace;
    let specialSpaces = [];
    let type = SpaceType.NORMAL;
    let chutes = this.determineSpecialpositions(this.numChutes, SpaceType.CHUTE);
    let ladders = this.determineSpecialpositions(this.numLadders, SpaceType.LADDER, chutes);

    specialSpaces = this.determineCompleteSpecial(chutes, ladders, SpaceType.CHUTE, specialSpaces);
    specialSpaces = this.determineCompleteSpecial(ladders, chutes, SpaceType.LADDER, specialSpaces);
    console.log("special positions: " + Object.keys(specialSpaces));
    for (let n = 1; n < this.#numSpaces; n++) {
      if (Object.keys(specialSpaces).includes(n)) {
        nextSpace = specialSpaces.n;
      } else {
        nextSpace = this.createSpace(n + 1, type);
      }
      curSpace.next = nextSpace;
      nextSpace.previous = curSpace;
      curSpace = nextSpace;
    }
    this.endSpace = curSpace;
  }

  determineSpecialpositions(numSpecial, type, determinedSpecials) {
    let specialArr = [];
    let position;
    let assignedSpecials = determinedSpecials ? determinedSpecials : [];
    for (let n = 0; n < numSpecial; n++) {
      do position = generateRandomNumber(this.numSpaces);
      while (!this.isSpecialTypeValid(position, type, assignedSpecials));
      specialArr.push(position);
    }
    return specialArr;
  }

  createSpace(label, type) {
    return new Space(label.toString(), type);
  }

  determineSpecialEnd(position, type, specialPositions) {
    let endVal;
    do endVal = generateRandomNumber(this.numSpaces);
    while (!this.isSpecialEndValid(position, type, endVal, specialPositions));
    return endVal;
  }

  determineCompleteSpecial(special, otherSpecial, type, specialSpaces) {
    let allSpecialPositions = special.concat(otherSpecial);
    let end;
    let position;
    for (let n = 0; n < special.length; n++) {
      end = this.determineSpecialEnd(special[n], type, Object.keys(specialSpaces).concat(allSpecialPositions));
      position = special[n];
      specialSpaces.push({ position: this.createSpace(end, SpaceType.NORMAL), type: type });
    }
    return specialSpaces;
  }

  isSpecialAlready(position, specialArr) {
    return specialArr.includes(position);
  }

  isChuteInFirstRow(position) {
    return position <= this.#rowLength ? true : false;
  }

  isLadderInEndRow(position) {
    return position >= this.#numSpaces - this.#rowLength ? true : false;
  }

  isInSameRow(curPosition, endPosition) {
    return Math.round(endPosition / this.#rowLength) === Math.round(curPosition / this.#rowLength);
  }

  isSpecialEndValid(curPosition, type, endPosition, specialPositions) {
    let valid = false;
    let span = endPosition - curPosition;
    let alreadySpecial = this.isSpecialAlready(endPosition, specialPositions);
    valid =
      type == SpaceType.CHUTE && span < 0 && span >= -40
        ? false
        : type == SpaceType.LADDER && span > 0 && span <= 40
        ? false
        : true;
    return valid && !this.isInSameRow(curPosition, endPosition) && !alreadySpecial;
  }

  isSpecialTypeValid(position, type, assignedSpecials) {
    let acceptablePosition = false;
    let alreadySpecial = this.isSpecialAlready(position, assignedSpecials);
    if (type == SpaceType.CHUTE) {
      acceptablePosition = !this.isChuteInFirstRow(position);
    } else if (type == SpaceType.LADDER) {
      acceptablePosition = !this.isLadderInEndRow(position);
    }
    return acceptablePosition && !alreadySpecial;
  }
}

// let board = new Board(100, 5, 5);
// board.setUpBoard();
// let s = board.startSpace;
// let cCount = 0;
// let lCount = 0;
// for (let n = 1; n <= 100; n++) {
//   if (s.type == 3) {
//     console.log(cCount++);
//   }
//   if (s.type == SpaceType.LADDER) {
//     console.log(lCount++);
//   }
//   console.log(s.value + " : " + s.type);
//   s = s.next;
// }
// console.log(cCount);
// console.log(lCount);
