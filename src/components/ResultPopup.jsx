import React, { useState } from "react";
import styled from "styled-components";
import FastaTable from "./Fasta";
import VirulenceTable from "./Virulence";
import AmrTable from "./Amr";
import VirulenceListResult from "./VirulenceTableResult";
import { useTranslation } from "react-i18next";

const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopUpForm = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #000;
  }
`;

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

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  color: ${(props) => (props.selected ? "#007bff" : "#000")};
  border: 2px solid ${(props) => (props.selected ? "#007bff" : "#ccc")};
  border-radius: 5px;
  font-size: 25px;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  cursor: pointer;
  margin: 0 30px;
  &:last-child {
    margin-right: 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ClickArea = styled.div`
  position: absolute;
  cursor: pointer;
  background: ${(props) =>
    props.active ? "rgba(255, 33, 66, 0.15);" : "transparent"};
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 33, 66, 0.15);
  }
`;

const ResultPopup = ({ fastaInfo, virulenceInfo, amrInfo, showModal, closeModal }) => {
  const [selectedTab, setSelectedTab] = useState("Fasta");
  const [label, setLabel] = useState("");
  const { t } = useTranslation();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  if (!showModal) return null;

  return (
    <PopUpContainer>
      <PopUpForm>
        <CloseButton onClick={closeModal}>×</CloseButton>
        <Container>
          <Wrapper>
            <Title>{t("resultPopupComponent.analysisResult")}</Title>
            <ButtonGroup>
              <Button selected={selectedTab === "Fasta"} onClick={() => handleTabClick("Fasta")}>
                {t("resultPopupComponent.fasta")}
              </Button>
              <Button selected={selectedTab === "Virulence"} onClick={() => handleTabClick("Virulence")}>
                {t("resultPopupComponent.virulence")}
              </Button>
              <Button selected={selectedTab === "AMR"} onClick={() => handleTabClick("AMR")}>
                {t("resultPopupComponent.amr")}
              </Button>
            </ButtonGroup>

            {selectedTab === "Fasta" && <FastaTable sample={fastaInfo} />}
            {selectedTab === "Virulence" && <VirulenceTable data={virulenceInfo} />}
            {selectedTab === "AMR" && <AmrTable data={amrInfo} />}

            <ImageWrapper>
              <Image src="/Bacteria-Cell.jpg" alt="Bacteria" />
              <ClickArea style={{ top: "17%", left: "40%", width: "30%", height: "10%" }} onClick={() => setLabel(t("resultPopupComponent.nucleoid"))} />
              <ClickArea style={{ top: "15%", left: "0%", width: "20%", height: "10%" }} onClick={() => setLabel(t("resultPopupComponent.ribosomes"))} />
              <ClickArea style={{ top: "10%", left: "27%", width: "20%", height: "8%" }} onClick={() => setLabel(t("resultPopupComponent.cytoplasm"))} />
              <ClickArea style={{ top: "40%", left: "82%", width: "20%", height: "12%" }} onClick={() => setLabel(t("resultPopupComponent.plasmid"))} />
              <ClickArea style={{ top: "23%", left: "80%", width: "15%", height: "10%" }} onClick={() => setLabel(t("resultPopupComponent.pili"))} />
              <ClickArea style={{ top: "62%", left: "70%", width: "25%", height: "15%" }} onClick={() => setLabel(t("resultPopupComponent.inclusionBodies"))} />
              <ClickArea style={{ top: "80%", left: "57%", width: "25%", height: "12%" }} onClick={() => setLabel(t("resultPopupComponent.flagellum"))} />
              <ClickArea style={{ top: "79%", left: "29%", width: "25%", height: "12%" }} onClick={() => setLabel(t("resultPopupComponent.cytoplasmicMembrane"))} />
              <ClickArea style={{ top: "76%", left: "8%", width: "20%", height: "10%" }} onClick={() => setLabel(t("resultPopupComponent.cellWall"))} />
              <ClickArea style={{ top: "66%", left: "3%", width: "20%", height: "10%" }} onClick={() => setLabel(t("resultPopupComponent.capsule"))} />
            </ImageWrapper>

            {label && <VirulenceListResult label={label} data={virulenceInfo} />}
          </Wrapper>
        </Container>
      </PopUpForm>
    </PopUpContainer>
  );
};

export default ResultPopup;