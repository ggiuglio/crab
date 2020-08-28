import {
    SET_USER,
    LOGIN_ERROR,
    RESET_LOGIN_ERROR,
    LOAD_QUOTATION
} from '../actions/actionsTypes'

export const INITIAL_STATE = {
    quotation: undefined
 };

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginError: action.error
            }
        }
        case RESET_LOGIN_ERROR: {
            return {
                ...state,
                loginError: ''
            }
        }
        case LOAD_QUOTATION: {
            const quotation = mapQuotation(action.quotation);

            return {
                ...state,
                quotation: quotation
            }
        }

        default:
            return state
    }
}

export default Reducer


const mapQuotation = (quotation => {
    let modules = [];
    Object.keys(quotation.modules).forEach(k => {
        quotation.modules[k].id = k;
        modules.push(mapModule(quotation.modules[k]));
    });
    quotation.modules = modules;

    return quotation;
});

const mapModule = (module => {
    let activities = [];
    Object.keys(module.activities).forEach(k => {
        module.activities[k].id = k;
        activities.push(mapActivity(module.activities[k]));
    });
    module.activities = activities;

    return module;
});

const mapActivity = (activity => {
    let resources = [];
    Object.keys(activity.resources).forEach(k => {
        activity.resources[k].id = k;
        resources.push(activity.resources[k]);
    });
    activity.resources = resources;

    return activity;
});