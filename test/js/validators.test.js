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
import { validateEndSpace, validateNormalSpace, validateStartSpace } from "../../src/js/model/validators";

describe("All space validator functions", () => {
  const s1 = new Space(1, SpaceType.START);
  const s2 = new Space(2, SpaceType.NORMAL);
  const s3 = new Space(3, SpaceType.END);
  s1.next = s2;
  s2.next = s3;
  s2.previous = s1;
  s3.previous = s2;

  test("Check validate start space", () => {
    expect(validateStartSpace(s1)).toBeTruthy();
    expect(validateStartSpace(s2)).toBeFalsy();
  });

  test("Check validate normal space", () => {
    expect(validateNormalSpace(s2)).toBeTruthy();
    expect(validateNormalSpace(s1)).toBeFalsy();
    expect(validateNormalSpace(s3)).toBeFalsy();
  });

  test("Check validate end space", () => {
    expect(validateEndSpace(s3)).toBeTruthy();
    expect(validateEndSpace(s1)).toBeFalsy();
    expect(validateEndSpace(s2)).toBeFalsy();
  });
});
