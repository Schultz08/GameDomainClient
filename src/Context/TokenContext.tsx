import React from 'react';

const TokenContext = React.createContext("");

const { Provider, Consumer } = TokenContext;

export { Provider, Consumer };

export default TokenContext;