# Firebase Service Account Configuration

This file should contain your Firebase service account JSON credentials.

## How to get your Firebase service account:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Navigate to "Service Accounts" tab
5. Click "Generate New Private Key"
6. Download the JSON file
7. Rename it to `firebase-service-account.json` and place it in the project root

## Example structure:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

## Security Note:

**NEVER commit this file to version control!**

It's already added to `.gitignore` for your safety.
