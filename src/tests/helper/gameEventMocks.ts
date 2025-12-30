
export const mockQuery = jest.fn();

jest.mock('../../src/database', () => ({
    query: mockQuery
}));

export const getMockPlayerId = () => {
    return '550e8400-e29b-41d4-a716-446655440000';
}
export const getRandomEventId = () => {
    return crypto.randomUUID();
}


