import React, { Component } from "react";
import ReactLoading from "react-loading";
class LoadingScreen extends Component {
	state = {};
	render() {
		return (
			<div style={{ position: "fixed", left: "45%", top: "35%" }}>
				<ReactLoading type="spinningBubbles" color="#CE2B27" height={200} width={200} />
			</div>
		);
	}
}

export default LoadingScreen;
