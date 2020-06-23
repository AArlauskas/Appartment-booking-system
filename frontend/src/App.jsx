import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./Store";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";

class App extends Component {
	state = {};
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Routing />
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
