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
import { Avatar } from "../../src/js/model/avatar";

test("testing space", () => {
  const start = new Space(1, SpaceType.START);
  const n2 = new Space(2, SpaceType.LADDER);
  const n3 = new Space(3, SpaceType.NORMAL);
  const n4 = new Space(4, SpaceType.NORMAL);
  const n5 = new Space(5, SpaceType.NORMAL);
  const n6 = new Space(6, SpaceType.NORMAL);
  const n7 = new Space(7, SpaceType.NORMAL);
  const n8 = new Space(8, SpaceType.END);

  const avatar = new Avatar("yellow")
  start.next = n2;
  n2.next = n3;  //ladder
  n2.special = n5;
  n3.next = n4;  //end chute
  n4.next = n5;
  n5.next = n6;  //end ladder
  n6.next = n7;
  n7.next = n8;
  n7.special = n3; //chute
  n8.next = null;

  start.land(avatar)
  avatar.move(1)
  expect(avatar.location.value).toBe(5)     //test the ladder
  avatar.move(2)
  expect(avatar.location.value).toBe(3)     //test the chute
  avatar.move(7)
  expect(avatar.location.value).toBe(3)     //test overshooting the ending space
  avatar.move(5)
  expect(avatar.location.value).toBe(8)     //test landing on END
})