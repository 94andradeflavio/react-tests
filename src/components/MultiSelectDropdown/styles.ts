import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.2rem;
  position: relative;
`;

export const InputSearch = styled.input`
  padding: 0.5rem;
  width: 100%;
  outline: none;
  border: none;
`;

export const Dropdown = styled.div`
  display: flex;
  padding: 1rem 0;
  flex-direction: column;
  border-top: 2px solid black;
  max-height: 300px;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  width: 100%;
  top: 100%;
`;

export const DropdownItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.5rem;
  user-select: none;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    cursor: pointer;
    background-color: #e3e3e3;
  }
`;

export const SelectedOptions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.8rem;
`;

export const Option = styled.span`
  /* border: 1px solid black; */
  padding: 0.2rem 0.5rem;
  background-color: #e3e3e3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  > span {
    cursor: pointer;
  }
`;
