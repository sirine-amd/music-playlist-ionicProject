export interface Song {
  id: string;
  artiste: string;
  catégorie: string; // Changed from 'catégorie' to 'categorie'
  réaliser: Date; // Changed from 'réaliser' to 'realiser'
  titre: string;
  userId?: string; // Optional property
}