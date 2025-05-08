import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import SVgs from "../components/ImageZoom";

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  width: 90%;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1e3a8a;
  margin: 30px 0 10px;
  border-left: 5px solid #3498db;
  padding-left: 15px;
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
`;

const Image = styled.img`
  width: 50%;
  height: auto;
  display: block;
  margin: 20px auto;
`;

// Component hỗ trợ xử lý xuống dòng
const MultilineText = ({ text }) => (
  <Text>
    {text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </Text>
);

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Wrapper>
        <Title>{t("homePage.title1")}</Title>
        <MultilineText text={t("homePage.content1")} />
        <Image src="/Acinetobacter-baumannii.jpg" alt="Bacteria" />
        <MultilineText text={t("homePage.content2")} />
        <Title>{t("homePage.title2")}</Title>
        <Image src="/nguyco.jpg" alt="Risk" />
        <MultilineText text={t("homePage.content3")} />
        <Title>{t("homePage.title3")}</Title>
        <MultilineText text={t("homePage.content4")} />
        <Title>{t("homePage.title4")}</Title>
        <Image src="/dauhieunhiemtrung.jpg" alt="Symptoms" />
        <MultilineText text={t("homePage.content5")} />
        <Title>{t("homePage.title5")}</Title>
        <MultilineText text={t("homePage.content6")} />
        <SVgs file_dist="amr.json" />
        <SVgs file_dist="vplot.json" />
      </Wrapper>
    </Container>
  );
};

export default Home;
