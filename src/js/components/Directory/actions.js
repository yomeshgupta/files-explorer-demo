import { ACTION_TYPES } from '../../constants/index';

function getNodePayload(type) {
  const attributes = {
    id: +new Date(),
    name: '',
    type,
    isNew: true,
  };

  if (type === 'folder') {
    attributes.children = [];
  }

  return attributes;
}

export const createNode = ({ type }) => {
  return {
    type: ACTION_TYPES.CREATE_NODE,
    payload: getNodePayload(type),
  };
};

export const addNodeChildren = ({ type, parentId }) => {
  const attributes = getNodePayload(type);
  attributes.parentId = parentId;

  return {
    type: ACTION_TYPES.ADD_NODE_CHILDREN,
    payload: attributes,
  };
};

export const updateNode = ({ id, ...attributes }) => {
  return {
    type: ACTION_TYPES.UPDATE_NODE,
    payload: {
      id,
      attributes,
    },
  };
};

export const deleteNode = ({ id }) => {
  return {
    type: ACTION_TYPES.DELETE_NODE,
    payload: {
      id,
    },
  };
};

export const toggleContentVisibility = () => {
  return {
    type: ACTION_TYPES.TOGGLE_CONTENT_VISIBILITY,
  };
};
