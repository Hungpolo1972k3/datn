import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ResultTable from "../components/ResultTable";
import { useTranslation } from "react-i18next";
import { apiRunBlastnTool, apiGetZipFile, apiGetBlastnInfo, apiGetAllBlastn } from "../service/blastn";
import { useNotice } from "../context/NoticeContext";
import LoadingSpinner from "../components/LoadingSpinner";
import NoticeBlastnPopup from "../components/NoticeBlastnPopup";

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
const BreadcrumbWrapper = styled.nav`
  font-size: 14px;
  margin-bottom: 15px;
  margin-left: 5px;
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

const TableWrapper = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
`;

const Thead = styled.thead`
  background-color: #1e3a8a;
  color: #fff;
  text-align: left;
`;

const Th = styled.th`
  padding: 12px 16px;
  font-weight: bold;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 12px 16px;
  color: #1e3a8a;
  vertical-align: middle;

  a {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #ef4444;
  font-weight: 900;
  cursor: pointer;
  font-size: 2rem;
  user-select: none;

  &:hover {
    color: #b91c1c;
  }
`;

const Status = styled.span`
  font-weight: bold;
  color: ${({ status }) =>
    status === 1 ? '#16a34a' : status === 0 ? '#d97706' : '#dc2626'};
`;

const ResultPage = () => {
  const navigate = useNavigate();
  const { showNotice } = useNotice();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [uploadedIdList, setUploadedIdList] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [blastnInfo, setBlastnInfo] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [blastnId, setBlastnId] = useState("NoData");
  const [blastnAll, setBlastnAll] = useState([]);
  const THIRTY_MINUTES = 30 * 60 * 1000;
  useEffect(() => {
    const fetchBlastn = async () => {
      try {
        const data = await apiGetAllBlastn();
        const blastnCodeArray = data.data.map(item => item.code) || [];
        setBlastnAll(blastnCodeArray);
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu BLASTN:', error);
      }
    };
    fetchBlastn();
  }, []);

  useEffect(() => {
    const lockTime = sessionStorage.getItem("blastnLockTime");
    if (!lockTime) return;

    const now = new Date().getTime();
    const lockTimestamp = new Date(lockTime).getTime();
    const twentyMinutes = 20 * 60 * 1000;
    const remainingTime = twentyMinutes - (now - lockTimestamp);

    if (remainingTime > 0) {
      setIsLocked(true);
      const minutes = Math.ceil(remainingTime / 60000);

      showNotice(
        1,
        t("resultPage.waitMessage", {
          minutes,
        })
      );

      setTimeout(() => {
        setIsLocked(false);
        sessionStorage.removeItem("blastnLockTime");
      }, remainingTime);
    }
  }, []);

  useEffect(() => { 
    const storedUploadedIds = JSON.parse(localStorage.getItem("uploadedIdList") || "[]");
    const updatedStoredUploadedIds = storedUploadedIds.map((item) => {
      const itemTime = new Date(item.time).getTime();
      if (blastnAll.includes(item.id)) {
        return { ...item, status: 1 };
      } else {
        const isWithin30Minutes = Date.now() - itemTime < THIRTY_MINUTES;
        return {
          ...item,
          status: isWithin30Minutes ? 0 : -1,
        };
      }
    });
    setUploadedIdList(updatedStoredUploadedIds);
  }, [blastnAll]);

  const handleSearch = async () => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;
      setIsLoading(true);
      try {
        const result = await apiGetZipFile(trimmedSearch);
        if (result.data.status === 0) {
          showNotice(0, t("resultPage.error.existfile"));
        } else {
          setResults(result.data.data);
        }
        const data = await apiGetBlastnInfo(trimmedSearch);
        setBlastnInfo(data.data)
      } catch (error) {
        showNotice(0, t("resultPage.uploadError"));
      } finally {
        setIsLoading(false);
      }
    };

  const generateTimeBasedId = () => {
    return new Date().toISOString().replace(/[-:T.Z]/g, "") + Math.random().toString(36).substr(2, 5);
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

  const handleFileUpload = async () => {
    if (!file) return;

    const id = generateTimeBasedId();
    const currentTime = new Date().toISOString();
    addBlastIdToUploadedList(id, currentTime, file.name);
    sessionStorage.setItem("blastnLockTime", currentTime);
    try {
      setIsLocked(true);
      setResults([]);
      setBlastnInfo({});
      setBlastnId(id);
      setShowPopup(true);
      const result = await apiRunBlastnTool(file, id);
      const response = await apiGetZipFile(result.data.id);
      if (response.data.status === 0) {
        showNotice(0, t("resultPage.error.existfile"));
      } else {
        setResults(response.data.data);
        showNotice(1, t("resultPage.success"));
      }
    } catch (error) {
      showNotice(0, t("resultPage.uploadError"));
    }
  };

  const handleResetFile = () => {
    setFile(null);
    setResults([]);
    setSearch("");
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchId = params.get("search");
    if (searchId) {
      setSearch(searchId);
    }
  }, [location]);

  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search]);
  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.reload();
  };
  return (
    <Container>
      <BreadcrumbWrapper>
          <Crumb onClick={() => navigate('/')}>{t("breadcrumb.ABDataset")}</Crumb>
          <Separator>›</Separator>
          <CrumbMain onClick={() => navigate('/blastn-result')}>{t("breadcrumb.blastn")}</CrumbMain>
      </BreadcrumbWrapper>
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
          disabled={search !== "" || isLocked}
          title={file ? file.name : t("resultPage.uploadFile")}
        >
          {file ? file.name : t("resultPage.uploadFile")}
          <HiddenFileInput
            accept=".fasta,.fa"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={search !== "" || isLocked}
            aria-label={t("resultPage.uploadFile")}
          />
        </FileInputWrapper>

        <Button
          onClick={handleFileUpload}
          disabled={search !== "" || !file || isLocked}
          aria-label={t("resultPage.upload")}
          title={t("resultPage.upload")}
        >
          <UploadIcon />
          {t("resultPage.upload")}
        </Button>

        {file && (
          <ResetButton
            onClick={handleResetFile}
            disabled={isLocked}
            aria-label={t("resultPage.reset")}
            title={t("resultPage.reset")}
          >
            {t("resultPage.reset")}
          </ResetButton>
        )}
      </FormGroup>

      {uploadedIdList.length > 0 && (
        <TableWrapper>
          <h3 style={{ color: "#1e3a8a", marginBottom: "8px" }}>
            {t("resultPage.previousIds")}
          </h3>
          <Table>
            <Thead>
              <Tr>
                <Th>{t("resultPage.index")}</Th>
                <Th>{t("resultPage.id")}</Th>
                <Th>{t("resultPage.timeCreate")}</Th>
                <Th>{t("resultPage.fileName")}</Th>
                <Th>{t("resultPage.status.title")}</Th>
                <Th>{t("resultPage.action")}</Th>
              </Tr>
            </Thead>
            <tbody>
              {uploadedIdList.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <a
                      href={`/blastn-result?search=${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.id}
                    </a>
                  </Td>
                  <Td>{new Date(item.time).toLocaleString()}</Td>
                  <Td>{item.fileName}</Td>
                  <Td>
                    <Status status={item.status}>
                      {item.status === 1
                        ? t("resultPage.status.success")
                        : item.status === 0
                        ? t("resultPage.status.process")
                        : t("resultPage.status.fail")
                      }
                    </Status>
                  </Td>
                  <Td>
                    <DeleteButton
                      onClick={() => {
                        const filteredList = uploadedIdList.filter((_, i) => i !== index);
                        localStorage.setItem("uploadedIdList", JSON.stringify(filteredList));
                        setUploadedIdList(filteredList);
                      }}
                      title={t("resultPage.delete")}
                    >
                      x
                    </DeleteButton>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}

      {results.length > 0 && (
        <ResultTable results={results} blastnInfo={blastnInfo} />
      )}
      {showPopup && (
        <NoticeBlastnPopup id={blastnId} onClose={handleClosePopup} />
      )}
      {isLoading && (
        <div style={{ marginTop: "200px" }}>
          <LoadingSpinner />
        </div>
      )}
    </Container>
  );
};

export default ResultPage;
