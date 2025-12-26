# 🚀 Configuration MongoDB Local - Guide Complet

## Étape 1 : Installer MongoDB

### Option A : Installer MongoDB Community Server

1. **Télécharger MongoDB :**
   - Allez sur : https://www.mongodb.com/try/download/community
   - Sélectionnez :
     - Version : Latest (ou 7.0)
     - Platform : Windows
     - Package : MSI
   - Cliquez sur "Download"

2. **Installer MongoDB :**
   - Exécutez le fichier `.msi` téléchargé
   - Choisissez "Complete" installation
   - ✅ Cochez "Install MongoDB as a Service"
   - ✅ Cochez "Install MongoDB Compass" (interface graphique)
   - Cliquez sur "Install"

3. **Vérifier l'installation :**
   ```powershell
   mongod --version
   mongosh --version
   ```

### Option B : Utiliser MongoDB via Docker (si vous avez Docker)

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Étape 2 : Démarrer MongoDB

### Si installé comme service Windows :
```powershell
net start MongoDB
```

### Si pas installé comme service :
```powershell
mongod --dbpath "C:\data\db"
```
(Créez le dossier `C:\data\db` si nécessaire)

### Vérifier que MongoDB fonctionne :
```powershell
mongosh
```

Vous devriez voir :
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB: ...
Using Mongosh: ...
```

## Étape 3 : Configurer le backend

1. **Modifiez le fichier `.env` dans `fun_id_backend/` :**

```env
PORT=5000
CONNEXION_STRING=mongodb://localhost:27017/fanid_db
JWT_SECRET=your_secret_key_here_change_this_in_production
```

**Important :** 
- `localhost:27017` = MongoDB local par défaut
- `fanid_db` = nom de la base de données (sera créée automatiquement)

2. **Vérifiez que le fichier `.env` est correct :**
   ```powershell
   cd C:\Users\wiame\Desktop\App_fun_id\fun_id_backend
   Get-Content .env
   ```

## Étape 4 : Tester la connexion

```powershell
cd C:\Users\wiame\Desktop\App_fun_id\fun_id_backend
npm run test:connection
```

Vous devriez voir :
```
✅ Connected to MongoDB
✅ Test user created successfully!
```

## Étape 5 : Démarrer le serveur

```powershell
npm run dev
```

Vous devriez voir :
```
✅ MongoDB connected successfully
   Host: 127.0.0.1
   Database: fanid_db
✅ Server is running on port 5000
```

## Étape 6 : Vérifier que tout fonctionne

1. **Test dans le navigateur :**
   - Ouvrez : http://localhost:5000/api/health
   - Vous devriez voir du JSON avec `"status": "OK"`

2. **Test avec MongoDB Compass (optionnel) :**
   - Ouvrez MongoDB Compass
   - Connectez-vous à : `mongodb://localhost:27017`
   - Vous devriez voir la base de données `fanid_db`

## Commandes utiles MongoDB

### Se connecter à MongoDB :
```powershell
mongosh
```

### Dans MongoDB shell :
```javascript
// Voir les bases de données
show dbs

// Utiliser la base fanid_db
use fanid_db

// Voir les collections
show collections

// Voir les utilisateurs
db.users.find().pretty()

// Compter les utilisateurs
db.users.countDocuments()
```

## Dépannage

### "MongoDB service is not running"
```powershell
net start MongoDB
```

### "Port 27017 already in use"
- Un autre MongoDB est déjà démarré
- Ou un autre programme utilise le port
- Vérifiez : `netstat -ano | findstr :27017`

### "Cannot connect to MongoDB"
- Vérifiez que MongoDB est démarré : `net start MongoDB`
- Vérifiez le port : par défaut c'est 27017
- Vérifiez le firewall Windows

### "Access denied" ou erreur de permissions
- Exécutez PowerShell en tant qu'administrateur
- Ou vérifiez les permissions du dossier `C:\data\db`

## Résumé rapide

1. ✅ Installer MongoDB
2. ✅ Démarrer MongoDB : `net start MongoDB`
3. ✅ Modifier `.env` : `CONNEXION_STRING=mongodb://localhost:27017/fanid_db`
4. ✅ Tester : `npm run test:connection`
5. ✅ Démarrer : `npm run dev`
6. ✅ Vérifier : http://localhost:5000/api/health

Une fois ces étapes terminées, votre backend fonctionnera avec MongoDB local ! 🎉

