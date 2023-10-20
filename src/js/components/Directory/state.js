import _ from 'lodash';

import { ACTION_TYPES } from '../../constants/index';

function findNodeAndUpdate(nodes, nodeIdToMatch, callback) {
  for (let i = 0; i < nodes.length; i++) {
    let currentNode = nodes[i];

    if (currentNode.id === nodeIdToMatch) {
      callback({
        nodes,
        currentIndex: i,
        currentNode,
      });
      break;
    } else if (currentNode.type === 'folder') {
      findNodeAndUpdate(currentNode.children, nodeIdToMatch, callback);
    }
  }
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_NODE: {
      return {
        ...state,
        nodes: [...state.nodes, action.payload],
      };
    }

    case ACTION_TYPES.TOGGLE_CONTENT_VISIBILITY: {
      return {
        ...state,
        showContents: !state.showContents,
      };
    }

    case ACTION_TYPES.ADD_NODE_CHILDREN: {
      const clonedNodes = _.cloneDeep(state.nodes);
      const { parentId, ...node } = action.payload;

      findNodeAndUpdate(clonedNodes, parentId, ({ currentNode }) => {
        currentNode.children.push(node);
      });

      return {
        ...state,
        nodes: clonedNodes,
      };
    }

    case ACTION_TYPES.UPDATE_NODE: {
      const clonedNodes = _.cloneDeep(state.nodes);
      const { id, attributes } = action.payload;

      findNodeAndUpdate(clonedNodes, id, ({ nodes, currentIndex }) => {
        nodes[currentIndex] = {
          ...nodes[currentIndex],
          ...attributes,
        };
      });

      return {
        ...state,
        nodes: clonedNodes,
      };
    }

    case ACTION_TYPES.DELETE_NODE: {
      const clonedNodes = _.cloneDeep(state.nodes);
      const { id } = action.payload;

      findNodeAndUpdate(clonedNodes, id, ({ nodes, currentIndex }) => {
        nodes.splice(currentIndex, 1);
      });

      return {
        ...state,
        nodes: clonedNodes,
      };
    }

    default: {
      return state;
    }
  }
};

export const initialState = {
  showContents: true,
  nodes: [
    {
      id: 1,
      type: 'file', // file | folder
      name: 'index.js',
    },
  ],
};
