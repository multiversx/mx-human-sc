all: clean build

build:
	sc-meta all build

clean:
	sc-meta all clean
	cargo clean

bootstrap:
	./script/contracts/bootstrap

setup:
	cargo install multiversx-sc-meta
	sc-meta all build

test-job:
	cargo test --package job

test-job-factory:
	cargo test --package job-factory

test:
	cargo test