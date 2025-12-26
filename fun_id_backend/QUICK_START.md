# 🚀 Démarrage rapide - Backend

## Commandes essentielles

### 1. Démarrer le serveur
```bash
cd fun_id_backend
npm run dev
```

### 2. Tester la connexion MongoDB
```bash
npm run test:connection
```

### 3. Tester que le serveur répond
```bash
npm run test:server
```

### 4. Vérifier dans le navigateur
Ouvrez : http://localhost:5000/api/health

## Checklist avant de démarrer

- [ ] MongoDB est démarré (Services Windows ou `net start MongoDB`)
- [ ] Fichier `.env` existe dans `fun_id_backend/`
- [ ] `CONNEXION_STRING` est correct dans `.env`
- [ ] `npm install` a été exécuté
- [ ] Le port 5000 n'est pas utilisé par un autre programme

## Si le serveur ne démarre pas

1. **Vérifiez MongoDB :**
   ```bash
   mongosh
   # Ou
   mongo
   ```

2. **Vérifiez le fichier .env :**
   - Doit contenir `CONNEXION_STRING=mongodb://localhost:27017/fanid_db`
   - Doit contenir `PORT=5000`
   - Doit contenir `JWT_SECRET=...`

3. **Vérifiez les logs :**
   - Regardez les messages dans la console
   - Cherchez les erreurs en rouge (❌)

4. **Testez la connexion :**
   ```bash
   npm run test:connection
   ```

## Une fois le serveur démarré

Vous devriez voir :
```
✅ MongoDB connected successfully
✅ Server is running on port 5000
```

**Testez ensuite :**
- http://localhost:5000/api/health (dans le navigateur)
- Ou `npm run test:server`

Si ça fonctionne, le backend est prêt ! 🎉

