import * as React from "react";
import { Switch, Route } from "react-router-dom";
import SchedulerDisplay from "./Containers/SchedulerDisplay";
import TagsListDisplay from "./Containers/TagsListDisplay";
import DefaultComponentsExampleDisplay from "./Containers/DefaultComponentsExampleDisplay";
import ExampleListDisplay from "./Containers/ExampleListDisplay";
import NavigationBreadcrumbs from "./Components/NavigationBreadcrumbs";
import CategoryListDisplay from "./Containers/CategoryListDisplay";
import Unauthenticated from "./Components/Unauthenticated/Unauthenticated";

const Routing = (props) => {
	return (
		<div>
			<NavigationBreadcrumbs />
			<Switch>
				{!!window.localStorage.getItem("name") ? null : (
					<Route path="/">
						<Unauthenticated />
					</Route>
				)}
				<Route exact path="/">
					<SchedulerDisplay />
				</Route>
				<Route path="/default">
					<DefaultComponentsExampleDisplay />
				</Route>
				<Route path="/categories">
					<CategoryListDisplay />
				</Route>
				<Route path="/tags">
					<TagsListDisplay />
				</Route>
				<Route path="/reduxExample">
					<ExampleListDisplay />
				</Route>
			</Switch>
		</div>
	);
};
export default Routing;
