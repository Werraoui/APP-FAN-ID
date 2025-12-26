# ⚡ DÉMARRAGE IMMÉDIAT - Étapes exactes

## 🔴 Le problème
Le frontend affiche "Cannot connect to server" → Le backend n'est pas démarré

## ✅ Solution en 3 étapes

### Étape 1 : Démarrer MongoDB

**Ouvrez PowerShell en tant qu'administrateur et exécutez :**
```powershell
net start MongoDB
```

**Si vous voyez "The requested service has already been started"** → MongoDB est déjà démarré, continuez.

**Si vous voyez une erreur** → MongoDB n'est pas installé. Installez-le d'abord.

### Étape 2 : Démarrer le backend

**Ouvrez un nouveau terminal PowerShell et exécutez :**
```powershell
cd C:\Users\wiame\Desktop\App_fun_id\fun_id_backend
npm run dev
```

**Vous DEVEZ voir :**
```
🔌 Connecting to MongoDB...
✅ MongoDB connected successfully
   Host: 127.0.0.1
   Database: fanid_db
✅ Server is running on port 5000
   Health check: http://localhost:5000/api/health
   API base URL: http://localhost:5000/api
```

**⚠️ Si vous voyez une erreur MongoDB :**
- Vérifiez que MongoDB est démarré : `net start MongoDB`
- Vérifiez le fichier `.env` : doit contenir `CONNEXION_STRING=mongodb://localhost:27017/fanid_db`

### Étape 3 : Tester que le backend fonctionne

**Pendant que le backend tourne, ouvrez votre navigateur et allez à :**
```
http://localhost:5000/api/health
```

**Vous devriez voir du JSON :**
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

**✅ Si cette URL fonctionne** → Le backend est OK, le frontend pourra se connecter !

**❌ Si cette URL ne fonctionne pas** → Le backend n'est pas démarré correctement

## 🎯 Résumé

1. **Terminal 1** : `net start MongoDB` (démarrer MongoDB)
2. **Terminal 2** : `cd fun_id_backend && npm run dev` (démarrer le backend)
3. **Navigateur** : http://localhost:5000/api/health (vérifier que ça fonctionne)
4. **Frontend** : Devrait maintenant pouvoir se connecter !

## ⚠️ Important

**Le backend DOIT être en cours d'exécution** pour que le frontend puisse se connecter.

**Gardez le terminal avec `npm run dev` ouvert** pendant que vous utilisez l'application.

Si vous fermez le terminal, le backend s'arrête et le frontend ne pourra plus se connecter.

