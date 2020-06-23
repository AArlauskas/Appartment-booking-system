import React, { Component } from "react";
import { GetAllCategories, GetAllTags } from "../../API/API";

class APIExample extends Component {
	state = {
		isLoading: true,
		data: []
	};
	render() {
		return (
			<div>
				{this.state.isLoading ? (
					<p>Loading...</p>
				) : (
					this.state.data.map((values) => (
						<div key={values.id}>
							<span>
								Id: {values.id} Name: {values.name} Description: {values.description} Color:{" "}
								{values.color}
							</span>
							<br />
						</div>
					))
				)}
			</div>
		);
	}

	async componentDidMount() {
		await GetAllCategories().then((response) => this.setState({ isLoading: false, data: response }));
	}
}

export default APIExample;
