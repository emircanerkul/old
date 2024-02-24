# Gamificate Image — easy spin-up
#
# Quick start:
#   make setup   # one-time: install dependencies (macOS/Homebrew + rustup)
#   make run     # build + generate output.webp from input.webp
#
# Note: make takes variables, not positional arguments. Use NAME=value:
#   make run INPUT=photo.webp OUTPUT=puzzle.webp
#   make convert SRC=photo.jpg INPUT=photo.webp QUALITY=80
# ('make run photo.webp' would be read as "build targets run AND photo.webp".)

CARGO   ?= cargo
MAGICK  ?= magick
SRC     ?= input.jpg
INPUT   ?= input.webp
OUTPUT  ?= output.webp
QUALITY ?= 80

.DEFAULT_GOAL := help
.PHONY: help setup deps convert build run clean push

help: ## Show this help
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN { FS = ":.*?## " }; { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }'
	@echo ""
	@echo "  \033[33mExamples:\033[0m"
	@echo "    make run                                   # input.webp -> output.webp"
	@echo "    make run INPUT=photo.webp OUTPUT=puzzle.webp"
	@echo "    make convert SRC=photo.jpg INPUT=photo.webp"
	@echo ""
	@echo "  Variables: SRC=$(SRC) INPUT=$(INPUT) OUTPUT=$(OUTPUT) QUALITY=$(QUALITY)"

setup: ## One-time dependency install (macOS/Homebrew + rustup)
	brew install pkg-config imagemagick
	@command -v $(CARGO) >/dev/null 2>&1 || \
		curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
	@echo "Dependencies installed. Run 'make run' to generate $(OUTPUT)."

deps: ## Check that required tools are available
	@command -v $(CARGO) >/dev/null 2>&1 || { echo "error: cargo not found — run 'make setup'"; exit 1; }
	@command -v $(MAGICK) >/dev/null 2>&1 || { echo "error: ImageMagick not found — run 'make setup'"; exit 1; }
	@pkg-config --exists MagickWand 2>/dev/null || { echo "error: MagickWand not found — run 'make setup'"; exit 1; }
	@echo "All dependencies satisfied."

convert: deps ## Convert input.jpg to a compressed input.webp
	@test -f $(SRC) || { echo "error: $(SRC) not found (set SRC=... to convert another file)"; exit 1; }
	$(MAGICK) $(SRC) -quality $(QUALITY) -define webp:method=6 $(INPUT)

build: deps ## Build the release binary
	$(CARGO) build --release

run: build ## Generate $(OUTPUT) from $(INPUT)
	@if [ ! -f $(INPUT) ]; then \
		if [ -f $(SRC) ]; then \
			echo "$(INPUT) missing — converting from $(SRC)"; \
			$(MAKE) --no-print-directory convert; \
		else \
			echo "error: $(INPUT) not found and no $(SRC) to convert"; \
			echo "hint: make convert SRC=your.jpg INPUT=your.webp"; \
			exit 1; \
		fi; \
	fi
	./target/release/gamificate_image

clean: ## Remove build artifacts and generated output
	rm -f $(OUTPUT)
	$(CARGO) clean

push: ## Force-push master to origin, overriding remote history
	git push --force origin master
