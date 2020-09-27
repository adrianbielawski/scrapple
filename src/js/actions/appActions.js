import i18n from 'i18n';
import axiosInstance from 'axiosInstance';

export const clearAppState = () => {
    return {
        type: 'APP/CLEAR_APP_STATE',
    }
}

export const setLanguage = language => {
    return {
        type: 'APP/SET_LANGUAGE',
        language
    }
}

export const setScreenHeight = (height) => {
    return {
        type: 'APP/SET_SCREEN_HEIGHT',
        height
    }
}

export const setIsTouchDevice = (isTouchDevice) => {
    return {
        type: 'APP/SET_IS_TOUCH_DEVICE',
        isTouchDevice
    }
}

export const setDeviceOrientation = (deviceOrientation) => {
    return {
        type: 'APP/SET_DEVICE_ORIENTATION',
        deviceOrientation
    }
}

export const setAlert = (alertType, messageKey, messageValue, action, alertProps) => {
    return {
        type: 'APP/SET_ALERT',
        alertType,
        messageKey,
        messageValue,
        action,
        alertProps,
    }
}

export const removeAlert = () => {
    return {
        type: 'APP/REMOVE_ALERT',
    }
}

export const changeLanguage = (language, gameId) => {
    return dispatch => {
        if (gameId) {
            axiosInstance.patch(`/games/${gameId}/`, { language })
        }
        const html = document.getElementsByTagName('html');
        html[0].lang = language;
        i18n.changeLanguage(language);
        dispatch(setLanguage(language));
    }
}

export const clearAppStateOnExit = () => {
    return {
        type: 'APP/EXIT_GAME',
    };
}