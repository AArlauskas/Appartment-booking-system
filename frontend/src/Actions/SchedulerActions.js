import { ActionType } from "../Constants";
import {
	GetAllCategories,
	GetSchedulerEvents,
	CreateSchedulerEvent,
	DeleteSchedulerEvent,
	EditeSchedulerEvent
} from "../API/API";

export const fetchSchedulerResources = () => async (dispatch) => {
	await GetAllCategories().then((result) => {
		let schedulerCategories = [];
		result.forEach((category) => {
			schedulerCategories.push({
				id: category.id,
				name: category.name,
				groupOnly: category.parentId === null,
				color: category.color,
				parentId: category.parentId,
				tags: category.tags
			});
		});
		dispatch({
			type: ActionType.SCHEDULER_LOAD_RESOURCES,
			payload: schedulerCategories
		});
	});
};

export const fetchSchedulerEvents = () => async (dispatch) => {
	await GetSchedulerEvents().then((result) => {
		let schedulerEvents = [];
		result.forEach((event) => {
			schedulerEvents.push({
				id: event.id,
				start: event.start,
				end: event.end,
				resourceId: event.categoryId,
				title: event.title,
				isApproved: event.isApproved
			});
		});
		dispatch({
			type: ActionType.SCHEDULER_LOAD_EVENTS,
			payload: schedulerEvents.sort((event) => event.date)
		});
	});
};

export const addNewSchedulerEvent = (data) => async (dispatch) => {
	let newEvent = {
		Title: data.title,
		Start: data.start,
		End: data.end,
		IsApproved: data.isApproved,
		CategoryId: data.resourceId
	};
	await CreateSchedulerEvent(newEvent).then((result) => {
		dispatch({
			type: ActionType.SCHEDULER_ADD_NEW_EVENT,
			payload: result
		});
	});
};

export const editSchedulerEvent = (data) => async (dispatch) => {
	let editedEvent = {
		Id: data.id,
		Title: data.title,
		Start: data.start,
		End: data.end,
		IsApproved: data.isApproved,
		CategoryId: data.resourceId
	};
	await EditeSchedulerEvent(editedEvent).then((result) => {
		dispatch({
			type: ActionType.SCHEDULER_EDIT_EVENT,
			payload: result
		});
	});
};

/* export const editSchedulerEvent = (data) => (dispatch) => {
    dataAccess.editSchedulerEvent(data).then((updateEvent) => {
        dispatch({
            type: ActionType.SCHEDULER_EDIT_EVENT,
            payload: updateEvent.data
        });
    }).catch(() => {
        dispatch({
            type: ActionType.EDIT_COMPONENT_ITEM_FAIL
        });
    });
}; */

export const deleteSchedulerEvent = (data) => async (dispatch) => {
	DeleteSchedulerEvent(data.event.id).then(() => {
		dispatch({
			type: ActionType.SCHEDULER_DELETE_EVENT,
			payload: data
		});
	});
};
