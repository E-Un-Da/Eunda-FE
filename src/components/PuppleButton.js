import styled from 'styled-components';

const PuppleButton = styled.input.attrs((props) => ({
  type: props.type,
  value: props.value,
}))`
  display: block;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  width: 11%;
  height: 40px;
  margin: 5px auto;
  background-color: #7f56d9;
  color: #fff;
`;

export default PuppleButton;
