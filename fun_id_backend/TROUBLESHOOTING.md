# Guide de dépannage - Problèmes d'enregistrement utilisateur

## Vérifications à faire si l'utilisateur n'apparaît pas dans MongoDB

### 1. Vérifier que MongoDB est démarré

```bash
# Windows (si installé comme service)
net start MongoDB

# Ou vérifier dans les services Windows
# Rechercher "Services" et chercher "MongoDB"
```

### 2. Vérifier le fichier .env

Assurez-vous que le fichier `.env` existe dans `fun_id_backend/` avec :

```env
PORT=5000
CONNEXION_STRING=mongodb://localhost:27017/fanid_db
JWT_SECRET=your_secret_key_here
```

**Important** : 
- Si MongoDB est sur un autre port, ajustez `CONNEXION_STRING`
- Si MongoDB nécessite une authentification : `mongodb://username:password@localhost:27017/fanid_db`

### 3. Vérifier que le serveur backend est démarré

```bash
cd fun_id_backend
npm run dev
```

Vous devriez voir :
```
✅ MongoDB connected successfully
   Host: ...
   Database: fanid_db
✅ Server is running on port 5000
```

### 4. Vérifier les logs du serveur

Lors de l'inscription, vous devriez voir dans la console :
```
📝 Registration request received
   Body: { ... }
🔍 Checking if user exists...
🔐 Hashing password...
💾 Creating user in database...
✅ User created successfully!
   User ID: ...
```

### 5. Vérifier la connexion MongoDB

Testez la connexion directement :

```bash
# Ouvrir MongoDB shell
mongosh

# Ou si vous utilisez l'ancienne version
mongo

# Dans le shell MongoDB
use fanid_db
db.users.find().pretty()
```

### 6. Vérifier les erreurs dans la console

- **Erreur de connexion MongoDB** : Vérifiez que MongoDB est démarré et que `CONNEXION_STRING` est correct
- **Erreur de validation** : Vérifiez que tous les champs sont envoyés depuis le frontend
- **Erreur "Email already used"** : L'utilisateur existe déjà, essayez avec un autre email

### 7. Tester avec Postman ou curl

Testez directement l'API :

```bash
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

### 8. Vérifier le frontend

Ouvrez la console du navigateur (F12) et vérifiez :
- Les requêtes réseau dans l'onglet "Network"
- Les erreurs dans l'onglet "Console"
- Que l'URL de l'API est correcte (vérifier `.env` dans le frontend)

### 9. Vérifier CORS

Si vous voyez des erreurs CORS, assurez-vous que :
- Le backend a `app.use(cors())` activé
- L'URL du frontend correspond à celle autorisée

### 10. Vérifier la base de données MongoDB

```javascript
// Dans MongoDB shell
use fanid_db
show collections
db.users.find().pretty()
db.users.countDocuments()
```

## Solutions communes

### Problème : "CONNEXION_STRING is not defined"
**Solution** : Créez un fichier `.env` dans `fun_id_backend/`

### Problème : "MongoDB connection error"
**Solution** : 
1. Vérifiez que MongoDB est démarré
2. Vérifiez que le port est correct (27017 par défaut)
3. Vérifiez les permissions MongoDB

### Problème : L'utilisateur n'apparaît pas mais pas d'erreur
**Solution** :
1. Vérifiez que vous regardez la bonne base de données
2. Vérifiez les logs du serveur pour voir si la création a réussi
3. Vérifiez que la transaction n'a pas été annulée

### Problème : Erreur de validation
**Solution** : Vérifiez que tous les champs requis sont envoyés :
- firstName
- lastName
- email
- phone
- password

