import styled from 'styled-components';

const Label = styled.label`
  font-size: 0.7rem;
  margin: 0 auto;
  margin-bottom: 5px;
  text-align: left;
  width: 80%;
  display: block;
`;

const Textarea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  width: 80%;
  height: 100px;
`;

const InputWrapper = styled.div`
  text-align: center;
  width: 80%;
  margin-bottom: 15px;
`;

const TextareaField = ({ placeholder, value, onChange, label }) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <Textarea
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default TextareaField;
