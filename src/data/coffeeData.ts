import coffeeData from './coffee.json';
import { getCoffeeImage } from './imageMap';

export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;
  image: any;
  category: string;
  rating: number;
  size: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CoffeeJson {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  category: string;
  rating: number;
  size: string[];
}

interface CategoryJson {
  id: string;
  name: string;
  icon: string;
}

// Charger les catégories depuis JSON
export const categories: Category[] = (coffeeData.categories as CategoryJson[]).map(
  (cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
  })
);

// Charger les produits depuis JSON et mapper les images
export const coffeeList: Coffee[] = (coffeeData.coffees as CoffeeJson[]).map(
  (coffee) => ({
    id: coffee.id,
    name: coffee.name,
    description: coffee.description,
    price: coffee.price,
    image: getCoffeeImage(coffee.imagePath), // Convertir le chemin en image
    category: coffee.category,
    rating: coffee.rating,
    size: coffee.size,
  })
);
