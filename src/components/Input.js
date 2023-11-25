import styled from 'styled-components';

const Label = styled.label`
  font-size: 0.7rem;
  margin: 0 auto;
  margin-bottom: 5px;
  text-align: left;
  width: 50%;
  display: block;
`;

const InputWrapper = styled.div`
  text-align: center;
  width: 50%;
  margin-bottom: 15px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  width: 50%;
`;

const InputField = ({ type, placeholder, value, onChange, label }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default InputField;
