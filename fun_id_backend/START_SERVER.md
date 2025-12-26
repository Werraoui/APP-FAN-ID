# Guide de démarrage du serveur backend

## Étapes pour démarrer le serveur

### 1. Vérifier que MongoDB est démarré

**Windows :**
- Ouvrez "Services" (Win + R, tapez `services.msc`)
- Cherchez "MongoDB" et vérifiez qu'il est "En cours d'exécution"
- Si ce n'est pas le cas, cliquez droit → Démarrer

**Ou via ligne de commande :**
```bash
net start MongoDB
```

### 2. Vérifier le fichier .env

Assurez-vous que le fichier `.env` existe dans `fun_id_backend/` avec :

```env
PORT=5000
CONNEXION_STRING=mongodb://localhost:27017/fanid_db
JWT_SECRET=your_secret_key_here_change_this
```

**Important :** Remplacez `your_secret_key_here_change_this` par une clé secrète aléatoire.

### 3. Installer les dépendances (si nécessaire)

```bash
cd fun_id_backend
npm install
```

### 4. Tester la connexion MongoDB

```bash
npm run test:connection
```

Vous devriez voir :
```
✅ Connected to MongoDB
✅ Test user created successfully!
```

### 5. Démarrer le serveur

```bash
npm run dev
```

Vous devriez voir :
```
✅ MongoDB connected successfully
   Host: ...
   Database: fanid_db
✅ Server is running on port 5000
   Health check: http://localhost:5000/api/health
   API base URL: http://localhost:5000/api
```

### 6. Tester que le serveur fonctionne

**Option 1 : Dans le navigateur**
Ouvrez : http://localhost:5000/api/health

Vous devriez voir :
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "...",
  "database": "connected"
}
```

**Option 2 : Via script de test**
```bash
node test-server.js
```

**Option 3 : Via curl (si installé)**
```bash
curl http://localhost:5000/api/health
```

## Problèmes courants

### "MongoDB connection error"
- Vérifiez que MongoDB est démarré
- Vérifiez que `CONNEXION_STRING` est correct dans `.env`
- Essayez de vous connecter avec MongoDB Compass ou mongosh

### "Port 5000 already in use"
- Un autre processus utilise le port 5000
- Changez le port dans `.env` : `PORT=5001`
- Ou arrêtez le processus qui utilise le port 5000

### "Cannot find module"
- Exécutez `npm install` dans le dossier `fun_id_backend`

### Le serveur démarre mais ne répond pas
- Vérifiez le firewall Windows
- Vérifiez que le port n'est pas bloqué
- Essayez d'accéder à http://localhost:5000/api/health dans le navigateur

## Vérification rapide

1. ✅ MongoDB est démarré
2. ✅ Fichier `.env` existe et est correct
3. ✅ `npm install` a été exécuté
4. ✅ `npm run dev` démarre sans erreur
5. ✅ http://localhost:5000/api/health répond dans le navigateur

Si toutes ces étapes sont OK, le backend est prêt !

