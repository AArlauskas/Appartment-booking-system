import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTagListData, fetchTagCategoriesData, NewTag, EditTag, DeleteTag } from "../../Actions/TagListActions";
import TagsList from "../../Components/TagsList";
import LoadingScreen from "../LoadingDisplay/LoadingScreen";

class TagsListDisplay extends Component {
	state = {};
	componentDidMount() {
		this.props.fetchTagListData();
		this.props.fetchTagCategoriesData();
	}

	render() {
		return (
			<div>
				{this.props.tagListData.length === 0 ? (
					<LoadingScreen />
				) : (
					<TagsList
						CreateTag={this.props.NewTag}
						EditTag={this.props.EditTag}
						DeleteTag={this.props.DeleteTag}
						isReadOnly={this.props.isReadOnly}
						existingTags={this.props.tagListData}
						existingCategories={this.props.tagCategoriesData}
						checkTag={this.props.CheckTag}
					/>
				)}
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	NewTag: (tagData) => dispatch(NewTag(tagData)),
	EditTag: (tagData) => dispatch(EditTag(tagData)),
	DeleteTag: (id) => dispatch(DeleteTag(id)),
	fetchTagListData: () => dispatch(fetchTagListData()),
	fetchTagCategoriesData: () => dispatch(fetchTagCategoriesData())
});

const mapStateToProps = (state) => ({
	tagListData: state.tagListData,
	loadingStatus: state.loadingStatus,
	isReadOnly: state.isReadOnly,
	tagCategoriesData: state.tagCategoriesData
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsListDisplay);
