# Guide : Utilisation du fichier JSON pour les produits

## 📋 Structure

Les données des produits sont maintenant dans un fichier JSON : `src/data/coffee.json`

## ✏️ Comment ajouter un nouveau produit

### 1. Ajoutez votre image

Placez votre image dans `src/assets/images/coffee/` (ex: `nouveau_produit.png`)

### 2. Ajoutez l'image dans le mapping

Ouvrez `src/data/imageMap.ts` et ajoutez votre image :

```typescript
const imageMap: { [key: string]: any } = {
  // ... images existantes ...
  'nouveau_produit.png': require('../../assets/images/coffee/nouveau_produit.png'),
};
```

### 3. Ajoutez le produit dans le JSON

Ouvrez `src/data/coffee.json` et ajoutez votre produit dans le tableau `coffees` :

```json
{
  "id": "7",
  "name": "Cappuccino",
  "description": "With Cinnamon",
  "price": 4.50,
  "imagePath": "nouveau_produit.png",
  "category": "Cappuccino",
  "rating": 4.6,
  "size": ["S", "M", "L"]
}
```

## 📝 Format du JSON

### Structure d'un produit

```json
{
  "id": "string",           // ID unique
  "name": "string",         // Nom du produit
  "description": "string",  // Description
  "price": number,          // Prix en dollars
  "imagePath": "string",    // Nom du fichier image (ex: "cappuccino1.png")
  "category": "string",     // Catégorie (doit exister dans categories)
  "rating": number,         // Note (0-5)
  "size": ["S", "M", "L"]   // Tailles disponibles
}
```

### Structure d'une catégorie

```json
{
  "id": "string",    // ID unique
  "name": "string",  // Nom de la catégorie
  "icon": "string"   // Emoji pour l'icône
}
```

## 🔄 Exemple complet

### 1. Ajouter l'image dans `imageMap.ts`

```typescript
const imageMap: { [key: string]: any } = {
  'cappuccino1.png': require('../../assets/images/coffee/cappuccino1.png'),
  'nouveau_cappuccino.png': require('../../assets/images/coffee/nouveau_cappuccino.png'), // Nouveau
};
```

### 2. Ajouter le produit dans `coffee.json`

```json
{
  "coffees": [
    {
      "id": "7",
      "name": "Cappuccino",
      "description": "With Cinnamon",
      "price": 4.50,
      "imagePath": "nouveau_cappuccino.png",
      "category": "Cappuccino",
      "rating": 4.6,
      "size": ["S", "M", "L"]
    }
  ]
}
```

## ✅ Avantages

1. **Facilité d'édition** : Modifiez simplement le JSON sans toucher au code
2. **Séparation des données** : Les données sont séparées de la logique
3. **Facilité de maintenance** : Plus facile d'ajouter/modifier des produits
4. **Peut être chargé depuis une API** : Structure prête pour une future intégration API

## ⚠️ Important

- **imagePath** doit correspondre exactement au nom du fichier dans `imageMap.ts`
- Les images doivent être ajoutées dans `imageMap.ts` pour être disponibles
- Le **category** doit exister dans le tableau `categories`
- Chaque produit doit avoir un **id unique**

