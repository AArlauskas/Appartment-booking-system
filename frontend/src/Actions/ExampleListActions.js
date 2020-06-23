import {
    ActionType
} from "../Constants";
import * as dataAccess from "../DataAccess";

export const fetchListData = () => (dispatch) => {
    dispatch({
        type: ActionType.LOAD_LIST
    });

    dataAccess.getListData().then(result => {
        dispatch({
            type: ActionType.LOAD_LIST_SUCCESSFUL,
            payload: result.data,
        });
    }).catch(() => {
        dispatch({
            type: ActionType.LOAD_LIST_FAIL
        });
    });

};

export const addListItem = (data) => (dispatch) => {
    dataAccess.addListItem(data).then((newitem) => {
        dispatch({
            type: ActionType.ADD_LISTITEM_SUCCESSFUL,
            payload: newitem.data,
        });
    }).catch(() => {
        dispatch({
            type: ActionType.ADD_LISTITEM_FAIL
        });
    });
};

export const deleteListItem = (id) => (dispatch) => {
    dataAccess.deleteListItem(id).then(() => {
        dispatch({
            type: ActionType.DELETE_LISTITEM_SUCCESSFUL,
            payload: id,
        });
    }).catch(() => {
        dispatch({
            type: ActionType.DELETE_LISTITEM_FAIL
        });
    });
};