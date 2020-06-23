import { ActionType } from "../Constants";
import { GetAllTags, DeleteTagById, GetCategoryNames, AddTag, UpdateTag } from "../API/API";

export const fetchTagListData = () => async (dispatch) => {
	dispatch({
		type: ActionType.FETCH_TAG_LIST_DATA,
		payload: await GetAllTags()
	});
};

export const fetchTagCategoriesData = () => async (dispatch) => {
	dispatch({
		type: ActionType.FETCH_TAG_CATEGORIES_DATA,
		payload: await GetCategoryNames()
	});
};

export const DeleteTag = (id) => async (dispatch) => {
	await DeleteTagById(id);
	dispatch({
		type: ActionType.DELETE_TAG,
		payload: id
	});
};

export const NewTag = (data) => async (dispatch) => {
	let changedData = {
		Name: data.tag,
		CategoryNames: data.selectedCategories
	};
	dispatch({
		type: ActionType.CREATE_TAG,
		payload: await AddTag(changedData)
	});
};

export const EditTag = (data) => async (dispatch) => {
	let changedData = {
		id: data.id,
		Name: data.tag,
		CategoryNames: data.selectedCategories
	};
	dispatch({
		type: ActionType.EDIT_TAG,
		payload: await UpdateTag(changedData)
	});
};
