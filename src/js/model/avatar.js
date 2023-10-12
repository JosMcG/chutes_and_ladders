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
import  "./space.js";

export class Avatar {
  #Location
  #Color 

  constructor (color) {
    this.#Color = color
  }

  get color() {
    return this.#Color
  }

  get location() {
    return this.#Location
  }

  set location(space) {
    this.#Location = space
  }

  //Sends the avatar to the occupied space
  move (numSpaces) {
    let loc = this.#Location;
    let overshotWin = false;
    //Traverse through spaces according the next pointer
    for (let i = 0; i < numSpaces; i++){
      //Check to see if number of moves is passed winning space
      if (loc.next == null && i < numSpaces){
        overshotWin = true;
        console.log("Overshot the end space. Stay put.")
        break;
      }
      loc = loc.next; 
    }
    if(!overshotWin){
      loc.leave();
      loc.land(this);
    }
  }

  moveBack (numSpaces) {
    let loc = this.#Location;
    let underShotStart = false;
    //Traverse through spaces according the next pointer
    for (let i = 0; i < numSpaces; i++){
      //Check to see if number of moves is prior to starting space
      if (loc.back == null && i < numSpaces){
        underShotStart = true;
        console.log("Undershot the start space. Stay put.")
        break;
      }
      loc = loc.back; 
    }
    if(!underShotStart){
      loc.leave();
      loc.land(this);
    }
  }
}