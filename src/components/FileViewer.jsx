import React from "react";
import styled from "styled-components";

const FileViewerWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: auto;
  white-space: pre-wrap;
  background-color: #fafafa;
`;

const FileViewer = ({ content }) => {
  return <FileViewerWrapper>{content}</FileViewerWrapper>;
};

export default FileViewer;
