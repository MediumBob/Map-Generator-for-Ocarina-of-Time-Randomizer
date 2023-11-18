import * as Parser from '../../scripts/parser';

// tests for AdjustNodeNames (26 total)
describe('Parser.AdjustNodeNames', () => {
  test('should return "Kokiri Forest" for "KF"', () => {
    expect(Parser.AdjustNodeNames('KF')).toBe('Kokiri Forest');
  });
  test('should return "Lost Woods" for "LW"', () => {
    expect(Parser.AdjustNodeNames('LW')).toBe('Lost Woods');
  });
  test('should return "Hyrule Field" for "HF"', () => {
    expect(Parser.AdjustNodeNames('HF')).toBe('Hyrule Field');
  });
  test('should return "Market" for "Market"', () => {
    expect(Parser.AdjustNodeNames('Market')).toBe('Market');
  });
  test('should return "Market Entrance" for "Market Entrance"', () => {
    expect(Parser.AdjustNodeNames('Market Entrance')).toBe('Market Entrance');
  });
  test('should return "Castle Grounds" for "Castle Grounds"', () => {
    expect(Parser.AdjustNodeNames('Castle Grounds')).toBe('Castle Grounds');
  });
  test('should return "Temple of Time Exterior" for "ToT"', () => {
    expect(Parser.AdjustNodeNames('ToT')).toBe('Temple of Time Exterior');
  });
  test('should return "Kakariko Village" for "Kak"', () => {
    expect(Parser.AdjustNodeNames('Kak')).toBe('Kakariko Village');
  });
  test('should return "Graveyard" for "Graveyard"', () => {
    expect(Parser.AdjustNodeNames('Graveyard')).toBe('Graveyard');
  });
  test('should return "Death Mountain Trail" for "DMT" or "Death Mountain"', () => {
    expect(Parser.AdjustNodeNames('DMT')).toBe('Death Mountain Trail');
    expect(Parser.AdjustNodeNames('Death Mountain')).toBe('Death Mountain Trail');
  });
  test('should return "Death Mountain Crater" for "DMC"', () => {
    expect(Parser.AdjustNodeNames('DMC')).toBe('Death Mountain Crater');
  });
  test('should return "Goron City" for "GC"', () => {
    expect(Parser.AdjustNodeNames('GC')).toBe('Goron City');
  });
  test('should return "Lake Hylia" for "LH"', () => {
    expect(Parser.AdjustNodeNames('LH')).toBe('Lake Hylia');
  });
  test('should return "Zora River" for "ZR"', () => {
    expect(Parser.AdjustNodeNames('ZR')).toBe('Zora River');
  });
  test('should return "Zoras Domain" for "ZD"', () => {
    expect(Parser.AdjustNodeNames('ZD')).toBe('Zoras Domain');
  });
  test('should return "Zoras Fountain" for "ZF"', () => {
    expect(Parser.AdjustNodeNames('ZF')).toBe('Zoras Fountain');
  });
  test('should return "Sacred Forest Meadow" for "SFM"', () => {
    expect(Parser.AdjustNodeNames('SFM')).toBe('Sacred Forest Meadow');
  });
  test('should return "Gerudo Valley" for "GV"', () => {
    expect(Parser.AdjustNodeNames('GV')).toBe('Gerudo Valley');
  });
  test('should return "Gerudo Fortress" for "GF"', () => {
    expect(Parser.AdjustNodeNames('GF')).toBe('Gerudo Fortress');
  });
  test('should return "Haunted Wasteland" for "Wasteland"', () => {
    expect(Parser.AdjustNodeNames('Wasteland')).toBe('Haunted Wasteland');
  });
  test('should return "Desert Colossus" for "Desert Colossus"', () => {
    expect(Parser.AdjustNodeNames('Desert Colossus')).toBe('Desert Colossus');
  });
  test('should return "Lon Lon Ranch" for "LLR Stables"', () => {
    expect(Parser.AdjustNodeNames('LLR Stables')).toBe('Lon Lon Ranch');
  });
  test('should return "Jabu Jabus Belly" for "Jabu Jabus Belly Boss Door"', () => {
    expect(Parser.AdjustNodeNames('Jabu Jabus Belly Boss Door')).toBe("Jabu Jabus Belly");
  });
  test('should return "Ice Cavern" for "Ice Cavern Beginning"', () => {
    expect(Parser.AdjustNodeNames('Ice Cavern Beginning')).toBe("Ice Cavern");
  });
  test('should return "Forest Temple" for "Forest Temple Lobby"', () => {
    expect(Parser.AdjustNodeNames('Forest Temple Lobby')).toBe("Forest Temple");
  });
  test('should make no adjustments for any other input', () => {
    expect(Parser.AdjustNodeNames('Any Other Input')).toBe('Any Other Input');
  });
});


// tests for GetNodeType (X Total)
describe('Parser.GetNodeType', () => {
    
});