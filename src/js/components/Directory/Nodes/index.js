import { useMemo, useState } from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaTrash, FaPen } from 'react-icons/fa';

import Controls from '../Controls';

import { useDirectoryContext } from '../hooks/DirectoryContext';
import { addNodeChildren, updateNode, deleteNode } from '../actions';

import { FILE_CONTROLS, FOLDER_CONTROLS, NODE_TYPES } from '../../../constants/index';

export const computeConfigBasedOnType = (type, isOpen) => {
  if (type === NODE_TYPES.FILE) {
    return {
      icon: FaFile,
      controls: FILE_CONTROLS,
    };
  }

  return {
    icon: isOpen ? FaFolderOpen : FaFolder,
    controls: FOLDER_CONTROLS,
  };
};

const Node = ({ type, name, id, children, level, isNew }) => {
  const [nodeName, setNodeName] = useState(name);
  const [isEdit, setIsEdit] = useState(isNew);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const { dispatch } = useDirectoryContext();

  const config = computeConfigBasedOnType(type, isOpen);
  const Icon = config.icon;

  const handleControlItemClick = (action) => {
    if (
      type === 'folder' &&
      (action === 'createFile' || action === 'createFolder')
    ) {
      setIsOpen(true);

      return dispatch(
        addNodeChildren({
          type: action === 'createFile' ? 'file' : 'folder',
          parentId: id,
        })
      );
    }

    if (action === 'edit') {
      setIsEdit(true);
    }

    if (action === 'remove') {
      return dispatch(
        deleteNode({
          id,
        })
      );
    }
  };

  const updateNodeName = (e) => {
    if (!isNew && !nodeName) {
      setError(true);
      return;
    } else if (isNew && !nodeName) {
      return dispatch(
        deleteNode({
          id,
        })
      );
    }

    dispatch(
      updateNode({
        id,
        name: nodeName,
        isNew: false,
      })
    );

    setError(false);
    setIsEdit(false);
  };

  const handleKeyDown = (e) => {
    const { key = '', keyCode = -1 } = e;
    const isEnterKey = key.toLowerCase() === 'enter' || keyCode === 13;

    if (isEnterKey) {
      updateNodeName();
    }
  };

  const handleTitleClick = () => {
    if (!isEdit && type === NODE_TYPES.FOLDER) {
      setIsOpen(!isOpen);
    }
  }

  return (
    <div>
      <div className="node" style={{ paddingLeft: `calc(${level} * 12px)` }}>
        <div className="entry">
          <div className="title" onClick={handleTitleClick}>
            <Icon />
            {isEdit ? (
              <div className={error ? 'error' : ''}>
                <input
                  type="text"
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={updateNodeName}
                  autoFocus
                />
                {error ? <div>File or Folder name must be provided</div> : null}
              </div>
            ) : (
              <p>{nodeName}</p>
            )}
          </div>
          <Controls
            {...config.controls}
            onAction={handleControlItemClick}
          />
        </div>
      </div>
      {children && children.length && isOpen ? (
        <div className="node_contents">
          <Nodes nodes={children} level={level + 1} />
        </div>
      ) : null}
    </div>
  );
};

const Nodes = ({ nodes, level = 0 }) => {
  return (
    <div className="nodes">
      {nodes.map((node) => {
        return <Node key={node.id} {...node} level={level} />;
      })}
    </div>
  );
};

export default Nodes;
