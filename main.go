package main

import (
	"fmt"
	"log"
	"net/http"
    "github.com/skeptical2813/Go-react-todo/router"
)

func main() {
	r := router.Router()
	fmt.Println("Starting")
	fmt.Println("Starting the server on port 3000...")

	log.Fatal(http.ListenAndServe(":3000", r))
}
