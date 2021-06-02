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

// export const RenderPosition = {
//   AFTERBEGIN: 'afterbegin',
//   BEFOREEND: 'beforeend',
// };

// export const render = (container, child, place) => {
//   if (container instanceof Abstract) {
//     container = container.getElement();
//   }

//   if (child instanceof Abstract) {
//     child = child.getElement();
//   }

//   switch (place) {
//     case RenderPosition.AFTERBEGIN:
//       container.prepend(child);
//       break;
//     case RenderPosition.BEFOREEND:
//       container.append(child);
//       break;
//   }
// };
// export const createElement = (template) => {
//   const newElement = document.createElement('div');
//   newElement.innerHTML = template.trim();

//   return newElement.firstChild;
// };

// export const remove = (component) => {
//   if (!(component instanceof Abstract)) {
//     throw new Error('Can remove only components');
//   }

//   component.getElement().remove();
//   component.removeElement();
// };

// export const replace = (newChild, oldChild) => {
//   if (oldChild instanceof Abstract) {
//     oldChild = oldChild.getElement();
//   }

//   if (newChild instanceof Abstract) {
//     newChild = newChild.getElement();
//   }

//   const parent = oldChild.parentElement;

//   if (parent === null || oldChild === null || newChild === null) {
//     throw new Error('Can\'t replace unexisting elements');
//   }

//   parent.replaceChild(newChild, oldChild);
// };
