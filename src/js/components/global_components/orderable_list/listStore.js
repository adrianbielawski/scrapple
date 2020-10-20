import { createContext } from 'react';
import { cloneDeep } from 'lodash';

export const ListContext = createContext();

export const initialState = {
    isTouchDevice: null,
    element: null,
    items: [],
    grabbedElement: {
        index: null,
        width: null,
        heigth: null,
        startCoords: { top: 0, left: 0 },
        coords: { top: 0, left: 0 },
        startGrabCoords: { x: 0, y: 0 },
    },
    distance: null,
    scrollStep: null,
    initialTopOffset: 0,
    transition: false,
}

export const reducer = (state, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {
        case 'DEVICE_INSPECTED':
            newState.isTouchDevice = action.isTouchDevice;
            return newState;
        case 'ELEMENT_GRABBED':
            newState.grabbedElement = {
                index: action.index,
                width: action.elementW,
                height: action.elementH,
                startCoords: action.startCoords,
                coords: action.startCoords,
                startGrabCoords: action.startGrabCoords,
            };
            newState.distance = 0;
            newState.initialTopOffset = window.pageYOffset;
            return newState;
        case 'ENABLE_TRANSITION':
            newState.transition = true;
            return newState;
        case 'ELEMENT_MOVED':
            newState.grabbedElement.coords = action.coords;
            newState.distance = action.distance;
            newState.scrollStep = action.scrollStep;
            return newState;
        case 'MOUSE_LEFT':
        case 'CLEAR_STATE':
            newState = cloneDeep(initialState);
            newState.isTouchDevice = state.isTouchDevice;
            return newState;
        default:
            throw new Error();
    }
};