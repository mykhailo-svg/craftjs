import { useEditor } from "@craftjs/core";
import { Tooltip } from "@material-ui/core";
import cx from "classnames";
import React from "react";
import lz from "lzutf8";
import styled from "styled-components";

// import Checkmark from '../../../public/icons/check.svg';
// import Customize from '../../../public/icons/customize.svg';
// import RedoSvg from '../../../public/icons/toolbox/redo.svg';
// import UndoSvg from '../../../public/icons/toolbox/undo.svg';

const HeaderDiv = styled.div`
  width: 100%;
  height: 45px;
  z-index: 99999;
  position: relative;
  padding: 0px 10px;
  background: #d4d4d4;
  display: flex;
`;

const Btn = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  svg {
    margin-right: 6px;
    width: 12px;
    height: 12px;
    fill: #fff;
    opacity: 0.9;
  }
`;

const Item = styled.a<{ disabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #707070;
  }
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

export const Header = () => {
  const { enabled, canUndo, canRedo, actions, query, store } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    })
  );

  return (
    <HeaderDiv className="header text-white transition w-full">
      <div className="items-center flex w-full px-4 justify-end">
        <button
          onClick={() => {
            const json = query.serialize();
            const base64 = lz.encodeBase64(lz.compress(json));
            console.log(base64);
            
            actions.deserialize(
              lz.decompress(
                lz.decodeBase64(
                  "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"
                )
              )
            );
          }}
        >
          button
        </button>
        {enabled && (
          <div className="flex-1 flex">
            <Tooltip title="Undo" placement="bottom">
              <Item disabled={!canUndo} onClick={() => actions.history.undo()}>
                undo
              </Item>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <Item disabled={!canRedo} onClick={() => actions.history.redo()}>
                redo
              </Item>
            </Tooltip>
          </div>
        )}
        <div className="flex">
          <Btn
            className={cx([
              "transition cursor-pointer",
              {
                "bg-green-400": enabled,
                "bg-primary": !enabled,
              },
            ])}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            {enabled ? "checkmark" : "customize"}
            {enabled ? "Finish Editing" : "Edit"}
          </Btn>
        </div>
      </div>
    </HeaderDiv>
  );
};
