# ReacTrello

Ce projet est une application mobile permettant de gérer des projets et des tâches associées à la manière d'un trello. Il utilise React Native et Firebase pour le développement et le stockage des données.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

-   Node.js
-   npm (Node Package Manager)

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Exécutez `npm install` pour installer toutes les dépendances.
3. Exécutez l'application avec `npx expo start`

## Fonctionnalités

-   **Ajouter un projet :** Permet aux utilisateurs de créer de nouveaux projets avec un titre et une description.
-   **Modifier un projet :** Permet aux utilisateurs de modifier le titre et la description d'un projet existant.
-   **Supprimer un projet :** Permet aux utilisateurs de supprimer un projet.

-   **Ajouter des tâches :** Les utilisateurs peuvent ajouter des tâches à chaque projet avec un titre, une description et un statut (obligatoire).

-   **Modifier une tâche :** Permet aux utilisateurs de modifier le titre et la description d'une tâche existante.

-   **Supprimer une tâche :** Les utilisateurs peuvent supprimer des tâches individuelles d'un projet.

-   **Modifier un statut :** Les utilisateurs peuvent modifier un statut existant.
-   **Supprimer un status :** Les utilisateurs peuvent supprimer des status individuelles d'un projet.

-   **Visualisation des tâches :** Les tâches sont organisées par statut comme un tableau.
-   **Ajouter un status :** Permet aux utilisateurs de créer de nouveaux status.
-   **Modifier un statut :** Les utilisateurs peuvent modifier un statut existant.
-   **Supprimer un status :** Les utilisateurs peuvent supprimer des status individuelles d'un projet.

## Fonctionnalités avancer

En plus des fonctionnalités de base, cette application propose des fonctionnalités avancées pour améliorer l'expérience utilisateur :

**Vérification par Email lors de l'inscription :** Les utilisateurs doivent vérifier leur adresse e-mail lors de l'inscription en cliquant sur un lien de vérification envoyé à leur adresse e-mail.

**Renvoi d'Email de Vérification lors de la Connexion :** Si un utilisateur tente de se connecter mais n'a pas encore vérifié son adresse e-mail, l'application lui donne la possibilité de renvoyer un e-mail de vérification. Cela garantit que tous les utilisateurs ont des adresses e-mail vérifiées et contribue à renforcer la sécurité des comptes.

**Ajout de Membres au Projet :** Les utilisateurs peuvent ajouter des membres à un projet en saisissant leur adresse e-mail. Si l'adresse e-mail appartient à un utilisateur existant dans la base de données, il est automatiquement ajouté au projet.

**Animation d'Apparition des Projets et des Tâches :** L'application utilise des animations pour rendre l'apparition des projets et des tâches plus fluide et attrayante. Les éléments apparaissent de manière progressive pour une expérience visuelle agréable.

**Gestion des images :** Les utilisateurs peuvent ajouter des images à chaque tâche pour illustrer visuellement leur contenu. L'application permet aux utilisateurs de sélectionner une image à partir de leur galerie de photos. Lors du clic sur une image, celle-ci s'ouvrira dans un lien web en plus grand. Il y a aussi la possibilité de télécharger et partager en même temps l'image.

**Suppression d'une image :** Lors d'un clic prolonger sur une image d'une tâche, il vous seras proposer de supprimer l'image.
