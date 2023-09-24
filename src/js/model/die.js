// Copyright 2023 Ryan McGuinness
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
import { generateRandomNumber } from "./functions.js";
export class SummedRolls {

  constructor(rolls) {
    this.rolls = [...rolls];
    this.sum = this.rolls.reduce((runningSum, currentRoll) => runningSum + currentRoll);
  }

  // Should return an array of numbers
  rollValues() {
    return this.rolls;
  }

  // Should return a sum of all the roles as a number value
  sum() {
    return this.sum;
  }
}


export class Die { 
  #sides;

  constructor(sides) {
    this.#sides = sides;
  }

  // Should return a number of sides
  get sides() {
    return this.#sides;
  }

  // Should return a random number between one and the total sides
  roll() {
    return generateRandomNumber(this.#sides);
  }

  // Should return an array of numbers
  rollMultiple(totalRolls) {
    let rolls = new Array(totalRolls);
    return rolls.fill(0).map(() => this.roll())   
  }

  // Should return a SummedRoll
  rollMultipleAndSum(totalRolls) {
    return new SummedRolls(this.rollMultiple(totalRolls))
  }
}



const d = new Die(10);
console.log(d.sides)
console.log(d.roll())
console.log(d.rollMultiple(5))
console.log(d.rollMultipleAndSum(5))
