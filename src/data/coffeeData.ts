// Types
export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  category: string;
  rating: number;
  size: string[];
  LevelSugar: string[];

}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Catégories disponibles
export const categories: Category[] = [
  { id: '1', name: 'Cappuccino', icon: '☕' },
  { id: '2', name: 'Espresso', icon: '☕' },
  { id: '3', name: 'Latte', icon: '☕' },
  { id: '4', name: 'Americano', icon: '☕' },
];


// Liste des produits avec leurs images
export const coffeeList: Coffee[] = [
  {
    id: '1',
    name: 'Cappuccino',
    description: 'With Oat Milk',
    price: 4.20,
    image: require('../assets/images/coffee/Cappuccino.png'),
    category: 'Cappuccino',
    rating: 4.5,
    size: ['Small', 'Medium', 'Large'],
    LevelSugar: ['No Sugar','Low', 'Medium']
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'With Ice',
    price: 3.50,
    image: require('../assets/images/coffee/chocolat chaud.png'),
    category: 'Cappuccino',
    rating: 4.8,
    size: ['Small', 'Medium', 'Large'],
    LevelSugar: ['No Sugar','Low', 'Medium']
  },
  {
    id: '3',
    name: 'Espresso',
    description: 'Classic Espresso',
    price: 2.50,
    image: require('../assets/images/coffee/espresso2.png'), // Remplacez par require('../assets/images/coffee/espresso1.png') quand disponible
    category: 'Espresso',
    rating: 4.3,
    size: ['Small', 'Medium', 'Large'],
    LevelSugar: ['No Sugar','Low', 'Medium']
  },
  {
    id: '4',
    name: 'Latte',
    description: 'With Vanilla',
    price: 4.50,
    image: require('../assets/images/coffee/latte1.png'), // Remplacez par require('../assets/images/coffee/latte1.png') quand disponible
    category: 'Latte',
    rating: 4.7,
    size: ['Small', 'Medium', 'Large'],
    LevelSugar: ['No Sugar','Low', 'Medium']
  },
  {
    id: '5',
    name: 'Americano',
    description: 'Classic Americano',
    price: 3.00,
    image: require('../assets/images/coffee/americano.png'), // Remplacez par require('../assets/images/coffee/americano1.png') quand disponible
    category: 'Americano',
    rating: 4.2,
    size: ['Small', 'Medium', 'Large'],
    LevelSugar: ['No Sugar','Low', 'Medium']
  },
  {
    id: '6',
    name: 'Cappuccino',
    description: 'With Caramel',
    price: 4.80,
    image: require('../assets/images/coffee/Cappuccino.png'),
    category: 'Cappuccino',
    rating: 4.9,
    size: ['Small', 'Medium', 'Large'],
    LevelSugar: ['No Sugar','Low', 'Medium']
  },
  {
    id: '7',
    name: 'Espresso',
    description: 'special Espresso',
    price: 3.50,
    image: require('../assets/images/coffee/espresso1.png') ,
    category: 'Espresso',
    rating: 4.0,
    size: ['Small', 'Medium', 'Large'],
    LevelSugar: ['No Sugar','Low', 'Medium']
  },
];
