# Configuration des variables d'environnement Vercel

Pour que l'application fonctionne correctement en production sur Vercel, vous devez configurer les variables d'environnement suivantes :

## Variables requises

1. `VITE_BLINK_PROJECT_ID` : ID de votre projet Blink
2. `VITE_BLINK_PUBLISHABLE_KEY` : Clé publishable de votre projet Blink

## Comment configurer sur Vercel

1. Allez dans votre dashboard Vercel
2. Sélectionnez votre projet
3. Cliquez sur "Settings" → "Environment Variables"
4. Ajoutez les variables suivantes :

```
VITE_BLINK_PROJECT_ID=votre_project_id
VITE_BLINK_PUBLISHABLE_KEY=votre_publishable_key
```

## Mode dégradé

Si ces variables ne sont pas configurées, l'application fonctionnera en mode dégradé avec :
- Données mockées pour le marketplace
- Messages d'avertissement dans la console
- Services de réservation et profil indisponibles

L'application ne plantera plus et affichera les données de démonstration.
