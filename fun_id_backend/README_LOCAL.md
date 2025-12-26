# 🚀 Configuration MongoDB Local - Guide Rapide

## ✅ Configuration actuelle

Votre `.env` est maintenant configuré pour MongoDB local :
```env
PORT=5000
CONNEXION_STRING=mongodb://localhost:27017/fanid_db
JWT_SECRET=12345
```

## 📋 Étapes pour démarrer

### 1. Installer MongoDB (si pas déjà installé)

**Télécharger :**
- https://www.mongodb.com/try/download/community
- Windows → MSI → Download
- Installer avec "Install MongoDB as a Service"

### 2. Démarrer MongoDB

```powershell
net start MongoDB
```

**Vérifier que MongoDB fonctionne :**
```powershell
mongosh
```

Si vous voyez le prompt MongoDB, c'est bon ! Tapez `exit` pour quitter.

### 3. Démarrer le backend

```powershell
cd C:\Users\wiame\Desktop\App_fun_id\fun_id_backend
npm run dev
```

**Vous devriez voir :**
```
🔌 Connecting to MongoDB...
✅ MongoDB connected successfully
   Host: 127.0.0.1
   Database: fanid_db
✅ Server is running on port 5000
```

### 4. Tester

**Dans le navigateur :**
- http://localhost:5000/api/health

**Vous devriez voir :**
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

## 🔧 Commandes utiles

### Démarrer MongoDB :
```powershell
net start MongoDB
```

### Arrêter MongoDB :
```powershell
net stop MongoDB
```

### Voir les données dans MongoDB :
```powershell
mongosh
use fanid_db
db.users.find().pretty()
db.fanids.find().pretty()
```

### Tester la connexion :
```powershell
cd fun_id_backend
npm run test:connection
```

## ❌ Problèmes courants

### "MongoDB service is not running"
```powershell
net start MongoDB
```

### "Cannot connect to MongoDB"
1. Vérifiez que MongoDB est démarré
2. Vérifiez le port 27017 : `netstat -ano | findstr :27017`
3. Vérifiez le firewall Windows

### "Port 5000 already in use"
- Changez le port dans `.env` : `PORT=5001`
- Ou arrêtez le programme qui utilise le port 5000

## ✅ Checklist

- [ ] MongoDB est installé
- [ ] MongoDB est démarré (`net start MongoDB`)
- [ ] Fichier `.env` contient `CONNEXION_STRING=mongodb://localhost:27017/fanid_db`
- [ ] Backend démarre sans erreur (`npm run dev`)
- [ ] http://localhost:5000/api/health fonctionne
- [ ] Frontend peut se connecter

Une fois tout cela fait, votre application fonctionnera avec MongoDB local ! 🎉

