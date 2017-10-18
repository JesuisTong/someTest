
const capitalize = string => (
    string.charAt(0).toUpperCase() + string.slice(1)
);
  
/**
 * Prefix EventListener
 */
const prefixEventListener = (element, event, cb, addListener = true) => {
    const listener = addListener ? 'addEventListener' : 'removeEventListener';
    return ['webkit', 'moz', 'MS', 'o', '']
    .map(prefix => prefix ? prefix + capitalize(event) : event)
    .forEach(eventName => element[listener](eventName, cb));
};

export default prefixEventListener;
// prefixEventListener(element, 'transitionEnd', fn);

// prefixEventListener(element, 'transitionEnd', fn, false);
