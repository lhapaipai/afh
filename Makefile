local_path	:= $(PWD)

front_host := rencontres-hautbois-evian.fr
front_path := $(local_path)/front
front_remote_path := /srv/$(front_host)

admin_host := admin.rencontres-hautbois-evian.fr
admin_path := $(local_path)/admin
admin_remote_path := /srv/$(admin_host)


.PHONY: help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?## .*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-22s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'


.PHONY: deploy-front
deploy-front:
	cd $(front_path) && pnpm build
	rsync -av --delete \
		$(front_path)/out/ \
		bernex-basic:$(front_remote_path)
	@echo "go : https://$(front_host)"

.PHONY: deploy-admin
deploy-admin:
	rsync -av \
	  --exclude-from="$(admin_path)/.rsyncignore" \
		$(admin_path)/ \
		bernex-basic:$(admin_remote_path)
	scp "$(admin_path)/.env.prod" bernex-basic:$(admin_remote_path)/.env
	ssh bernex-basic "\
		cd $(admin_remote_path) &&\
		pnpm install &&\
		pm2 reload directus"
	@echo "go : https://$(admin_host)"
