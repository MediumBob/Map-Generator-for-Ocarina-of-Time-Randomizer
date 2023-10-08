import * as Parser from '../../scripts/parser';

// tests for AdjustNodeNames (26 total)
describe('Parser.AdjustNodeNames', () => {
  // test 1
  test('should return "Kokiri Forest" for "KF"', () => {
    expect(Parser.AdjustNodeNames('KF')).toBe('Kokiri Forest');
  });
  // test 2
  test('should return "Lost Woods" for "LW"', () => {
    expect(Parser.AdjustNodeNames('LW')).toBe('Lost Woods');
  });
  // test 3
  test('should return "Hyrule Field" for "HF"', () => {
    expect(Parser.AdjustNodeNames('HF')).toBe('Hyrule Field');
  });
  // test 4
  test('should return "Market" for "Market"', () => {
    expect(Parser.AdjustNodeNames('Market')).toBe('Market');
  });
  // test 5
  test('should return "Market Entrance" for "Market Entrance"', () => {
    expect(Parser.AdjustNodeNames('Market Entrance')).toBe('Market Entrance');
  });
  // test 6
  test('should return "Castle Grounds" for "Castle Grounds"', () => {
    expect(Parser.AdjustNodeNames('Castle Grounds')).toBe('Castle Grounds');
  });
  // test 7
  test('should return "Temple of Time Exterior" for "ToT"', () => {
    expect(Parser.AdjustNodeNames('ToT')).toBe('Temple of Time Exterior');
  });
  // test 8
  test('should return "Kakariko Village" for "Kak"', () => {
    expect(Parser.AdjustNodeNames('Kak')).toBe('Kakariko Village');
  });
  // test 9
  test('should return "Graveyard" for "Graveyard"', () => {
    expect(Parser.AdjustNodeNames('Graveyard')).toBe('Graveyard');
  });
  // test 10
  test('should return "Death Mountain Trail" for "DMT" or "Death Mountain"', () => {
    expect(Parser.AdjustNodeNames('DMT')).toBe('Death Mountain Trail');
    expect(Parser.AdjustNodeNames('Death Mountain')).toBe('Death Mountain Trail');
  });
  // test 11
  test('should return "Death Mountain Crater" for "DMC"', () => {
    expect(Parser.AdjustNodeNames('DMC')).toBe('Death Mountain Crater');
  });
  // test 12
  test('should return "Goron City" for "GC"', () => {
    expect(Parser.AdjustNodeNames('GC')).toBe('Goron City');
  });
  // test 13
  test('should return "Lake Hylia" for "LH"', () => {
    expect(Parser.AdjustNodeNames('LH')).toBe('Lake Hylia');
  });
  // test 14
  test('should return "Zora River" for "ZR"', () => {
    expect(Parser.AdjustNodeNames('ZR')).toBe('Zora River');
  });
  // test 15
  test('should return "Zoras Domain" for "ZD"', () => {
    expect(Parser.AdjustNodeNames('ZD')).toBe('Zoras Domain');
  });
  // test 16
  test('should return "Zoras Fountain" for "ZF"', () => {
    expect(Parser.AdjustNodeNames('ZF')).toBe('Zoras Fountain');
  });
  // test 17
  test('should return "Sacred Forest Meadow" for "SFM"', () => {
    expect(Parser.AdjustNodeNames('SFM')).toBe('Sacred Forest Meadow');
  });
  // test 18
  test('should return "Gerudo Valley" for "GV"', () => {
    expect(Parser.AdjustNodeNames('GV')).toBe('Gerudo Valley');
  });
  // test 19
  test('should return "Gerudo Fortress" for "GF"', () => {
    expect(Parser.AdjustNodeNames('GF')).toBe('Gerudo Fortress');
  });
  // test 20
  test('should return "Haunted Wasteland" for "Wasteland"', () => {
    expect(Parser.AdjustNodeNames('Wasteland')).toBe('Haunted Wasteland');
  });
  // test 21
  test('should return "Desert Colossus" for "Desert Colossus"', () => {
    expect(Parser.AdjustNodeNames('Desert Colossus')).toBe('Desert Colossus');
  });
  // test 22
  test('should return "Lon Lon Ranch" for "LLR Stables"', () => {
    expect(Parser.AdjustNodeNames('LLR Stables')).toBe('Lon Lon Ranch');
  });
  // test 23
  test('should return "Jabu Jabus Belly" for "Jabu Jabus Belly Boss Door"', () => {
    expect(Parser.AdjustNodeNames('Jabu Jabus Belly Boss Door')).toBe("Jabu Jabus Belly");
  });
  // test 24
  test('should return "Ice Cavern" for "Ice Cavern Beginning"', () => {
    expect(Parser.AdjustNodeNames('Ice Cavern Beginning')).toBe("Ice Cavern");
  });
  // test 25
  test('should return "Forest Temple" for "Forest Temple Lobby"', () => {
    expect(Parser.AdjustNodeNames('Forest Temple Lobby')).toBe("Forest Temple");
  });
  // test 26
  test('should make no adjustments for any other input', () => {
    expect(Parser.AdjustNodeNames('Any Other Input')).toBe('Any Other Input');
  });
});


// tests for GetNodeType (X Total)
describe('Parser.GetNodeType', () => {
    
});