import { BasePublicEntity } from './base-public.entity';

class MockImpl extends BasePublicEntity {}

describe('Base Public entity', () => {
  it('Should have base properties available in class implementation', () => {
    const mockId = 'mock-uuid';
    const res = new MockImpl({
      id: mockId,
    });

    expect(res).toBeInstanceOf(BasePublicEntity);
    expect(res.id).toBe(mockId);
  });
});
