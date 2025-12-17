// Mapping des images de café
// Ajoutez ici toutes vos images pour qu'elles soient disponibles dynamiquement
// IMPORTANT: Les images doivent exister dans src/assets/images/coffee/

const imageMap: { [key: string]: any } = {
  // Décommentez les lignes ci-dessous quand vous ajouterez vos images :
  // 'cappuccino1.png': require('../../assets/images/coffee/cappuccino1.png'),
  // 'cappuccino2.png': require('../../assets/images/coffee/cappuccino2.png'),
  // 'cappuccino3.png': require('../../assets/images/coffee/cappuccino3.png'),
  // 'espresso1.png': require('../../assets/images/coffee/espresso1.png'),
  // 'latte1.png': require('../../assets/images/coffee/latte1.png'),
  // 'americano1.png': require('../../assets/images/coffee/americano1.png'),
  // Ajoutez vos nouvelles images ici :
  // 'nouveau_produit.png': require('../../assets/images/coffee/nouveau_produit.png'),
};

export const getCoffeeImage = (imagePath: string): any => {
  if (imageMap[imagePath]) {
    return imageMap[imagePath];
  }
  // Si l'image n'existe pas, retourner null
  // Les composants afficheront un placeholder
  console.warn(`Image not found in imageMap: ${imagePath}. Add it to imageMap.ts`);
  return null;
};

export default imageMap;

