# Guide : Comment ajouter de nouveaux produits de café avec des photos

## ⚠️ Important
**Les produits utilisent UNIQUEMENT des images** - Les emojis ne sont plus supportés pour les produits.
**Les emojis sont uniquement utilisés pour les catégories** dans la navigation.

## 📋 Étapes pour ajouter un nouveau produit

### 1. Préparer les images

Placez vos images dans le dossier :
```
src/assets/images/coffee/
```

**Format recommandé :**
- Format : PNG ou JPG
- Taille : 400x400px ou plus (ratio 1:1)
- Qualité : Haute résolution pour un meilleur rendu
- Nom : Utilisez des noms descriptifs (ex: `cappuccino1.png`)

### 2. Ajouter un nouveau produit dans `coffeeList`

Ouvrez le fichier `src/data/coffeeData.ts` et ajoutez votre nouveau produit dans le tableau `coffeeList` :

```typescript
{
  id: '7', // ID unique (incrémentez le numéro)
  name: 'Cappuccino',
  description: 'With Cinnamon',
  price: 4.50, // Prix en dollars
  image: require('../../assets/images/coffee/cappuccino1.png'), // Chemin vers votre image
  category: 'Cappuccino', // Doit correspondre à une catégorie existante
  rating: 4.6,
  size: ['S', 'M', 'L'], // Tailles disponibles
},
```

### 3. Exemple complet

```typescript
export const coffeeList: Coffee[] = [
  // ... produits existants ...
  
  // Nouveau produit avec image (OBLIGATOIRE)
  {
    id: '7',
    name: 'Cappuccino',
    description: 'With Cinnamon',
    price: 4.50,
    image: require('../../assets/images/coffee/cappuccino1.png'),
    category: 'Cappuccino',
    rating: 4.6,
    size: ['S', 'M', 'L'],
  },
  
  {
    id: '8',
    name: 'Mocha',
    description: 'With Chocolate',
    price: 5.00,
    image: require('../../assets/images/coffee/mocha1.png'), // Image obligatoire
    category: 'Cappuccino',
    rating: 4.8,
    size: ['S', 'M', 'L'],
  },
];
```

## 🔄 Utilisation des images

**Méthode recommandée : require() direct**
```typescript
image: require('../../assets/images/coffee/cappuccino1.png'),
```

Le chemin est relatif au fichier `coffeeData.ts` qui se trouve dans `src/data/`.

## 📝 Notes importantes

1. **ID unique** : Chaque produit doit avoir un ID unique
2. **Category** : La catégorie doit exister dans le tableau `categories`
3. **Image obligatoire** : Tous les produits DOIVENT avoir une image (pas d'emojis)
4. **Prix** : En dollars, sera converti automatiquement en RP (Rupiah)
5. **Emojis uniquement pour catégories** : Les emojis sont utilisés uniquement pour les icônes de catégories

## 🎨 Catégories disponibles

- `'Cappuccino'`
- `'Espresso'`
- `'Latte'`
- `'Americano'`

Pour ajouter une nouvelle catégorie, modifiez le tableau `categories` dans le même fichier.

## ✅ Vérification

Après avoir ajouté un produit :
1. Redémarrez Metro bundler (`npm start`)
2. Recompilez l'application
3. Vérifiez que le produit apparaît dans l'écran Home et Menu

## 🐛 Dépannage

**Image ne s'affiche pas ?**
- Vérifiez le chemin de l'image
- Assurez-vous que `imageType: 'image'` est défini
- Vérifiez que l'image existe bien dans le dossier

**Erreur "Cannot find module" ?**
- Vérifiez que le chemin est correct
- Les chemins sont relatifs au fichier `coffeeData.ts`
- Utilisez `require()` si l'import ne fonctionne pas

