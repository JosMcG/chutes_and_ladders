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
class SpaceType {
  static START = 0;
  static NORMAL = 1;
  static CHUTE = 2;
  static LADDER = 3;
  static WINNING = 4;
}
Object.freeze(SpaceType);   //Do not want SpaceType variables to be changed

export class Space {
  #Value     //number of space
  #Type      //specifies if it is a normal, ladder, chute, or winning space
  #Next     //Space object (if using linked list) or number (if using array) for the next space when traversing the board
  #Special  //Space object (if using linked list) or number (if using array) for the destination of a type ladder or chute
  #Avatars  //array of avatars


  constructor (value, type) {
    this.#Value = value;
    this.#Type = type;
    this.#Next = value + 1;
    this.#Special = null;
    this.#Avatars = [];
  }
  
  //get the space number
  get value () {
    return this.#Value;
  }

  get type () {
    return this.#Type;
  }

  //Can be start, normal, chute, ladder, or winning
  set type (spaceType) {
    this.#Type = spaceType;
  }

  get next () {
    return this.#Next;
  }

  //Sets next to a space object - points to next space
  set next (nextSpace) {
    this.#Next = nextSpace;
  }

  get special () {
    return this.#Special;
  }

  //Sets special to a space object
  set special (space) {
    this.#Special = space;
  }

  get occupied () {
    return this.#Avatars.length > 0
  }

  set avatars (a) {
    this.#Avatars.push(a);
  }

  leave () {
    this.#Avatars.pop()
  }

  //Takes the avatar interacting with the space, and sets its location to the space it occupies
  land (avatar) {
    //Allow > 1 avatar on the start space; if avatar lands on a space already occupied,
    //move the first occupying avatar one space, then place other avatar on the space
    if (this.occupied && this.type != SpaceType.START) {
      this.#Avatars[this.#Avatars.length - 1].move(1);   //Is it okay to assume only one avatar in array?
    }
    //If avatar lands on a chute or ladder space, move it accordingly
    if (this.#Special){
      avatar.location = this.#Special;
      this.#Special.avatars = avatar;
    } else{                     //Land on a normal space
      this.avatars = avatar;
      avatar.location = this;
    }

    
  }
  
  //need to implement
  validate () {

  }
}

const start = new Space(1, SpaceType.START);
const n2 = new Space(2, SpaceType.LADDER);
const n3 = new Space(3, SpaceType.NORMAL);
const n4 = new Space(4, SpaceType.NORMAL);
const n5 = new Space(5, SpaceType.NORMAL);
const n6 = new Space(6, SpaceType.NORMAL);
const n7 = new Space(7, SpaceType.CHUTE);

const avatar = new Avatar("yellow")
const avatar2 = new Avatar("green")
start.next = n2;
n2.next = n3;  //ladder
n2.special = n5;
n3.next = n4;  
n4.next = n5;
n5.next = n6;  //end ladder
n6.next = n7;
n7.special = n3;

start.land(avatar)
start.land(avatar2)
console.log("av2 at start: " + avatar2.location.value)
console.log("av at start: " + avatar.location.value)
avatar.move(1)
console.log(avatar.location.value)
avatar.move(2)
console.log(avatar.location.value)
console.log(avatar2.location.value)
avatar2.move(2)
console.log(avatar2.location.value)
console.log(avatar.location.value)