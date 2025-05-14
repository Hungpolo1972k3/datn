import React from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  text-align: center;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  margin-bottom: 100px;
`;

const FileName = styled.h3`
  font-size: 1.5rem;
  margin: 20px 0;
`;

const FileContent = styled.div`
  font-size: 1rem;
  white-space: pre-wrap;
  text-align: left;
  margin: 0 30px;
  height: 100%;
  overflow-y: auto;
  display: inline-block;
  max-width: 100%; 
`;

const ShowFileContent = ({ fileContent, viewedFile }) => {
  return (
    fileContent && (
      <ContentContainer>
        <FileName>{viewedFile}</FileName>
        <FileContent>{fileContent}</FileContent>
      </ContentContainer>
    )
  );
};

export default ShowFileContent;
