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
    expect(board.startSpace.type == SpaceType.START);
    expect(board.endSpace).toBeTruthy();
    expect(board.endSpace.next).toBeFalsy();
    expect(board.endSpace.previous).toBeTruthy();
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

  test("check that all chutes end at a value less than the start", () => {
    let chutes = board.createChutes(5);
    for (let n = 0; n < chutes[0].length; n++) {
      expect(chutes[0][n]).toBeGreaterThan(chutes[1][n]);
    }
  });

  test("check that all ladders end at a value greater than the start", () => {
    let ladders = board.createLadders(5);
    for (let n = 0; n < ladders[0].length; n++) {
      expect(ladders[0][n]).toBeLessThan(ladders[1][n]);
    }
  });
});
