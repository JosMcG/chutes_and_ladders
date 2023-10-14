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
import { Die, SummedRolls } from '../../src/js/model/die'


test('Test 6 sided die for 100 rolls', () =>{
  const d = new Die(6);
  for(let i = 1; i < 100; i++) {
    expect(d.roll()).toBeGreaterThanOrEqual(1);
    expect(d.roll()).toBeLessThanOrEqual(6);
  }
})
describe('Testing rolls() for proper length and variance in resulting numbers', () => {
    const d = new Die(10);
    const rolls = d.rollMultiple(1000);
  test('Test rolling multiple times', () => {
    expect(rolls).toHaveLength(1000);
  })
  test('Check to ensure each number has been rolled at least once', () => {
    for(let n = 1; n <= 10; n++){
      expect(rolls.includes(n)).toBeTruthy();
    }    
  })
})



test('Test rollMultipleAndSum for returning a SummedRolls object', () => {
  const d = new Die(6);
  expect(d.rollMultipleAndSum(5)).toBeInstanceOf(SummedRolls);
})

test('Test SummedRolls with mock values for containing the properties', () => {
  let mockSummedRolls = new SummedRolls([3, 2, 4, 5]);
  expect(mockSummedRolls).toBeTruthy();
  expect(mockSummedRolls.sum).toBeTruthy();
  expect(mockSummedRolls.rolls).toBeTruthy();
  expect(mockSummedRolls.sum).toEqual(14);
})

test('Test the sum of rolling a 6-sided die 20 times lies between 20 and 120', () => {
  const d = new Die(6);
  const s = d.rollMultipleAndSum(20);
  expect(s.sum).toBeGreaterThanOrEqual(20);
  expect(s.sum).toBeLessThanOrEqual(120);
})

test('Test summing the rolls of different dice, so the total sum lies between the min and max possible', () => {
  const d6 = new Die(6);
  const d4 = new Die(4);
  const s_d6 = d6.rollMultipleAndSum(20);
  const s_d4 = d4.rollMultipleAndSum(20);
  expect(s_d6.sum + s_d4.sum).toBeGreaterThanOrEqual(40);
  expect(s_d6.sum + s_d4.sum).toBeLessThanOrEqual(200);
})