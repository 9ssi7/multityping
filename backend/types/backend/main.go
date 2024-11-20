package main

import (
	"fmt"

	"github.com/9ssi7/multityping/types/backend/types/example"
)

func main() {
	example := example.Example{
		Id:          "1",
		Description: "example",
		Name:        "example",
	}
	fmt.Println(example)
}
