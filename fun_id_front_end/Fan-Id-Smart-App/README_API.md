# Configuration API - Guide de dépannage

## Problème "Failed to fetch"

Si vous voyez l'erreur "Failed to fetch" lors de l'inscription ou de la connexion, suivez ces étapes :

### 1. Vérifier que le backend est démarré

```bash
cd fun_id_backend
npm run dev
```

Vous devriez voir :
```
✅ MongoDB connected successfully
✅ Server is running on port 5000
```

### 2. Tester la connexion au backend

Ouvrez votre navigateur et allez à :
- http://localhost:5000/api/health

Vous devriez voir :
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "...",
  "database": "connected"
}
```

### 3. Vérifier l'URL de l'API dans le frontend

Le frontend utilise par défaut : `http://localhost:5000/api`

Si votre backend tourne sur un autre port, créez un fichier `.env` dans `fun_id_front_end/Fan-Id-Smart-App/` :

```env
VITE_API_URL=http://localhost:5000/api
```

**Important** : Après avoir créé/modifié le `.env`, redémarrez le serveur de développement du frontend.

### 4. Vérifier la console du navigateur

Ouvrez la console du navigateur (F12) et regardez :
- L'onglet **Console** pour les erreurs
- L'onglet **Network** pour voir les requêtes HTTP

Vous devriez voir des logs comme :
```
🌐 API Request: POST http://localhost:5000/api/users/register
```

### 5. Vérifier les ports

- **Backend** : Port 5000 (par défaut)
- **Frontend** : Port 3000 ou 5173 (selon Vite)

Assurez-vous que ces ports ne sont pas utilisés par d'autres applications.

### 6. Vérifier le firewall

Windows Firewall peut bloquer les connexions. Vérifiez que :
- Le port 5000 n'est pas bloqué
- Node.js est autorisé dans le firewall

### 7. Tester avec curl ou Postman

Testez directement l'API :

```bash
# Test health check
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "0612345678",
    "password": "password123"
  }'
```

### 8. Vérifier CORS

Si vous voyez des erreurs CORS dans la console, le backend devrait déjà être configuré pour accepter les requêtes depuis :
- http://localhost:3000
- http://localhost:5173
- http://127.0.0.1:3000
- http://127.0.0.1:5173

### 9. Redémarrer les serveurs

Parfois, un simple redémarrage résout le problème :

1. Arrêtez le backend (Ctrl+C)
2. Arrêtez le frontend (Ctrl+C)
3. Redémarrez le backend : `cd fun_id_backend && npm run dev`
4. Redémarrez le frontend : `cd fun_id_front_end/Fan-Id-Smart-App && npm run dev`

### 10. Vérifier les logs du serveur

Quand vous essayez de vous inscrire, vous devriez voir dans la console du backend :

```
2024-XX-XX - POST /api/users/register
   Body: { ... }
📝 Registration request received
...
```

Si vous ne voyez rien, le backend ne reçoit pas la requête.

## Solutions communes

### Backend ne démarre pas
- Vérifiez que MongoDB est démarré
- Vérifiez le fichier `.env` dans `fun_id_backend/`
- Vérifiez que le port 5000 n'est pas utilisé

### "Connection refused"
- Le backend n'est pas démarré
- Le backend écoute sur un autre port
- Firewall bloque la connexion

### "CORS error"
- Vérifiez que le backend a `cors()` configuré
- Vérifiez que l'origine du frontend est dans la liste autorisée

### "Network error"
- Vérifiez votre connexion internet
- Vérifiez que les deux serveurs sont démarrés
- Vérifiez les ports

