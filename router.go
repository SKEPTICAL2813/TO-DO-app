package router

import (
    "github.com/gorilla/mux"
    "github.com/skeptical2813/Go-react-todo/middleware" // Ensure this path is correct
)

func Router() *mux.Router {
    router := mux.NewRouter()
    router.HandleFunc("/api/task", middleware.GetAllTasks).Methods("GET", "OPTIONS")
    router.HandleFunc("/api/task", middleware.CreateTask).Methods("POST", "OPTIONS")
    router.HandleFunc("/api/task/{id}", middleware.TaskCompleted).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/undoTask/{id}", middleware.UndoTask).Methods("PUT", "OPTIONS")
    router.HandleFunc("/api/deleteTask/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")
    router.HandleFunc("/api/deleteAllTasks", middleware.DeleteAllTasks).Methods("DELETE", "OPTIONS")

    return router
}
