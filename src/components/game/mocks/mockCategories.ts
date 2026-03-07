import type { MashGameCategories } from '@/components/game/types.ts'

export const mockCategories = {
  partner: [
    { id: 'd3f1a9b2-6c4e-4f2a-9b7e-1a2c3d4e5f60', value: 'Jorja Smith' },
    { id: 'a7b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b61', value: 'Beyonce' },
    { id: 'b1c2d3e4-f5a6-48b7-9c0d-2e3f4a5b6c62', value: 'Rihanna' },
    { id: 'c2d3e4f5-a6b7-49c8-0d1e-3f4a5b6c7d63', value: 'Tems' },
  ],
  children: [
    { id: 'e3f4a5b6-c7d8-40e9-1f2a-4b5c6d7e8f64', value: '1' },
    { id: 'f4a5b6c7-d8e9-41f0-2a3b-5c6d7e8f9a65', value: '2' },
    { id: 'a5b6c7d8-e9f0-42a1-3b4c-6d7e8f9a0b66', value: '3' },
    { id: 'b6c7d8e9-f0a1-43b2-4c5d-7e8f9a0b1c67', value: '4' },
  ],
  job: [
    { id: 'c7d8e9f0-a1b2-44c3-5d6e-8f9a0b1c2d68', value: 'Music Artist' },
    { id: 'd8e9f0a1-b2c3-45d4-6e7f-9a0b1c2d3e69', value: 'Doctor' },
    { id: 'e9f0a1b2-c3d4-46e5-7f8a-0b1c2d3e4f6a', value: 'Software Engineer' },
    { id: 'f0a1b2c3-d4e5-47f6-8a9b-1c2d3e4f5a6b', value: 'Architect' },
  ],
  salary: [
    { id: 'a1b2c3d4-e5f6-48a7-9b0c-2d3e4f5a6b7c', value: '1000000' },
    { id: 'b2c3d4e5-f6a7-49b8-0c1d-3e4f5a6b7c8d', value: '130000' },
    { id: 'c3d4e5f6-a7b8-40c9-1d2e-4f5a6b7c8d9e', value: '250000' },
    { id: 'd4e5f6a7-b8c9-41d0-2e3f-5a6b7c8d9e0f', value: '500000' },
  ],
  car: [
    { id: 'e5f6a7b8-c9d0-42e1-3f4a-6b7c8d9e0f10', value: 'Bentley' },
    { id: 'f6a7b8c9-d0e1-43f2-4a5b-7c8d9e0f1011', value: 'Aston Martin' },
    { id: 'a7b8c9d0-e1f2-44a3-5b6c-8d9e0f101112', value: 'Mercedes-Benz' },
    { id: 'b8c9d0e1-f2a3-45b4-6c7d-9e0f10111213', value: 'Ferrari' },
  ],
  location: [
    { id: 'c9d0e1f2-a3b4-46c5-7d8e-0f1011121314', value: 'London' },
    { id: 'd0e1f2a3-b4c5-47d6-8e9f-101112131415', value: 'New York' },
    { id: 'e1f2a3b4-c5d6-48e7-9f10-111213141516', value: 'Kampala' },
    { id: 'f2a3b4c5-d6e7-49f8-1011-121314151617', value: 'Lagos' },
  ],
} as MashGameCategories
