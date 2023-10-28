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

export function validateSpace(space) {
  return space.type == SpaceType.START || space.type == SpaceType.NORMAL || space.type == SpaceType.END
}

export function validateStartSpace(space) {
  return space.next != null && space.previous == null
} 

export function validateNormalSpace(space) {
  return space.next != null && space.previous != null
}

export function validateEndSpace(space) {
  return space.next == null && space.previous != null
}
