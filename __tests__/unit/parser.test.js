import * as Parser from '../../scripts/parser';

test('Correctly simplifies region/door for Owl Flights', () => {
    const expected = ['Death Mountain Trail', 'DMT Owl Flight']
    expect(Parser.AdjustNodeNames('DMT Owl Flight', 'Kak Impas Rooftop')).toEqual(expected)
})