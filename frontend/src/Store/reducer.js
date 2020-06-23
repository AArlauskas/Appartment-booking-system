import { ActionType } from "../Constants";
import { LoadingStatus } from "../Constants";
//import _ from "lodash"

const initialState = {
	listData: [],
	categoryData: [],
	subCategoryData: [],
	schedulerResources: [],
	schedulerEvents: [],
	tagListData: [],
	IsReadOnly: false
};

// EXAMPLE LIST
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.LOAD_LIST: {
			//same as "case ActionType.LOAD_COMPONENT: {"
			return {
				...state,
				loadingStatus: LoadingStatus.LOADING
			};
		}

		case ActionType.LOAD_LIST_SUCCESSFUL: {
			return {
				...state,
				listData: action.payload,
				loadingStatus: LoadingStatus.LOADED
			};
		}

		case ActionType.LOAD_LIST_FAIL: {
			// same as "case ActionType.LOAD_COMPONENT_FAIL: {"
			return {
				...state,
				loadingStatus: LoadingStatus.LOAD_ERROR
			};
		}

		case ActionType.ADD_LISTITEM_SUCCESSFUL: {
			let newItem = action.payload;
			return {
				...state,
				listData: [ ...state.listData, newItem ]
			};
		}

		case ActionType.DELETE_LISTITEM_SUCCESSFUL: {
			let idToDelete = action.payload;
			return {
				...state,
				listData: state.listData.filter((el) => el.id !== idToDelete)
			};
		}

		// CATEGORY LIST
		case ActionType.LOAD_CATEGORY_LIST: {
			return {
				...state,
				categoryData: action.payload
			};
		}

		case ActionType.LOAD_SUBCATEGORY_LIST: {
			return {
				...state,
				subCategoryData: action.payload
			};
		}

		case ActionType.ADD_CATEGORY: {
			let newCategory = action.payload;
			return {
				...state,
				categoryData: [ ...state.categoryData, newCategory ]
			};
		}

		case ActionType.EDIT_CATEGORY: {
			let editedCategory = action.payload;
			let index = state.categoryData.indexOf(
				state.categoryData.find((category) => category.id === editedCategory.id)
			);
			state.categoryData[index] = editedCategory;
			return {
				...state,
				categoryData: [ ...state.categoryData ]
			};
		}

		case ActionType.DELETE_CATEGORY: {
			let deleteCategoryId = action.payload;
			return {
				...state,
				categoryData: state.categoryData.filter((category) => category.id !== deleteCategoryId),
				subCategoryData: state.subCategoryData.filter(
					(subCategory) => subCategory.parentCategory !== deleteCategoryId
				)
			};
		}

		case ActionType.ADD_SUBCATEGORY: {
			let newSubCategory = action.payload;
			return {
				...state,
				subCategoryData: [ ...state.subCategoryData, newSubCategory ]
			};
		}

		case ActionType.EDIT_SUBCATEGORY: {
			let editedSubCategory = action.payload;
			let index = state.subCategoryData.indexOf(
				state.subCategoryData.find((category) => category.id === editedSubCategory.id)
			);
			state.subCategoryData[index] = editedSubCategory;
			return {
				...state,
				subCategoryData: [ ...state.subCategoryData ]
			};
		}

		case ActionType.DELETE_SUBCATEGORY: {
			let deleteSubCategoryId = action.payload;
			return {
				...state,
				subCategoryData: state.subCategoryData.filter((subCategory) => subCategory.id !== deleteSubCategoryId)
			};
		}

		case ActionType.LOAD_COMPONENT_FAIL: {
			return {
				...state,
				loadingStatus: LoadingStatus.LOAD_ERROR
			};
		}

		// SCHEDULER
		case ActionType.SCHEDULER_LOAD_RESOURCES: {
			return {
				...state,
				schedulerResources: action.payload,
				loadingStatus: LoadingStatus.LOADED
			};
		}

		case ActionType.SCHEDULER_LOAD_EVENTS: {
			return {
				...state,
				schedulerEvents: action.payload,
				loadingStatus: LoadingStatus.LOADED
			};
		}

		case ActionType.SCHEDULER_ADD_NEW_EVENT: {
			let obj = action.payload;
			let id = obj.id;
			let start = obj.start;
			let end = obj.end;
			let resourceId = obj.categoryId;
			let title = obj.title;
			let isApproved = obj.isApproved;
			let newEvent;

			let color = isApproved ? "lime" : "grey";
			newEvent = {
				id: id,
				start: start, //start date
				end: end, //end date
				resourceId: resourceId, //Coordinate of subcategory (A1,B2,C2) //Name of subcat (NewYork)
				title: title, //Name of event
				isApproved: isApproved, //Approved or draft
				bgColor: color
			};
			return {
				...state,
				schedulerEvents: [ ...state.schedulerEvents, newEvent ]
			};
		}

		case ActionType.SCHEDULER_EDIT_EVENT: {
			let obj = action.payload;
			let id = obj.id;
			let start = obj.start;
			let end = obj.end;
			let resourceId = obj.categoryId;
			let title = obj.title;
			let isApproved = obj.isApproved;
			let color = isApproved ? "lime" : "grey";
			let editedEvent = {
				id: id,
				start: start, //start date
				end: end, //end date
				resourceId: resourceId, //Coordinate of subcategory (A1,B2,C2) //Name of subcat (NewYork)
				title: title, //Name of event
				isApproved: isApproved, //Approved or draft
				bgColor: color
			};
			let index = state.schedulerEvents.findIndex((event) => event.id === editedEvent.id);
			state.schedulerEvents[index] = editedEvent;
			return {
				...state,
				schedulerEvents: [ ...state.schedulerEvents ]
			};
		}

		/* case ActionType.SCHEDULER_EDIT_EVENT: {
      let updatedEvent;
      let obj = action.payload;
      let event = obj.event;
      let idToUpdate = event.id;
      let objLength = Object.keys(obj).length;
      let color = event.bgColor;

      if (objLength === 1) {
        alert(`"onEventEdit" EDIT fired: {id: ${event.id}, title: ${event.title}}`);

        return {
          ...state
        }

      } else if (objLength === 2) {
        let newStart = obj.start;
        let newEnd = obj.end;

        if (newStart !== undefined) {
          alert(`"onEventEdit" NEW START fired: {id: ${event.id}, title: ${event.title}, newStart: ${newStart}}`);

          updatedEvent = _.cloneDeep(state.schedulerEvents.find((e) => e.id === idToUpdate))
          updatedEvent.start = newStart;
          state.schedulerEvents = state.schedulerEvents.filter((e) => e.id !== idToUpdate)

        } else {
          alert(`"onEventEdit" NEW END fired: {id: ${event.id}, title: ${event.title}, newEnd: ${newEnd}}`);


          updatedEvent = _.cloneDeep(state.schedulerEvents.find((e) => e.id === idToUpdate))
          updatedEvent.end = newEnd;
          state.schedulerEvents = state.schedulerEvents.filter((e) => e.id !== idToUpdate)

        }
      } else if (objLength === 5) {
        let resourceId = obj.resourceId;
        let resourceName = obj.resourceName;
        let start = obj.start;
        let end = obj.end;
        alert(`"onEventEdit" MOVE fired: {eventId: ${event.id}, eventTitle: ${event.title}, ` +
          `newSlotId: ${resourceId}, newSlotName: ${resourceName}, newStart: ${start}, newEnd: ${end}}`);


        updatedEvent = _.cloneDeep(state.schedulerEvents.find((e) => e.id === idToUpdate))
        updatedEvent.resourceId = resourceId;
        updatedEvent.resourceName = resourceName;
        updatedEvent.start = start;
        updatedEvent.end = end;
        updatedEvent.bgColor = color;
        state.schedulerEvents = state.schedulerEvents.filter((e) => e.id !== idToUpdate)

      }
      return {
        ...state,
        schedulerEvents: [...state.schedulerEvents, updatedEvent]
      };
    } */

		case ActionType.SCHEDULER_DELETE_EVENT: {
			let obj = action.payload;
			let event = obj.event;
			let idToDelete = event.id;

			return {
				...state,
				schedulerEvents: state.schedulerEvents.filter((e) => e.id !== idToDelete)
			};
		}

		//Tags List
		case ActionType.FETCH_TAG_LIST_DATA:
			return {
				...state,
				tagListData: action.payload
			};

		case ActionType.FETCH_TAG_CATEGORIES_DATA:
			return {
				...state,
				tagCategoriesData: action.payload
			};

		case ActionType.CREATE_TAG:
			let tagInput = action.payload;
			return {
				...state,
				tagListData: [ ...state.tagListData, tagInput ]
			};

		case ActionType.EDIT_TAG: {
			let editedTag = action.payload;
			let index = state.tagListData.indexOf(state.tagListData.find((tag) => tag.id === editedTag.id));
			state.tagListData[index] = editedTag;
			return {
				...state,
				tagListData: [ ...state.tagListData ]
			};
		}
		case ActionType.DELETE_TAG:
			let deleteTagId = action.payload;
			return {
				...state,
				tagListData: state.tagListData.filter((target) => target.id !== deleteTagId)
			};

		// case ActionType.CHECK_TAG:
		//   let checkTag = action.payload;
		//   if(state.tagListData.filter((target) => {
		//     target.name === checkTag.name
		//   }) != null){
		//     return false;
		//   }
		//   else{
		//     return true;
		//   }

		default:
			return {
				...state
			};
	}
};
