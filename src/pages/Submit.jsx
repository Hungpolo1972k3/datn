import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { apiCreateSample, apiDeleteSampleById } from "../service/sample";
import { apiGetVirulenceInfo } from "../service/virulence";
import { apiGetAmrInfo } from "../service/amr";
import ResultComponent from "../components/ResultComponent";
import { useDispatch, useSelector } from "react-redux";
import { apiGetExperimentsByUserId } from "../service/experiment";
import { useNotice } from "../context/NoticeContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #1e3a8a;
`;

const DropdownWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Dropdown = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  font-size: 16px;
  width: 100%;
  &:focus {
    outline: none;
    border: 1px solid #86b7fe;
    box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 1px solid #86b7fe;
    box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
  }
`;

const ChooseFileButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const ChooseFileButton = styled.label`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  input {
    display: none;
  }
`;

const UploadIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: white;
  clip-path: polygon(100% 50%, 0 100%, 100% 100%);
  margin-right: 8px;
  transform: rotate(45deg);
`;

const FileName = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
`;


const Submit = () => {
  const { t } = useTranslation(); 
  const { userId } = useSelector((state) => state.user);
  const { showNotice } = useNotice();

  const [selectedExperiment, setSelectedExperiment] = useState("");
  const [header, setHeader] = useState("");
  const [length, setLength] = useState(0);
  const [fastaFilePath, setFastaFilePath] = useState("");
  const [sampleName, setSampleName] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [fastaInfo, setFastaInfo] = useState({});
  const [virulenceInfo, setVirulenceInfo] = useState([]);
  const [amrInfo, setAmrInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    const fetchExperiments = async () => {
      if (!userId) return;
      try {
        const res = await apiGetExperimentsByUserId(userId);
        setExperiments(res.data);
      } catch (err) {
        console.log("Lỗi", err);
      }
    };
    fetchExperiments();
  }, [userId]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFastaFilePath(uploadedFile.name);

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

  const [errors, setErrors] = useState({
    selectedExperiment: "",
    sampleName: "",
    file: "",
  });

  const validateForm = () => {
    const newErrors = {
      selectedExperiment: "",
      sampleName: "",
      file: "",
    };
    let isValid = true;

    if (!selectedExperiment) {
      newErrors.selectedExperiment = t("submitPage.error.selectExperiment");
      isValid = false;
    }

    if (!sampleName.trim()) {
      newErrors.sampleName = t("submitPage.error.sampleName");
      isValid = false;
    }

    if (!file) {
      newErrors.file = t("submitPage.error.file");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    let sampleId = "";
    try {
      const result = await apiCreateSample(userId, selectedExperiment, sampleName, header, length, fastaFilePath);
      if(result.status === -1) {
        showNotice(0, t("submitPage.existName"));
      }else{
        sampleId = result.data._id;
        setFastaInfo(result.data);
    
        try {
          const [virulenceRes, amrRes] = await Promise.all([
            apiGetVirulenceInfo(file, sampleId),
            apiGetAmrInfo(file, sampleId),
          ]);
          setVirulenceInfo(virulenceRes.data);
          setAmrInfo(amrRes.data);
    
          showNotice(1, t("submitPage.success"));
          setShowModal(true);
        } catch (infoError) {
          if (sampleId) {
            try {
              await apiDeleteSampleById(sampleId);
            } catch (deleteErr) {
              console.error("Lỗi khi xoá sample:", deleteErr);
            }
          }
          showNotice(0, t("submitPage.fail"));
        }
      }
    } catch (error) {
      showNotice(0, t("submitPage.fail"));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setSelectedExperiment("");
    setSampleName("");
    setFile(null);
    setFastaFilePath("");
    setHeader("");
    setLength(0);
    setErrors({
      selectedExperiment: "",
      sampleName: "",
      file: "",
    });
    setShowModal(false);
  };

  return (
    <Container>
      <Wrapper>
        <Title>{t("submitPage.title")}</Title>
        <DropdownWrapper>
          <Dropdown value={selectedExperiment} onChange={(e) => setSelectedExperiment(e.target.value)}>
            <option value="">{t("submitPage.selectExperiment")}</option>
            {experiments.map((experiment) => (
              <option key={experiment._id} value={experiment._id}>
                {experiment.name}
              </option>
            ))}
          </Dropdown>
          {errors.selectedExperiment && <ErrorText>{errors.selectedExperiment}</ErrorText>}
          <InputWrapper>
            <Input
              type="text"
              value={sampleName}
              onChange={(e) => setSampleName(e.target.value)}
              placeholder={t("submitPage.sampleNamePlaceholder")}
            />
            {errors.sampleName && <ErrorText>{errors.sampleName}</ErrorText>}
            <ChooseFileButtonWrapper>
              <ChooseFileButton>
                <UploadIcon />
                {t("submitPage.chooseFile")}
                <input type="file" accept=".fa,.fas,.fna,.fasta" onChange={handleFileChange} ref={fileInputRef} />
              </ChooseFileButton>
              {file && <FileName>{file.name}</FileName>}
            </ChooseFileButtonWrapper>
            {errors.file && <ErrorText>{errors.file}</ErrorText>}
          </InputWrapper>
        </DropdownWrapper>
        <ButtonWrapper>
          <ButtonSubmit type="button" onClick={handleSubmit}>
            {t("submitPage.submitBtn")}
          </ButtonSubmit>
          <ButtonReset type="button" onClick={handleReset}>
            {t("submitPage.resetBtn")}
          </ButtonReset>
        </ButtonWrapper>
        {isLoading && <LoadingSpinner />}
        {showModal && (
          <ResultComponent
            fastaInfo={fastaInfo}
            virulenceInfo={virulenceInfo}
            amrInfo={amrInfo}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default Submit;

