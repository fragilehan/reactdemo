import React, { Component } from 'react';
import KanbanBoardContainer from './components/KanbanBoardContainer';
import KanbanBoard from './components/KanbanBoard';
import './App.css';
import createBrowerHistory from 'history/createBrowserHistory';
import NewCard from './components/NewCard';
import {Router,Route} from 'react-router';

let cardsList = [
{
  id: 1,
  title: "Read the Book",
  description: "I should read the whole book",
  color: '#bd8d31',
  status: "in-progress",
  tasks: []
},
{
  id: 2,
  title: "Write some code",
  description: "Code along with the samples in the book",
  status: "todo",
  color: '#3a7e28',
  tasks: [
    {
      id: 1,
      name: "ContactList Example",
      done: true
    },
     {
      id: 2,
      name: "kanban Example",
      done: false
    },
     {
      id: 3,
      name: "My own experiments",
      done: false
    }

  ]
},

]

class App extends Component {
  render() {
    return (
     <Router history={createBrowerHistory()}>
        <Route component = {KanbanBoardContainer} />

     </Router>
    );
  }
}

export default App;
