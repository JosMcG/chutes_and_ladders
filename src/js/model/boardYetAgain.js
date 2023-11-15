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

export class Board {
  constructor(startSpace, numSpaces, specialSpaces, createSpace) {
    console.log(Object.keys(specialSpaces));
    this.start = startSpace;
    let curSpace = startSpace;
    let nextSpace;
    for (let n = 2; n <= numSpaces; n++) {
      if (Object.keys(specialSpaces).includes(n.toString())) {
        nextSpace = specialSpaces[n.toString()];
      } else {
        nextSpace = createSpace(n, SpaceType.NORMAL);
      }
      curSpace.next = nextSpace;
      nextSpace.previous = curSpace;
      curSpace = nextSpace;
    }
  }
}
