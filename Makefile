all: clean build

build:
	erdpy --verbose contract build job
	erdpy --verbose contract build job-factory

clean:
	./clean-wasm.sh

bootstrap:
	./script/contracts/bootstrap

setup: clean build

test-job:
	cargo test --package job

test-job-factory:
	cargo test --package job-factory

test:
	cargo test