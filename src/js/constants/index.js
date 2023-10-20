export const NODE_TYPES = {
  FILE: 'file',
  FOLDER: 'folder',
};

export const FILE_CONTROLS = {
  canEdit: true,
  canRemove: true,
  canCreateFile: false,
  canCreateFolder: false,
};

export const FOLDER_CONTROLS = {
  canEdit: true,
  canRemove: true,
  canCreateFile: true,
  canCreateFolder: true,
};

export const ACTION_TYPES = {
  CREATE_NODE: 'CREATE_NODE',
  TOGGLE_CONTENT_VISIBILITY: 'TOGGLE_CONTENT_VISIBILITY',
  UPDATE_NODE: 'UPDATE_NODE',
  DELETE_NODE: 'DELETE_NODE',
  ADD_NODE_CHILDREN: 'ADD_NODE_CHILDREN',
};
