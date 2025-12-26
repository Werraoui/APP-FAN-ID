# 🔴 PROBLÈME DIRECT

## Le problème
**Le backend ne démarre pas** → Le frontend ne peut pas se connecter

## Pourquoi le backend ne démarre pas ?
**Erreur MongoDB Atlas** → Le serveur crash avant de démarrer

## Solution immédiate

### Option 1 : Vérifier le mot de passe MongoDB (RECOMMANDÉ)

Votre connection string dans `.env` :
```
CONNEXION_STRING=mongodb+srv://fanid_app:Fanid123@cluster0.uhlr0bj.mongodb.net/fanId?retryWrites=true&w=majority
```

**Le problème peut être :**
1. Le mot de passe `Fanid123` n'est pas correct
2. L'utilisateur `fanid_app` n'existe pas ou a été supprimé

**Solution :**
1. Allez sur MongoDB Atlas
2. Database Access → Vérifiez l'utilisateur `fanid_app`
3. Si l'utilisateur n'existe pas → Créez-le
4. Si l'utilisateur existe → Réinitialisez le mot de passe
5. Mettez à jour le `.env` avec le bon mot de passe

### Option 2 : Utiliser MongoDB local (PLUS SIMPLE)

1. Modifiez `.env` :
```env
CONNEXION_STRING=mongodb://localhost:27017/fanid_db
```

2. Démarrez MongoDB local :
```powershell
net start MongoDB
```

3. Redémarrez le backend :
```powershell
npm run dev
```

## Vérification

**Après avoir corrigé MongoDB, vous devriez voir :**
```
✅ MongoDB connected successfully
✅ Server is running on port 5000
```

**Ensuite, testez :**
- http://localhost:5000/api/health (doit fonctionner)
- Le frontend pourra se connecter

## Résumé en 3 points

1. ❌ Backend ne démarre pas → Erreur MongoDB
2. ❌ Frontend ne peut pas se connecter → Pas de serveur sur port 5000
3. ✅ Solution → Corriger MongoDB (mot de passe ou utiliser local)

