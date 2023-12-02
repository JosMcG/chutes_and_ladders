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
import { Game, pawn } from "../../src/js/model/game.js";
import { Color } from "../../src/js/model/avatar.js";
//import { Player } from "../../src/js/model/player.js";

describe("Check that a game has the proper number of spaces with a start and end", () => {
  const game = new Game(5, 5);
  let s;
  beforeEach(() => {
    s = game.startSpace;
  });

  test("check game integrity", () => {
    expect(game).toBeTruthy();
    expect(game.startSpace).toBeTruthy();
    expect(game.startSpace.next).toBeTruthy();
    expect(game.startSpace.previous).toBeFalsy();
    expect(game.startSpace.type).toEqual(SpaceType.START);

    while (s.next) {
      s = s.next;
    }
    let endSpace = s;
    expect(endSpace).toBeTruthy();
    expect(endSpace.next).toBeFalsy();
    expect(endSpace.previous).toBeTruthy();
    expect(endSpace.type).toEqual(SpaceType.END);
  });

  test("check for 100 spaces", () => {
    let count = 1;
    while (s.next) {
      count++;
      s = s.next;
    }
    expect(count).toEqual(100);
  });

  test("check for 5 chutes", () => {
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
    let count = 0;
    for (let n = 0; n < game.getRowLength(); n++) {
      if (s.type == SpaceType.CHUTE) {
        count++;
      }
      s = s.next;
    }
    expect(count).toEqual(0);
  });

  test("to see if top row has any ladders", () => {
    let count = 0;
    while (s.next) {
      s = s.next;
    }
    for (let n = 0; n < game.getRowLength(); n++) {
      if (s.type == SpaceType.LADDER) {
        count++;
      }
      s = s.previous;
    }
    expect(count).toEqual(0);
  });

  test("the span of the special spaces is not over 40", () => {
    while (s.next) {
      if (s.special) {
        expect(Math.abs(Number(s.special.value) - Number(s.value))).toBeLessThanOrEqual(40);
      }
      s = s.next;
    }
  });

  test("chutes end below their start", () => {
    while (s.next) {
      if (s.type == SpaceType.CHUTE) {
        expect(Number(s.special.value)).toBeLessThan(Number(s.value));
      }
      s = s.next;
    }
  });

  test("ladders end above their start", () => {
    while (s.next) {
      if (s.type == SpaceType.LADDER) {
        expect(Number(s.special.value)).toBeGreaterThan(Number(s.value));
      }
      s = s.next;
    }
  });

  //This test will not work if the row length is not 10
  test("specials do not start and end in the same row", () => {
    let rowStart;
    let rowEnd;
    while (s.next) {
      if (s.type == SpaceType.CHUTE || s.type == SpaceType.LADDER) {
        rowStart = Math.ceil(Number(s.value) / game.getRowLength());
        rowEnd = Math.ceil(Number(s.special.value) / game.getRowLength());
        expect(rowStart).not.toEqual(rowEnd);
      }
      s = s.next;
    }
  });

  test("upon setUp() and assigning avatars to players, each player has an avatar value", () => {
    game.registerPlayer("Fred");
    game.registerPlayer("Wilma");
    game.registerPlayer("Shaggy");
    game.registerPlayer("Daphne");
    let colors = [Color.BLUE, Color.RED, Color.GREEN, Color.PURPLE];
    game.setUpGame();
    for (let p = 0; p < game.players.length; p++) {
      game.players[p].avatar = pawn(colors[p]);
    }
    game.players.forEach((p) => {
      expect(p.avatar).toBeTruthy();
    });
  });
});
