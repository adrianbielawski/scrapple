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

export const changeLanguage = (language) => ({
    type: 'APP/LANGUAGE_CHANGED',
    language,
})

export const clearAppStateOnExit = () => {
    return {
        type: 'APP/EXIT_GAME',
    };
}