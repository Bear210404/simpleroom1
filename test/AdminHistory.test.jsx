import { render, screen, waitFor } from '@testing-library/react';
import AdminHistory from '@/app/admin/history/page'; // Asumsikan AdminHistory diekspor dari sini
import { vi } from 'vitest';

// Mock supabase
vi.mock('@/lib/supabaseClient', () => ({
supabase: {
from: () => ({
select: () => ({
order: () => ({
data: [
{
id: 1,
client_name: 'test@email.com',
date: '2025-06-01',
session: 1,
rooms: { name: 'Ruang A' }
}
],
error: null
})
})
})
}
}));

describe('AdminHistory', () => {
it('menampilkan data reservasi', async () => {
render(<AdminHistory />);
expect(screen.getByText('Loading...')).toBeInTheDocument();

await waitFor(() => {
  expect(screen.getByText('ID Reservasi: 1')).toBeInTheDocument();
  expect(screen.getByText('Client: test@email.com')).toBeInTheDocument();
  expect(screen.getByText('Ruangan: Ruang A')).toBeInTheDocument();
});
});
});