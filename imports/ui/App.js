import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks';

import Task from './Task.js';

class App extends Component {

  renderTasks() {
    return this.props.tasks.map(task => <Task key={task._id} task={task} toggleChecked={this.toggleChecked.bind(this, task)} deleteTask={this.deleteTask.bind(this, task)} />);
  }

  toggleChecked({ _id, checked }) {
    console.log('pressed toggle');
    Tasks.update(_id, {
      $set: { checked: !checked },
    });
  }

  deleteTask({ _id }) {
    Tasks.remove(_id);
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    )
  }

}

export default withTracker(() => ({ tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch() }))(App);