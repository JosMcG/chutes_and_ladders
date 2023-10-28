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
import { Space } from "../../src/js/model/space";
import { SpaceType } from "../../src/js/model/space";
import { Board } from "../../src/js/model/space";

describe("Check that a board has the proper number of spaces with a start and end", () => {
  const board = new Board(20);

  test("check for 20 spaces", () => {
    let s = board.spaces();
    let count = 0;
    while (s.next) {
      count++;
      s = s.next;
    }
    expect(count).toBe(20);
  });

  test("");
  test("start of ladder is greater than 0", () => {
    expect(board.chutes()).toBeGreaterThan(0);
  });
});
