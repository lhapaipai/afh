datetime			:= $(shell date +"%Y-%m-%d-%H-%M")
date					:= $(shell date +"%Y-%m-%d")

local_path	:= $(PWD)

front_path := $(local_path)/front
front_host := rencontres-hautbois-evian.fr
front_remote_path := /srv/$(front_host)

front_sandbox_host := sandbox.rencontres-hautbois-evian.fr
front_sandbox_remote_path := /srv/$(front_sandbox_host)

admin_host := admin.rencontres-hautbois-evian.fr
admin_path := $(local_path)/admin
admin_backup_path := $(admin_path)/.local/backup/$(datetime)
admin_remote_path := /srv/$(admin_host)


.PHONY: help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?## .*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-22s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'


.PHONY: deploy-front
deploy-front:
	cd $(front_path) && pnpm build
	rsync -av --delete \
		--exclude-from="$(front_path)/.rsyncignore" \
		$(front_path)/out/ \
		bernex-basic:$(front_remote_path)
	scp "$(front_path)/ecosystem.config.cjs" bernex-basic:$(front_remote_path)/ecosystem.config.cjs
	@echo "go : https://$(front_host)"

.PHONY: deploy-front-sandbox
deploy-front-sandbox:
	rsync -av --delete \
		--exclude-from="$(front_path)/.rsyncignore" \
		$(front_path)/ \
		bernex-basic:$(front_sandbox_remote_path)
	scp "$(front_path)/ecosystem.sandbox.config.cjs" bernex-basic:$(front_sandbox_remote_path)/ecosystem.config.cjs
	ssh bernex-basic "\
		cd $(front_sandbox_remote_path) &&\
		pnpm install &&\
		pnpm run build &&\
		pm2 reload front-sandbox"

	@echo "go : https://$(front_sandbox_host)"

.PHONY: deploy-admin
deploy-admin:
	rsync -av --delete \
	  --exclude-from="$(admin_path)/.rsyncignore" \
		$(admin_path)/ \
		bernex-basic:$(admin_remote_path)
	scp "$(admin_path)/.env.prod" bernex-basic:$(admin_remote_path)/.env
	ssh bernex-basic "\
		cd $(admin_remote_path) &&\
		pnpm install &&\
		pm2 reload directus"
	@echo "go : https://$(admin_host)"


.PHONY: save-bernex-admin-data
save-bernex-admin-data:
	mkdir -p $(admin_backup_path)-bernex
	rsync -av \
		bernex-basic:$(admin_remote_path)/uploads \
		$(admin_backup_path)-bernex/
	scp bernex-basic:$(admin_remote_path)/data.db $(admin_backup_path)-bernex/data.db

.PHONY: save-local-admin-data
save-local-admin-data:
	mkdir -p $(admin_backup_path)-local
	rsync -av \
		$(admin_path)/uploads \
		$(admin_backup_path)-local/
	scp $(admin_path)/data.db $(admin_backup_path)-local/data.db

.PHONY: fetch-bernex-admin-data
fetch-bernex-admin-data: save-local-admin-data
	rsync -av --delete \
		bernex-basic:$(admin_remote_path)/uploads \
		$(admin_path)/
	scp bernex-basic:$(admin_remote_path)/data.db $(admin_path)/data.db


.PHONY: deploy-admin-data
deploy-admin-data: save-bernex-admin-data
	rsync -av --delete \
		$(admin_path)/uploads/ \
		bernex-basic:$(admin_remote_path)/uploads
	scp "$(admin_path)/data.db" bernex-basic:$(admin_remote_path)/data.db
	ssh bernex-basic "\
		cd $(admin_remote_path) &&\
		pnpm install &&\
		pm2 reload directus"
	@echo "go : https://$(admin_host)"