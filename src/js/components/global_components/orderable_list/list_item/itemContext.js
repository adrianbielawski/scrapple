import React from 'react';

const ItemContext = React.createContext({
    onRemove: () => { },
    element: null,
    index: null,
});

export default ItemContext;