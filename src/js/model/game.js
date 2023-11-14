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

import { generateRandomNumInRange } from "./functions.js";
import { Space, SpaceType } from "./space.js";
import { Board } from "./boardYetAgain.js";

// limitations under the License.
export class Game {
  endSpace;
  ROW_LENGTH = 10;
  SPAN = 40;

  constructor(numSpaces, numChutes, numLadders) {
    this.startSpace = new Space(1, SpaceType.START);
    this.numSpaces = numSpaces;
    this.numChutes = numChutes;
    this.numLadders = numLadders;
    this.specialSpaces = new Object();
    this.specialSpaces = this.createSpecials();
    this.board = new Board(this.startSpace, this.numSpaces, this.specialSpaces, this.createSpace);
  }

  createSpace = (label, type) => {
    return new Space(label.toString(), type);
  };

  isAlreadySpecial(position, specialArr) {
    console.log("checking for " + position);
    console.log("in " + specialArr);
    return specialArr.includes(position.toString());
  }

  // isSpanAcceptable(startPosition, endPosition) {
  //   return Math.abs(startPosition - endPosition) <= this.SPAN;
  // }

  // isCorrectDirection(startPosition, endPosition, type) {
  //   return type == SpaceType.CHUTE && startPosition - endPosition > 0
  //     ? true
  //     : type == SpaceType.LADDER && startPosition - endPosition < 0
  //     ? true
  //     : false;
  // }

  // isEndValid(startPosition, endPostition, specialArr) {

  //   return !this.isAlreadySpecial(startPosition, specialArr); &&
  //   this.isSpanAcceptable(startPosition, endPostition) &&
  //   this.isCorrectDirection(startPosition, endPostition, type) &&
  //   !this.isInSameRow(startPosition, endPostition)
  // }

  //determine the chute and ladder positions,
  //add the corresponding created spaces to the specialSpaces object,
  //and do the same for the end positions
  assignSpecial(type) {
    let startPosition;
    let min;
    let max;
    switch (type) {
      case SpaceType.CHUTE:
        min = this.ROW_LENGTH + 1;
        max = this.numSpaces - 1;
        break;
      case SpaceType.LADDER:
        min = 2;
        max = this.numSpaces - this.ROW_LENGTH + 1;
        break;
    }
    do {
      startPosition = generateRandomNumInRange(min, max);
    } while (this.isAlreadySpecial(startPosition, Object.keys(this.specialSpaces)));
    this.specialSpaces[startPosition] = this.createSpace(startPosition, type);
    this.assignSpecialEnd(startPosition, type);
  }

  assignSpecialEnd(startPosition, type) {
    let endPosition;
    let min;
    let max;
    switch (type) {
      case SpaceType.CHUTE:
        min = startPosition - this.SPAN > 0 ? startPosition - this.SPAN : 2;
        max = Math.floor(startPosition / this.ROW_LENGTH) * this.ROW_LENGTH;
        break;
      case SpaceType.LADDER:
        min = Math.ceil(startPosition / this.ROW_LENGTH) * this.ROW_LENGTH + 1;
        max = this.numSpaces - startPosition > this.SPAN ? startPosition + this.SPAN : this.numSpaces - 1; //This does not allow ladder to winning space. Do we include the final space???
        break;
    }
    do {
      endPosition = generateRandomNumInRange(min, max);
    } while (this.isAlreadySpecial(endPosition, Object.keys(this.specialSpaces)));
    this.specialSpaces[endPosition] = this.createSpace(endPosition, SpaceType.NORMAL);
    this.specialSpaces[startPosition].special = this.specialSpaces[endPosition];
  }

  //create all chutes, then all ladders and return them in an object
  createSpecials() {
    for (let n = 0; n < this.numChutes; n++) {
      this.assignSpecial(SpaceType.CHUTE);
    }
    for (let n = 0; n < this.numLadders; n++) {
      this.assignSpecial(SpaceType.LADDER);
    }
    return this.specialSpaces;
  }
}
