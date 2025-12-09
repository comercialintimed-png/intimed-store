// Configura tu API key de Base44 aquí
const BASE44_API_KEY = import.meta.env.VITE_BASE44_API_KEY || 'tu-key-aqui';
const BASE44_BASE_URL = import.meta.env.VITE_BASE44_BASE_URL || 'https://tu-proyecto.base44.com';

export const base44 = {
  auth: {
    me: async () => {
      // Simula auth - reemplaza con real base44.auth.me()
      return { role: 'user' };
    },
    logout: () => console.log('Logout'),
  },
  entities: {
    Equipment: {
      list: async (sort = '-created_date') => {
        // Simula data de equipos - reemplaza con base44.entities.Equipment.list(sort)
        return [
          { id: 1, name: 'Equipo 1', description: 'Descripción', category: 'cat1', is_featured: true },
          { id: 2, name: 'Equipo 2', description: 'Descripción', category: 'cat2', is_featured: false },
          // Agrega más datos de prueba
        ];
      },
    },
    Category: {
      list: async () => [
        { id: 'all', name: 'Todos' },
        { id: 'cat1', name: 'Categoría 1' },
        { id: 'cat2', name: 'Categoría 2' },
      ],
    },
  },
};
