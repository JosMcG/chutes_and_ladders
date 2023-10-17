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
import { Space, SpaceType } from "./space.js"

export class Board {
  #Start
  #numSpaces
  #End

  constructor (numSpaces) {
    this.#Start = new Space(1, SpaceType.START);
    this.#numSpaces = numSpaces;
  }

  get spaces() {
    return this.#Start;
  }

  setUpBoard(){
    let curSpace = this.#Start
    let nextSpace;
    for(let n = 1; n < this.#numSpaces; n++){
      if(n < this.#numSpaces - 1){
        nextSpace = new Space(n+1, SpaceType.NORMAL);
        curSpace.next = nextSpace;
        nextSpace.previous = curSpace;
        curSpace = nextSpace;
      } else{
        this.#End = new Space(n+1, SpaceType.END);
        curSpace.next = this.#End;
        this.#End.previous = curSpace;
        curSpace = this.#End;
      }   
    } 
  }



  display () {
    let cur = this.#End
    let arr = [];
    while(cur) {
      if(Math.floor(cur.value/10) % 2 == 0){
        for(let n = 0; n < 10; n++){
          process.stdout.write(' ' + cur.value + ' ')
          cur = cur.previous 
        }
      } else {
          arr.push(cur.value)
          for(let n = 1; n < 10; n++){
            arr.push(cur.previous.value)
            cur = cur.previous
          }
          cur = cur.previous;
          let arrLength = arr.length
          for(let n = 0; n < arrLength; n++) {
            process.stdout.write(' ' + arr.pop(n) + ' ')
          }
      }
      console.log()
    }
  }
  
}


const chutesAndLadders = new Board(100);
chutesAndLadders.setUpBoard();
chutesAndLadders.display();

