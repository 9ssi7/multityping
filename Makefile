types:
	protoc --go_out=./backend/types ./protos/*.proto
	protoc --jsonschema_out=./client/schemas ./protos/*.proto
	$(MAKE) -C ./client convert-jsonschema-to-types

.PHONY: types