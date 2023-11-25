import styled from 'styled-components';

const PuppleButton = styled.input.attrs((props) => ({
  type: props.type,
  value: props.value,
}))`
  display: block;
  cursor: pointer;
  border: 1px solid #000;
  border-radius: 5px;
  text-align: center;
  width: 11%;
  height: 40px;
  margin: 0px auto;
  background-color: #fff;
  color: #000;
`;

export default PuppleButton;
