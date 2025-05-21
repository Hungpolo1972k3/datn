import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ResultTable from "../components/ResultTable";
import { useTranslation } from "react-i18next";
import { apiRunBlastnTool, apiGetZipFile } from "../service/blastn";
import { useNotice } from "../context/NoticeContext";
import LoadingSpinner from "../components/LoadingSpinner";

// Styled components
const Container = styled.div`
  margin: 40px auto;
  padding: 20px 30px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgb(37 99 235 / 0.2);
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #1e3a8a;
  text-align: center;
  font-weight: 700;
`;

const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 2rem;
  justify-content: center;
`;

const TextInput = styled.input.attrs({ type: "text" })`
  flex: 1 1 300px;
  min-width: 280px;
  padding: 0.65rem 1rem;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 6px #2563ebaa;
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

const FileInputWrapper = styled.label`
  position: relative;
  flex: 1 1 300px;
  min-width: 280px;
  cursor: pointer;
  border: 2px dashed #2563eb;
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  color: #2563eb;
  font-weight: 600;
  font-size: 1rem;
  background-color: #ebf3ff;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #dbe7ff;
    border-color: #1e40af;
  }

  &:disabled {
    cursor: not-allowed;
    color: #9ca3af;
    border-color: #cbd5e1;
    background-color: #f9fafb;
  }
`;

const HiddenFileInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: #1e40af;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const ResetButton = styled(Button)`
  background-color: #ef4444;
  min-width: 80px;
  padding: 0.6rem 1rem;

  &:hover:not(:disabled) {
    background-color: #b91c1c;
  }
`;

const IconButton = styled(Button)`
  padding: 0.55rem;
  width: 44px;
  height: 44px;
  min-width: auto;
`;

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="20" height="20">
    <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="20" height="20">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ResultPage = () => {
  const { showNotice } = useNotice();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [uploadedIdList, setUploadedIdList] = useState([]);
  useEffect(() => {
    const storedUploadedIds = JSON.parse(localStorage.getItem("uploadedIdList") || "[]");
    setUploadedIdList(storedUploadedIds);
  }, []);
  const handleSearch = async () => {
    if (!search) return;
    setIsLoading(true);
    try {
      const result = await apiGetZipFile(search);
      if (result.data.status === 0) {
        showNotice(0, t("resultPage.error.existfile"));
      } else {
        setResults(result.data.data);
      }
    } catch (error) {
      showNotice(0, t("resultPage.uploadError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const result = await apiRunBlastnTool(file);
      const currentTime = new Date().toISOString();
      addBlastIdToUploadedList(result.data.id, currentTime, file.name);

      const response = await apiGetZipFile(result.data.id);
      if (response.data.status === 0) {
        showNotice(0, t("resultPage.error.existfile"));
      } else {
        setResults(response.data.data);
        showNotice(1, t("resultPage.success"));
      }
    } catch (error) {
      showNotice(0, t("resultPage.uploadError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFile = () => {
    setFile(null);
    setResults([]);
  };

  const addBlastIdToUploadedList = (id, time, fileName) => {
  let list = JSON.parse(localStorage.getItem("uploadedIdList") || "[]");
  const exists = list.find((item) => item.id === id);
    if (!exists) {
      const updatedList = [{ id, time, fileName }, ...list];
      localStorage.setItem("uploadedIdList", JSON.stringify(updatedList));
      setUploadedIdList(updatedList);
    }
  };


  return (
    <Container>
      <Title>{t("resultPage.title")}</Title>

      <FormGroup>
        <TextInput
          placeholder={t("resultPage.enterRid")}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          disabled={file !== null}
          aria-label={t("resultPage.enterRid")}
        />
        <IconButton
          onClick={handleSearch}
          disabled={file !== null || !search}
          aria-label={t("resultPage.search")}
          title={t("resultPage.search")}
        >
          <SearchIcon />
        </IconButton>
      </FormGroup>

      <FormGroup>
        <FileInputWrapper
          disabled={search !== ""}
          title={file ? file.name : t("resultPage.uploadFile")}
        >
          {file ? file.name : t("resultPage.uploadFile")}
          <HiddenFileInput
            accept=".fasta,.fa"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={search !== ""}
            aria-label={t("resultPage.uploadFile")}
          />
        </FileInputWrapper>
        <Button
          onClick={handleFileUpload}
          disabled={search !== "" || !file}
          aria-label={t("resultPage.upload")}
          title={t("resultPage.upload")}
        >
          <UploadIcon />
          {t("resultPage.upload")}
        </Button>

        {file && (
          <ResetButton
            onClick={handleResetFile}
            aria-label={t("resultPage.reset")}
            title={t("resultPage.reset")}
          >
            {t("resultPage.reset")}
          </ResetButton>
        )}
      </FormGroup>

      {uploadedIdList.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#1e3a8a", marginBottom: "8px" }}>{t("resultPage.previousIds")}</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0, color: "#2563eb" }}>
            {uploadedIdList.map((item, index) => (
              <li key={index} style={{ marginBottom: "6px" }}>
                {item.id} - {new Date(item.time).toLocaleString()} - {item.fileName}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ResultTable results={results} />

      {isLoading && (
        <div style={{ marginTop: "200px" }}>
          <LoadingSpinner />
        </div>
      )}
    </Container>
  );
};

export default ResultPage;
