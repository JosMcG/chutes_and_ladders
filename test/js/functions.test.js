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
import {expect,test} from '@jest/globals';
import { generateRandomNumber } from '../../src/js/model/functions'

//This test seems redundant since it is being tested in the Die rolls() test.
//What is the best way to test a function used by another function?
test('test random number function', () => {
  let ranNum;
  for(let i = 1; i < 100; i++) {
    ranNum = generateRandomNumber(i);
    expect(ranNum).toBeGreaterThanOrEqual(1);
    expect(ranNum).toBeLessThanOrEqual(i);
  }
})
