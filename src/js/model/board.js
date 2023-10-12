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
import { generateRandomNumber } from "./functions.js";
import { Space } from "./space.js"




/*export function createBoard(numSpaces) {
  let board = [new Array(numSpaces)];
  for(let i = 1; i <= numSpaces; i++){
    board[i-1] = new Space(i)
  }
  return board;
}

let board = createBoard(20);
console.log("length: " + board.length)
console.log(board[0].value);
console.log(board[0].type);
console.log(board[0].next);
console.log(board[0].occupied);
console.log(board[0].special)

function plotChuteLadderSpaces (numChutesLadders, numSpaces) {
  //get random numbers for location of chutes and ladders
  let chuteLadderNums = new Array(numChutesLadders);
  chuteLadderNums = Array.from(new Set(chuteLadderNums.fill(0).map(() => generateRandomNumber(numSpaces))));
  //replace any duplicates
  while (chuteLadderNums.length < numChutesLadders){
    let newNum = generateRandomNumber(numSpaces);
    if(!chuteLadderNums.includes(newNum)){
      chuteLadderNums.push(newNum);
    }
  }
  return chuteLadderNums
}

let chutes = [];
let ladders = [];
//divide chute/ladder spaces into five each
function divideChutesAndLadders (chuteLadderNums, numSpaces) {
  //place ladders on numbers < 11; place chutes on numbers between 90-99
  for(let i = 0; i < chuteLadderNums.length; i++) {
    if(chuteLadderNums[i] <= 10){
      ladders.push(chuteLadderNums[i])
      chuteLadderNums[i] = 0;      //thought this would be more efficient than splicing
    } else if(chuteLadderNums[i] >= numSpaces - 10 && chuteLadderNums < numSpaces) {
      chutes.push(chuteLadderNums[i])
      chuteLadderNums[i] = 0;     //again, thought this would be more efficient than splicing
    }
  }
  console.log("First chutes: " + chutes + " First ladders: " + ladders);
  //fill remaining chutes and ladders to be 5 each, prioritizing array with less
  for(let i = 0; i < chuteLadderNums.length; ++i){
    if(chuteLadderNums[i] == 0) {
      continue;
    }
    if(chutes.length > ladders.length) {
      ladders.push(chuteLadderNums[i]);
    }else {
      chutes.push(chuteLadderNums[i]);
    }
  }
  console.log("Chutes: " + chutes + " Ladders: " + ladders);
}

function determineChuteDestination (chutes, board) {
  console.log(chutes)
  for(let i = 0; i < chutes.length; ++i){
    let dest = generateRandomNumber(chutes[i]);
    console.log("destination space for the chute: " + dest)
    if(chutes[i] - dest > 40){
      dest = 0;
      --i;
    }
    if (dest != 0){
      console.log("chute at: " + chutes[i])
      console.log(board[chutes[i]-1].value)
      board[chutes[i]-1].special = dest
    }
  }
}

function determineLadderDestination (ladders, board) {
  console.log(ladders)
  for(let i = 0; i < ladders.length; ++i){
    let dest = generateRandomNumber(ladders[i]);
    console.log("destination space for the ladder: " + dest)
    if(ladders[i] + dest > 40){
      dest = 0;
      --i;
    }
    if (dest != 0){
      console.log("ladder at: " + ladders[i])
      console.log(board[ladders[i]-1].value)
      board[ladders[i]-1].special = dest
    }
  }
}
let chutesLaddersStart = plotChuteLadderSpaces(4, 20);
console.log(chutesLaddersStart);
divideChutesAndLadders(chutesLaddersStart, board.length)
determineChuteDestination(chutes, board);
determineLadderDestination(ladders, board);*/

