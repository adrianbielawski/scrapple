import { cloneDeep } from 'lodash';
import { userDeserializer } from '../serializers'

export const initialState = {
    screenHeight: window.innerHeight,
    isTouchDevice: false,
    deviceOrientation: '',
    user: null,
    language: 'en-GB',
    alert: {
        show: false,
        type: '',
        messageKey: '',
        messageValue: '',
        action: '',
        alertProps: '',
    },
};

export const appReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'APP/SET_SCREEN_HEIGHT':
            newState.screenHeight = action.height;
            return newState;

        case 'APP/SET_IS_TOUCH_DEVICE':
            newState.isTouchDevice = action.isTouchDevice;
            return newState;

        case 'APP/SET_DEVICE_ORIENTATION':
            newState.deviceOrientation = action.deviceOrientation;
            return newState;

        case 'GAME_MENU/CHANGE_LANGUAGE_SUCCESS':
        case 'APP/LANGUAGE_CHANGED':
            newState.language = action.language;
            return newState;

        case 'GAME_PAGE/FETCH_GAME_DATA/SUCCESS':
        case 'GAME_PAGE/GAME_CHANGED':
            newState.language = action.gameData.language;
            return newState;

        case 'APP/SET_ALERT':
            newState.alert = {
                show: true,
                type: action.alertType,
                messageKey: action.messageKey,
                messageValue: action.messageValue,
                action: action.action,
                alertProps: action.alertProps,
            }
            return newState;

        case 'APP/REMOVE_ALERT':
            newState.alert = {
                show: false,
                type: '',
                messageKey: '',
                messageValue: '',
                action: '',
                props: '',
            }
            return newState;

        case 'APP/SET_USER':
        case 'AUTH/LOG_IN/SUCCESS':
        case 'AUTH/SIGN_UP/SUCCESS':
        case 'AUTH/GET_USER/SUCCESS':
            newState.user = userDeserializer(action.user);
            return newState;

        case 'AUTH/USERNAME_CHANGE/SUCCESS':
            newState = cloneDeep(newState);
            newState.user.username = action.newName;
            return newState;

        case 'AUTH/PROFILE_IMAGE_UPDATE/SUCCESS':
            newState = cloneDeep(newState);
            newState.user.image = action.image;
            return newState;

        case 'APP/CLEAR_APP_STATE':
            newState = cloneDeep(initialState);
            newState.language = state.language;
            newState.isTouchDevice = state.isTouchDevice;
            return newState;

        default:
            return state;
    }
}

export default appReducer;