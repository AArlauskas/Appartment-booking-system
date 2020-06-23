import { ActionType } from "../Constants/";
import { GetAllCategories, CreateCategory, DeleteCategory, UpdateCategory, GetTagNames } from "../API/API";

export const fetchCategoryData = () => async (dispatch) => {
  dispatch({
    type: ActionType.LOAD_CATEGORY_LIST,
    payload: await GetAllCategories().then(response => response.filter(category => category.parentId === null))
  });
};

export const fetchSubCategoryData = () => async (dispatch) => {
  dispatch({
    type: ActionType.LOAD_SUBCATEGORY_LIST,
    payload: await GetAllCategories().then(response => response.filter(category => category.parentId !== null)),
  });
};

export const addCategory = (data) => async (dispatch) => {
  dispatch({
    type: ActionType.ADD_CATEGORY,
    payload: await CreateCategory(data),
  });
};

export const editCategory = (data) => async (dispatch) => {

  dispatch({
    type: ActionType.EDIT_CATEGORY,
    payload: await UpdateCategory(data),
  });
};

export const deleteCategory = (id) => async (dispatch) => {
  await DeleteCategory(id);
  dispatch({
    type: ActionType.DELETE_CATEGORY,
    payload: id,
  });
};

export const addSubCategory = (data) => async (dispatch) => {
  dispatch({
    type: ActionType.ADD_SUBCATEGORY,
    payload: await CreateCategory(data),
  });
};

export const editSubCategory = (data) => async (dispatch) => {
  dispatch({
    type: ActionType.EDIT_SUBCATEGORY,
    payload: await UpdateCategory(data),
  });
};

export const deleteSubCategory = (id) => async (dispatch) => {
  await DeleteCategory(id);
  dispatch({
    type: ActionType.DELETE_SUBCATEGORY,
    payload: id,
  });
};

export const getTags = () => async (dispatch) => {
  dispatch({
    type: ActionType.FETCH_TAG_LIST_DATA,
    payload: await GetTagNames()
  })
};
