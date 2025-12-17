# Images de produits de café

Placez vos images de produits de café dans ce dossier.

## Structure recommandée

```
src/assets/images/coffee/
  ├── cappuccino1.png
  ├── cappuccino2.png
  ├── cappuccino3.png
  ├── espresso1.png
  ├── latte1.png
  ├── americano1.png
  └── ...
```

## Spécifications des images

- **Format** : PNG ou JPG
- **Taille recommandée** : 400x400px (ratio 1:1)
- **Qualité** : Haute résolution pour un meilleur rendu
- **Nom** : Utilisez des noms descriptifs (ex: `cappuccino1.png`)

## Comment utiliser

Dans `src/data/coffeeData.ts`, utilisez :

```typescript
{
  id: '1',
  name: 'Cappuccino',
  description: 'With Oat Milk',
  price: 4.20,
  image: require('../../assets/images/coffee/cappuccino1.png'),
  category: 'Cappuccino',
  rating: 4.5,
  size: ['S', 'M', 'L'],
}
```

## Note

Les emojis ne sont plus utilisés pour les produits. Seules les images sont acceptées.
Les emojis sont uniquement utilisés pour les catégories dans la navigation.


