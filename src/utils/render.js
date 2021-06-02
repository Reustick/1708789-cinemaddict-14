import AbstractView from '../view/abstract.js';

const InsertPosition = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

const render = (container, element, place = InsertPosition.BEFORE_END) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (place) {
    case InsertPosition.AFTER_END:
      container.prepend(element);
      break;
    case InsertPosition.BEFORE_END:
      container.append(element);
      break;
    default:
      throw new Error('Unknown insert position selected');
  }
};

const createElement = (template) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;

  return wrapper.firstChild;
};

const replace = (newChild, oldChild) => {
  if (oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('No parent element');
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export { InsertPosition, render, createElement, replace, remove };
