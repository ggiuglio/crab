import React, { useState } from 'react';
import styled from 'styled-components';
import { history } from '../App';

const Container = styled.div`
  width: calc(100vw - 10px);
  overflow: hidden;
  height: 40px;
  box-sizing: border-box;
  margin: 10px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
  border-top: 1px solid #cccccc;
  padding-top: 10px;
  @media (min-width: 600px) {
    border: none;
    height: 38px;
    width: fit-content;
    margin: 20px 10px;
  }
`;
const InnerContainer = styled.div`
  width: 100vw;
  height: 40px;
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 600px) {
    max-width: 100%;
  }
`;
const MenuContainer = styled.div`
  width: max-content;
  @media (min-width: 600px) {
    margin-left: auto;
  }
`;
const Element = styled.div`
  display: inline-block;
  font-size: 16px;
  letter-spacing: 2px;
  padding: 0 15px;
  cursor: pointer;
  :first-child {
    padding-left: 30px;
  }
  :last-child {
    padding-right: 30px;
  }
`;
const InnerElement = styled.div`
  height: 0px;
  width: ${({ selected }) => selected ? '100%' : '0px'}
  border-bottom: 1px solid black;
  transition: width 0.5s;
`;

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(1);

  const selectPage = (link) => {
    setSelectedItem(link);

    switch (link) {
      case 1:
        history.push('/crab/about')
        break;
      case 2:
        history.push('/crab/budget')
        break;
      default:
        break;
    }
  }

  return <Container>
    <InnerContainer>
      <MenuContainer >
        <Element onClick={() => selectPage(1)}>
          About
          <InnerElement selected={selectedItem === 1}>
          </InnerElement>
        </Element>
        <Element onClick={() => selectPage(2)}>
          Budget
          <InnerElement selected={selectedItem === 2} >
          </InnerElement>
        </Element>
        <Element onClick={() => selectPage(3)}>
          Something
          <InnerElement selected={selectedItem === 3}>
          </InnerElement>
        </Element>
        <Element onClick={() => selectPage(4)}>
          Some
          <InnerElement selected={selectedItem === 4}>
          </InnerElement>
        </Element>
        <Element onClick={() => selectPage(5)}>
          Thing
          <InnerElement selected={selectedItem === 5}>
          </InnerElement>
        </Element>
      </MenuContainer>
    </InnerContainer>
  </Container>

}

export default Menu;