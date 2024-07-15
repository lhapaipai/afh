## Prérequis sur un nouveau serveur dédié avant de lancer le playbook

chez OVH, générer le mot de passe pour l'utilisateur `ubuntu`. puis se connecter sur le VPS et ajouter notre clé publique dans `/root/.ssh/authorized_keys`.

Ansible se connectera donc en tant que root sans mot de passe avec notre clé privée.

## Première installation

Lancer le playbook

```bash
ansible-playbook setup.yaml
```

## Configuration

pour faciliter les connexions suivantes depuis notre machine locale

```bash
# ~/.ssh/config
Host <alias>
  HostName <server-ip-hostname>
  Port 22
  User <admin-user>
```

## Mises à jour

Si on souhaite mettre à jour seulement une section

```bash
ansible-playbook setup.yaml --tags webserver