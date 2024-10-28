import { BaseEntity } from './base.entity';

class MockImpl extends BaseEntity {
  id!: string;
}

describe('Base entity', () => {
  it('Should have base properties available in class implementation', () => {
    const mockId = 'mock-uuid';
    const res = new MockImpl({
      id: mockId,
    });

    expect(res).toBeInstanceOf(BaseEntity);
    expect(res.id).toBe(mockId);
  });
});
