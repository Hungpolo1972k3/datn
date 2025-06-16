import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { apiRunVirulenceTool } from "../service/virulence";
import { apiRunAmrTool } from "../service/amr";
import { useNotice } from "../context/NoticeContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ResultComponent from "../components/ResultComponent";

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #1e3a8a;
`;

const DropdownWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
`;

const ChooseFileButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

const ChooseFileButton = styled.label`
  padding: 25px 50px;
  margin-bottom: 50px;
  background-color: #ffffff;
  color: #007bff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  width: 80%;
  height: 250px;
  transition: background-color 0.3s ease, color 0.3s ease; 
  border: 2px dashed #007bff;

  &:hover {
    background-color: #e2f1ff; 
    color: #0056b3; 
    transform: translateY(-3px); 
  }

  input {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 30px;
`;

const ButtonSubmit = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonReset = styled.button`
  padding: 12px 20px;
  background-color: #f8f9fa;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e2e6ea;
  }
`;

const BreadcrumbWrapper = styled.nav`
  font-size: 14px;
  margin-bottom: 15px;
  margin-top: 15px;
  margin-left: 40px;
  color: #555;
  user-select: none;
  align-self: flex-start;
`;

const Crumb = styled.span`
  cursor: pointer;
  color: #1e3a8a;
  font-weight: bold;
  font-size: 22px;
  &:hover {
    text-decoration: underline;
  }
`;

const CrumbMain = styled.span`
  cursor: pointer;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 15px;
  font-size: 30px;
`;

const Tool = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const resultRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotice } = useNotice();
  const [file, setFile] = useState(null);
  const [fastaInfo, setFastaInfo] = useState({
    name: "Acinetobacter Baumanii",
    header: "",
    length: "",
    createdAt: "",
  });
  const [virulenceInfo, setVirulenceInfo] = useState([]);
  const [amrInfo, setAmrInfo] = useState([]);
  const [isSuccessConfirm, setIsSuccessConfirm] = useState(false);
  const [header, setHeader] = useState("");
  const [length, setLength] = useState(0);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = function (event) {
        const text = event.target.result;
        const lines = text.split(/\r?\n/);
        const headerLine = lines.find((line) => line.startsWith(">"));
        setHeader(headerLine || "");
        const sequenceLines = lines.filter((line) => !line.startsWith(">") && line.trim() !== "");
        const totalLength = sequenceLines.join("").length;
        setLength(totalLength);
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleReset = () => {
    setFile(null);
    setHeader("");
    setLength(0);
    setIsSuccessConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      showNotice(0, t("toolPage.uploadFile"));
      return;
    }
    setIsLoading(true);
    try {
      const [virulence, amr] = await Promise.all([
        apiRunVirulenceTool(file),
        apiRunAmrTool(file),
      ]);
      setFastaInfo((prev) => ({
        ...prev,
        header,
        length,
        createdAt: Date.now(),
      }));
      setVirulenceInfo(virulence.data);
      setAmrInfo(amr.data);
      showNotice(1, t("toolPage.successConfirm"));
      setIsSuccessConfirm(true);
      setIsLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error) {
      showNotice(0, t("toolPage.failConfirm"));
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <BreadcrumbWrapper>
          <Crumb onClick={() => navigate('/')}>{t("breadcrumb.ABDataset")}</Crumb>
          <Separator>›</Separator>
          <CrumbMain onClick={() => navigate('/tool')}>{t("breadcrumb.tool")}</CrumbMain>
      </BreadcrumbWrapper>
        <Title>{t("toolPage.title")}</Title>
        <DropdownWrapper>
          <ChooseFileButtonWrapper>
            <ChooseFileButton>
            <img src="./upload.png"  alt="Upload Icon" width="150" height="150"/>
                {file ? file.name : t("toolPage.chooseFile")}
              <input
                type="file"
                accept=".fa,.fas,.fna,.fasta"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </ChooseFileButton>
          </ChooseFileButtonWrapper>
        </DropdownWrapper>
        <ButtonWrapper>
          <ButtonSubmit type="button" onClick={handleSubmit}>
            {t("toolPage.submitBtn")}
          </ButtonSubmit>
          <ButtonReset type="button" onClick={handleReset}>
            {t("toolPage.resetBtn")}
          </ButtonReset>
        </ButtonWrapper>
        {isLoading && <LoadingSpinner />}
        {isSuccessConfirm && (
          <div ref={resultRef}>
            <ResultComponent
              fastaInfo={fastaInfo}
              virulenceInfo={virulenceInfo}
              amrInfo={amrInfo}
            />
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

export default Tool;
