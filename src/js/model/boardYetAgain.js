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

import { SpaceType } from "./space.js";
import { Game } from "./game.js";

export class Board {
  //how do I pass in the function as a parameter?
  constructor(startSpace, numSpaces, specialSpaces, createSpace) {
    console.log(Object.keys(specialSpaces).length);
    this.start = startSpace;
    let curSpace = startSpace;
    let nextSpace;
    for (let n = 1; n < numSpaces; n++) {
      if (Object.keys(specialSpaces).includes(n.toString())) {
        nextSpace = specialSpaces[n.toString()];
      } else {
        nextSpace = createSpace(n + 1, SpaceType.NORMAL);
      }
      curSpace.next = nextSpace;
      nextSpace.previous = curSpace;
      curSpace = nextSpace;
    }
    nextSpace = createSpace(numSpaces, SpaceType.END); //figure this out
    curSpace.next = nextSpace;
    nextSpace.previous = curSpace;
    curSpace = nextSpace;
  }
}

let chutesAndLadders = new Game(100, 5, 5);
let s = chutesAndLadders.startSpace;
let cCount = 0;
let lCount = 0;
for (let n = 1; n <= 100; n++) {
  if (s.type == 3) {
    cCount++;
  }
  if (s.type == SpaceType.LADDER) {
    lCount++;
  }
  //console.log(s.value + " : " + s.type);
  s = s.next;
}
console.log(cCount);
console.log(lCount);
