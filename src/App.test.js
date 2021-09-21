import { render, screen } from '@testing-library/react';
import App,{randomNumber,hiddenRandomNumber, testInput} from './App';

test('renders learn react link', () => {
  render(<App />);
});

describe('Function for Generating Random Number', () => {
  it('Function for Generating Random Number', () => {
    expect(randomNumber()).not.toBe(null)
  })
  it('Number should be unique', () => {
    expect(hiddenRandomNumber(randomNumber())).toBe(true)
    expect(hiddenRandomNumber(1234)).toBe(false)
  })
})

describe('inputData will be Unique', () => {
  const result = testInput('1234', '1234')
  it('Needs to chekc if there is input', () => {
    expect (typeof result).toBe('object')
    expect (result.inputData && result.cow >= 0 && result.bull >=0).toBe(true)
  })
})

