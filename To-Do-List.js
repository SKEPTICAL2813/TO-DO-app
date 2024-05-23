import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:3000";

class ToDoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: "",
            items: [],
        };
    }

    componentDidMount() {
        this.getTask();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.task) {
            axios.post(endpoint + "/api/task", {
                task: this.state.task,
            }).then((res) => {
                this.getTask();
                this.setState({ task: "" });
            });
        }
    };

    getTask = () => {
        axios.get(endpoint + "/api/task").then((res) => {
            if (res.data) {
                this.setState({
                    items: res.data.map((item) => {
                        let color = "#0C2D48"; // Dark blue color
                        let style = {
                            wordWrap: "break-word",
                            backgroundColor: color,
                            color: "white",
                            padding: "10px",
                            margin: "10px 0"
                        };
                        return (
                            <Card key={item._id} style={style}>
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                                    </Card.Header>

                                    <Card.Meta textAlign="right">
                                        <Icon
                                            name="check circle"
                                            color="blue"
                                            onClick={() => this.completeTask(item._id)}
                                        />
                                        <span style={{ paddingRight: 10 }}>Completed</span>
                                        <Icon
                                            name="undo"
                                            color="blue"
                                            onClick={() => this.undoTask(item._id)}
                                        />
                                        <span style={{ paddingRight: 10 }}>Undo</span>
                                        <Icon
                                            name="delete"
                                            color="red"
                                            onClick={() => this.deleteTask(item._id)}
                                        />
                                        <span style={{ paddingRight: 10 }}>Delete</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        );
                    }),
                });
            }
        });
    };

    completeTask = (id) => {
        axios.put(endpoint + "/api/task/" + id).then((res) => {
            this.getTask();
        });
    };

    undoTask = (id) => {
        axios.put(endpoint + "/api/undoTask/" + id).then((res) => {
            this.getTask();
        });
    };

    deleteTask = (id) => {
        axios.delete(endpoint + "/api/deleteTask/" + id).then((res) => {
            this.getTask();
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <Header className="header" as="h2" color="blue">
                        TO-DO LIST
                    </Header>
                </div>
                <div className="row">
                    <Form onSubmit={this.onSubmit}>
                        <Input
                            type="text"
                            name="task"
                            onChange={this.onChange}
                            value={this.state.task}
                            fluid
                            placeholder="Create task"
                        />
                    </Form>
                </div>
                <div className="row">
                    <Card.Group>{this.state.items}</Card.Group>
                </div>
            </div>
        );
    }
}

export default ToDoList;
