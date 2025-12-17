# Guide : Consultation des Commandes

## 📍 Où consulter vos commandes

### 1. Dans l'application (Interface)

1. Allez dans l'onglet **Profile** (👤)
2. Cliquez sur **"Mes Commandes"** (📦)
3. Vous verrez toutes vos commandes avec :
   - ID de commande
   - Date et heure
   - Statut (En attente, En préparation, Prêt, Terminé)
   - Liste des articles
   - Total

### 2. Fichier JSON

Les commandes sont sauvegardées dans :
```
src/data/orders.json
```

**Format du fichier :**
```json
{
  "orders": [
    {
      "id": "ORDER-1735123456789",
      "items": [
        {
          "id": "1-S-1735123456789",
          "coffeeId": "1",
          "coffeeName": "Cappuccino",
          "coffeeDescription": "With Oat Milk",
          "size": "M",
          "quantity": 2,
          "price": 4.2
        }
      ],
      "total": 8.4,
      "date": "2024-12-25T10:30:00.000Z",
      "status": "completed"
    }
  ]
}
```

## 🔄 Comment ça fonctionne

### Sauvegarde automatique
- Chaque fois que vous faites un checkout, la commande est automatiquement sauvegardée
- Les commandes sont stockées dans AsyncStorage (persistance locale)
- Le fichier `orders.json` est un exemple/template

### Export JSON
Dans l'écran "Mes Commandes", cliquez sur l'icône 📄 en haut à droite pour :
- Voir toutes les commandes au format JSON
- Partager/Exporter les commandes

## 📝 Structure d'une commande

```json
{
  "id": "ORDER-XXXXXXXXX",           // ID unique de la commande
  "items": [                         // Liste des articles
    {
      "id": "item-id",
      "coffeeId": "1",               // ID du produit
      "coffeeName": "Cappuccino",    // Nom du produit
      "coffeeDescription": "...",    // Description
      "size": "M",                   // Taille
      "quantity": 2,                 // Quantité
      "price": 4.2                   // Prix unitaire
    }
  ],
  "total": 8.4,                      // Total de la commande
  "date": "2024-12-25T10:30:00.000Z", // Date ISO
  "status": "completed"              // Statut: pending, preparing, ready, completed
}
```

## 🔍 Statuts des commandes

- **pending** : En attente
- **preparing** : En préparation
- **ready** : Prête
- **completed** : Terminée

## 💡 Notes

- Les commandes sont sauvegardées localement sur l'appareil
- Le fichier `orders.json` est un template/exemple
- Pour voir les vraies commandes, utilisez l'interface ou l'export JSON dans l'app
- Les commandes persistent même après fermeture de l'application

