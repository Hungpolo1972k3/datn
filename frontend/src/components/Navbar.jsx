import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: #f0f0f0;
  height: 56px;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
  width: 90%;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: none;
  color: ${({ isActive }) => (isActive ? "black" : "#59595e")};
  font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
  cursor: pointer;

  &:hover {
    color: ${({ isActive }) => (isActive ? "black" : "#29292b")};
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <NavLink to="/">
          {({ isActive }) => <Button isActive={isActive}>Home</Button>}
        </NavLink>
        <NavLink to="/submit">
          {({ isActive }) => <Button isActive={isActive}>Submit</Button>}
        </NavLink>
        <NavLink to="/jobs">
          {({ isActive }) => <Button isActive={isActive}>Jobs</Button>}
        </NavLink>
        <NavLink to="/view">
          {({ isActive }) => <Button isActive={isActive}>Viewer</Button>}
        </NavLink>
        <NavLink to="/login">
          {({ isActive }) => <Button isActive={isActive}>Login</Button>}
        </NavLink>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
