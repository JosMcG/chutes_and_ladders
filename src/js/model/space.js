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
import { Avatar } from "./avatar.js";

//enum for type of space
export class SpaceType {
  static START = 1;
  static NORMAL = 2;
  static CHUTE = 3;
  static LADDER = 4;
  static END = 5;
}
Object.freeze(SpaceType); //Do not want SpaceType variables to be changed

export class Space {
  #Value; //number of space
  #Type; //specifies if it is a normal, ladder, chute, or winning space
  #Next; //Space object for the next space when traversing the board
  #Previous; //Space object for previous space when traversing the board
  #Special; //Space object (if using linked list) or number (if using array) for the destination of a type ladder or chute
  #Avatars; //array of avatars

  constructor(value, type) {
    this.#Value = value;
    this.#Type = type;
    this.#Next = null; //This will be a Space object
    this.#Previous = null; //This will be a Space object
    this.#Special = null; //This will be a Space object
    this.#Avatars = [];
  }

  //get the space number
  get value() {
    return this.#Value;
  }

  get type() {
    return this.#Type;
  }

  //Can be start, normal, chute, ladder, or winning
  set type(spaceType) {
    this.#Type = spaceType;
  }

  get next() {
    return this.#Next;
  }

  //Sets next to a space object, pointing to next space
  set next(nextSpace) {
    this.#Next = nextSpace;
  }

  get previous() {
    return this.#Previous;
  }

  //Sets back to a space object, pointing to the previous space
  set previous(previousSpace) {
    this.#Previous = previousSpace;
  }

  get special() {
    return this.#Special;
  }

  //Sets special to a space object
  set special(space) {
    this.#Special = space;
  }

  get occupied() {
    return this.#Avatars.length > 0;
  }

  set avatars(a) {
    this.#Avatars.push(a);
  }

  leave() {
    this.#Avatars.pop();
  }

  //Takes the avatar interacting with the space, and sets its location to the space it occupies
  land(avatar) {
    let gameOver = false;
    //Check to see if avatar landed on winning space
    if (this.type == SpaceType.END) {
      gameOver = true;
    }
    //Allow > 1 avatar on the start space; if avatar lands on a space already occupied,
    //move the first occupying avatar one space, then place other avatar on the space
    if (this.occupied && this.type != SpaceType.START) {
      console.log("Someone is already here");
      this.#Avatars[this.#Avatars.length - 1].move(1); //Is it okay to assume only one avatar in array?
    }
    //If avatar lands on a chute or ladder space, move it accordingly
    if (this.#Special) {
      avatar.location = this.#Special;
      this.#Special.avatars = avatar;
      //Land on a normal space
    } else {
      this.avatars = avatar;
      avatar.location = this;
    }
    return gameOver;
  }

  //Currently, this is a placeholder - needs built out
  //takes an array of validation functions
  valid(validators) {
    for (let f = 0; f < validators.length; f++) {
      if (!validators[f](this)) {
        return false;
      }
    }
    return true;
  }
}
