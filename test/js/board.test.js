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
import { SpaceType } from "../../src/js/model/space.js";
import { Board } from "../../src/js/model/board.js";

describe("Check that a board has the proper number of spaces with a start and end", () => {
  const board = new Board(100, 5, 5);

  beforeEach(() => {
    board.setUpBoard();
  });

  test("check board integrity", () => {
    expect(board).toBeTruthy();
    expect(board.startSpace).toBeTruthy();
    expect(board.startSpace.next).toBeTruthy();
    expect(board.startSpace.previous).toBeFalsy();
    expect(board.startSpace.type).toEqual(SpaceType.START);
    expect(board.endSpace).toBeTruthy();
    expect(board.endSpace.next).toBeFalsy();
    expect(board.endSpace.previous).toBeTruthy();
    expect(board.endSpace.type).toEqual(SpaceType.END);
  });

  test("check for 100 spaces", () => {
    let s = board.startSpace;
    let count = 1;
    while (s.next) {
      count++;
      s = s.next;
    }
    expect(count).toEqual(100);
  });

  test("check for 5 chutes", () => {
    let s = board.startSpace;
    let count = 0;
    while (s.next) {
      if (s.type == SpaceType.CHUTE) {
        count++;
      }
      s = s.next;
    }
    expect(count).toEqual(5);
  });

  test("check for 5 ladders", () => {
    let s = board.startSpace;
    let count = 0;
    while (s.next) {
      if (s.type == SpaceType.LADDER) {
        count++;
      }
      s = s.next;
    }
    expect(count).toEqual(5);
  });

  test("to see if bottom row has any chutes", () => {
    let s = board.startSpace;
    let count = 0;
    for (let n = 0; n < 10; n++) {
      if (s.type == SpaceType.CHUTE) {
        count++;
      }
      s = s.next;
    }
    expect(count).toEqual(0);
  });

  test("to see if top row has any ladders", () => {
    let s = board.endSpace;
    let count = 0;
    for (let n = 0; n < 10; n++) {
      if (s.type == SpaceType.LADDER) {
        count++;
      }
      s = s.previous;
    }
    expect(count).toEqual(0);
  });
});
