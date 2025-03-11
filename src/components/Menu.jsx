import React from "react";
import styled from "styled-components";
import LogoPath from "../img/logo.png";
import Icon from "../img/mail.png";
const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  /* overflow: scroll; */
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 25px;
`;
const Img = styled.img`
  height: 25px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 7.5px 0;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;
const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 20px;
`;
const Menu = ({ darkMode, setDarkMode }) => {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src={LogoPath} />
          Youtube
        </Logo>
        <Item>
          <Img src={Icon} />
          Home
        </Item>
        <Item>
          <Img src={Icon} />
          Explore
        </Item>
        <Item>
          <Img src={Icon} />
          Subscriptions
        </Item>
        <Hr />
        <Item>
          <Img src={Icon} />
          Library
        </Item>
        <Item>
          <Img src={Icon} />
          History
        </Item>
        <Hr />
        <Login>
          Sign in to like videos, comment and subscribe
          <Button>SIGN IN</Button>
        </Login>{" "}
        <Hr />
        {/* <Item>
          <Img src={Icon} />
          Music
        </Item>
        <Item>
          <Img src={Icon} />
          Sport
        </Item>
        <Item>
          <Img src={Icon} />
          Gaming
        </Item>
        <Item>
          <Img src={Icon} />
          Movie
        </Item>
        <Item>
          <Img src={Icon} />
          New
        </Item>
        <Item>
          <Img src={Icon} />
          Live
        </Item>
        <Hr /> */}
        <Title>Best in Youtube</Title>
        <Item>
          <Img src={Icon} />
          Setting
        </Item>
        <Item>
          <Img src={Icon} />
          Report
        </Item>
        <Item>
          <Img src={Icon} />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <Img src={Icon} />
          Light Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
