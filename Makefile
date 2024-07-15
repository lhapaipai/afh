local_path	:= $(PWD)

front_host := rencontres-hautbois-evian.fr
front_path := $(local_path)/front
front_remote_path := /srv/$(front_host)


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
