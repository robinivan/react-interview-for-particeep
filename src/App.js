import './App.css';
import { BrowserRouter} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Component} from "react";
import List_card_page from "./components/List_cards_page";
import {movies$} from "./movies";


class App extends Component{
  render(){

    const { history } = this.props;

    return(
        <BrowserRouter>
          <Switch>
            <Route history={history} exact path='/' component={List_card_page}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
