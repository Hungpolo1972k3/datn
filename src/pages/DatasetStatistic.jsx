import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1e3a8a;
`;

const SectionTitle = styled.h3`
  font-size: 36px;
  font-weight: bold;
  margin-top: 1rem;
  color: #1e40af;
`;

const ImageWrapper = styled.div`
  display: inline-block;
  margin: 10px;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  border: 1px solid #ccc;
  cursor: zoom-in;
`;

const Caption = styled.p`
  font-size: 18px; 
  margin-top: 5px;
  color: #1e40af;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: #1e40af;
  }
`;

const DatasetStatistic = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  
  const micImages = [
    { src: "/mic1.jpg", caption: "ceftazidime" },
    { src: "/mic2.jpg", caption: "imipenem" },
    { src: "/mic3.jpg", caption: "ciprofloxacin" },
    { src: "/mic4.jpg", caption: "cefepime" },
    { src: "/mic5.jpg", caption: "ampicillin/sulbactam" },
    { src: "/mic6.jpg", caption: "meropenem" },
    { src: "/mic7.jpg", caption: "piperacillin/tazobactam" }
  ];

  const amrImages = [
    { src: "/amrplot1.jpg", caption: "ceftazidime" },
    { src: "/amrplot2.jpg", caption: "imipenem" },
    { src: "/amrplot3.jpg", caption: "ciprofloxacin" },
    { src: "/amrplot4.jpg", caption: "cefepime" },
    { src: "/amrplot5.jpg", caption: "ampicillin/sulbactam" },
    { src: "/amrplot6.jpg", caption: "meropenem" },
    { src: "/amrplot7.jpg", caption: "piperacillin/tazobactam" }
  ];

  const vFactorImages = [
    { src: "/vfactor1.jpg", caption: "ceftazidime" },
    { src: "/vfactor2.jpg", caption: "imipenem" },
    { src: "/vfactor3.jpg", caption: "ciprofloxacin" },
    { src: "/vfactor4.jpg", caption: "cefepime" },
    { src: "/vfactor5.jpg", caption: "ampicillin/sulbactam" },
    { src: "/vfactor6.jpg", caption: "meropenem" },
    { src: "/vfactor7.jpg", caption: "piperacillin/tazobactam" },
    { src: "/vfactor8.jpg", caption: "ceftazidime" },
    { src: "/vfactor9.jpg", caption: "imipenem" }
  ];

  const plotData = [
    { src: "/data1.jpg", caption: "ceftazidime" },
    { src: "/data2.jpg", caption: "ceftazidime" },
    { src: "/data3.jpg", caption: "imipenem" },
    { src: "/data4.jpg", caption: "imipenem" },
    { src: "/data5.jpg", caption: "ciprofloxacin" },
    { src: "/data6.jpg", caption: "ciprofloxacin" },
    { src: "/data7.jpg", caption: "cefepime" },
    { src: "/data8.jpg", caption: "cefepime" },
    { src: "/data9.jpg", caption: "ampicillin/sulbactam" },
    { src: "/data10.jpg", caption: "ampicillin/sulbactam" },
    { src: "/data11.jpg", caption: "meropenem" },
    { src: "/data12.jpg", caption: "meropenem" },
    { src: "/data13.jpg", caption: "piperacillin/tazobactam" },
    { src: "/data14.jpg", caption: "piperacillin/tazobactam" }
  ]

  const handleImageClick = (src) => {
    setCurrentImage(src);
    setIsOpen(true);
  };

  const handleCaptionClick = (caption) => {
    const url = `https://www.ncbi.nlm.nih.gov/search/all/?term=${caption}`;
    window.open(url, "_blank");
  };

  return (
    <Container>
      <Title>{t("datasetStatistic.title")}</Title>

      <SectionTitle>MIC</SectionTitle>
      <div>
        {micImages.map((image, index) => (
          <ImageWrapper key={`mic-${index}`}>
            <StyledImage 
              src={image.src} 
              alt={`MIC Image ${index + 1}`} 
              onDoubleClick={() => handleImageClick(image.src)} 
            />
            <Caption onClick={() => handleCaptionClick(image.caption)}>{image.caption}</Caption>
          </ImageWrapper>
        ))}
      </div>

      <SectionTitle>AMR Plot</SectionTitle>
      <div>
        {amrImages.map((image, index) => (
          <ImageWrapper key={`amr-${index}`}>
            <StyledImage 
              src={image.src} 
              alt={`AMR Plot ${index + 1}`} 
              onDoubleClick={() => handleImageClick(image.src)} 
            />
            <Caption onClick={() => handleCaptionClick(image.caption)}>{image.caption}</Caption>
          </ImageWrapper>
        ))}
      </div>

      <SectionTitle>VFactor Plot</SectionTitle>
      <div>
        {vFactorImages.map((image, index) => (
          <ImageWrapper key={`vfactor-${index}`}>
            <StyledImage 
              src={image.src} 
              alt={`VFactor Plot ${index + 1}`} 
              onDoubleClick={() => handleImageClick(image.src)} 
            />
            <Caption onClick={() => handleCaptionClick(image.caption)}>{image.caption}</Caption>
          </ImageWrapper>
        ))}
      </div>

      <SectionTitle>Data Plot</SectionTitle>
      <div>
        {plotData.map((image, index) => (
          <ImageWrapper key={`vfactor-${index}`}>
            <StyledImage 
              src={image.src} 
              alt={`Data Plot ${index + 1}`} 
              onDoubleClick={() => handleImageClick(image.src)} 
            />
            <Caption onClick={() => handleCaptionClick(image.caption)}>{image.caption}</Caption>
          </ImageWrapper>
        ))}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={currentImage}
          onCloseRequest={() => setIsOpen(false)}
          imageCaption="Statistic Image"
        />
      )}
    </Container>
  );
};

export default DatasetStatistic;
