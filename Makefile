all: build-contracts

build:
	./script/contracts/build

bootstrap:
	./script/contracts/bootstrap

setup: build bootstrap

test-job:
	cargo test --package job

test-job-factory:
	cargo test --package job-factory

test:
	cargo test