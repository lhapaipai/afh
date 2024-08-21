```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u basic --hp /home/basic

sudo systemctl start pm2-basic
sydo systemctl enable pm2-basic


pm2 start --name directus ./node_modules/directus/cli.js -- startsu
pm2 save

```


## Désinstallation

```bash
sudo env PATH=$PATH:/usr/bin pm2 unstartup systemd