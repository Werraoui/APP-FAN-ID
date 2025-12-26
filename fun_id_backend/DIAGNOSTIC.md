# 🔍 Diagnostic - Problème de connexion

## Vérifications étape par étape

### Étape 1 : Vérifier que le backend est démarré

**Dans le terminal où vous avez lancé `npm run dev`, vous devriez voir :**
```
✅ MongoDB connected successfully
✅ Server is running on port 5000
```

**Si vous voyez une erreur MongoDB :**
- Le serveur ne démarre pas complètement
- Il faut d'abord résoudre le problème MongoDB

### Étape 2 : Tester le backend directement

**Ouvrez votre navigateur et allez à :**
```
http://localhost:5000/api/health
```

**Résultats possibles :**

✅ **Si vous voyez du JSON** → Le backend fonctionne !
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

❌ **Si vous voyez "This site can't be reached"** → Le backend n'est PAS démarré

❌ **Si vous voyez "ERR_CONNECTION_REFUSED"** → Le backend n'est PAS démarré

### Étape 3 : Vérifier le port

**Dans PowerShell, vérifiez si le port 5000 est utilisé :**
```powershell
netstat -ano | findstr :5000
```

**Si vous voyez une ligne** → Quelque chose écoute sur le port 5000 (peut-être votre backend)

**Si vous ne voyez rien** → Rien n'écoute sur le port 5000 (le backend n'est pas démarré)

### Étape 4 : Vérifier le fichier .env

**Le fichier `.env` doit exister dans `fun_id_backend/` avec :**

```env
PORT=5000
CONNEXION_STRING=mongodb://localhost:27017/fanid_db
JWT_SECRET=your_secret_key_here
```

**OU si vous utilisez MongoDB Atlas :**
```env
PORT=5000
CONNEXION_STRING=mongodb+srv://username:password@cluster.mongodb.net/fanid_db
JWT_SECRET=your_secret_key_here
```

### Étape 5 : Vérifier MongoDB

**Si vous utilisez MongoDB local :**
```powershell
net start MongoDB
```

**Si vous utilisez MongoDB Atlas :**
- Vérifiez que votre IP est dans la whitelist
- Vérifiez que votre mot de passe est correct dans la connection string

### Étape 6 : Vérifier la console du navigateur

**Ouvrez la console (F12) et regardez :**
- L'onglet **Console** : messages d'erreur
- L'onglet **Network** : requêtes HTTP

**Vous devriez voir :**
```
🌐 API Request: POST http://localhost:5000/api/users/register
```

**Si vous voyez une erreur CORS :**
- Le backend reçoit la requête mais bloque à cause de CORS
- Vérifiez la configuration CORS dans `server.js`

## Solutions selon le problème

### Problème : "This site can't be reached" ou "ERR_CONNECTION_REFUSED"

**Cause :** Le backend n'est pas démarré

**Solution :**
1. Ouvrez un terminal
2. Allez dans `fun_id_backend`
3. Lancez `npm run dev`
4. Attendez de voir "✅ Server is running on port 5000"
5. Testez http://localhost:5000/api/health dans le navigateur

### Problème : Erreur MongoDB au démarrage

**Cause :** MongoDB n'est pas accessible

**Solution :**
- **MongoDB local :** `net start MongoDB`
- **MongoDB Atlas :** Ajoutez votre IP à la whitelist

### Problème : Le backend démarre mais le frontend ne peut pas se connecter

**Cause :** Problème de CORS ou mauvais port

**Solution :**
1. Vérifiez que le frontend utilise le bon port (5000)
2. Vérifiez la configuration CORS dans `server.js`
3. Vérifiez le fichier `.env` du frontend (si vous avez créé un)

### Problème : Port 5000 déjà utilisé

**Cause :** Un autre programme utilise le port 5000

**Solution :**
1. Changez le port dans `.env` : `PORT=5001`
2. Changez l'URL dans le frontend : `VITE_API_URL=http://localhost:5001/api`
3. Redémarrez les deux serveurs

## Test rapide

**Exécutez ces commandes dans l'ordre :**

```powershell
# 1. Vérifier MongoDB (si local)
net start MongoDB

# 2. Aller dans le dossier backend
cd C:\Users\wiame\Desktop\App_fun_id\fun_id_backend

# 3. Vérifier le fichier .env existe
dir .env

# 4. Démarrer le serveur
npm run dev
```

**Dans un autre terminal :**

```powershell
# Tester que le serveur répond
curl http://localhost:5000/api/health
```

**Ou ouvrez dans le navigateur :**
```
http://localhost:5000/api/health
```

Si cette URL fonctionne, le backend est OK et le problème vient du frontend ou de la configuration.

