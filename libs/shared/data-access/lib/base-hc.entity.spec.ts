import { BaseHCEntity } from './base-hc.entity';

class MockImpl extends BaseHCEntity {}

describe('Base HC entity', () => {
  it('Should have base properties available in class implementation', () => {
    const mockId = 1;
    const mockSfId = 'mock-sfid';
    const mockName = 'mock-name';
    const mockDate = new Date();
    const res = new MockImpl({
      id: mockId,
      sfid: mockSfId,
      name: mockName,
      createddate: mockDate,
      lastmodifieddate: mockDate,
    });

    expect(res).toBeInstanceOf(BaseHCEntity);
    expect(res.id).toBe(mockId);
    expect(res.sfid).toBe(mockSfId);
    expect(res.name).toBe(mockName);
    expect(res.createddate).toBe(mockDate);
    expect(res.lastmodifieddate).toBe(mockDate);
  });
});
