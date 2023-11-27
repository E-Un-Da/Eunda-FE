import React, { useState } from 'react';
import axios from 'axios';
import PuppleButton from '../components/PuppleButton';
import InputField from '../components/Input';
import Container from '../components/Container';
import useInput from '../hooks/useInput';
import Title from '../components/Title';
import FormContainer from '../components/FormContainer';


const SignUp = () => {
  const [email, setEmail] = useInput('');
  const [nickname, setNickname] = useInput('');
  const [password, setPassword] = useInput('');
  const [password2, setPassword2] = useInput('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/signup', {
        email: email,
        nickname: nickname,
        password: password,
        password2: password2,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };
  
  return (
    <Container>
      <Title>회원가입</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          label='이메일'
          type='email'
          placeholder='이메일'
          value={email}
          onChange={setEmail}
        />
        <InputField
          label='닉네임'
          type='text'
          placeholder='닉네임'
          value={nickname}
          onChange={setNickname}
        />
        <InputField
          label='비밀번호'
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={setPassword}
        />
        <InputField
          label='비밀번호확인'
          type='password'
          placeholder='비밀번호 확인'
          value={password2}
          onChange={setPassword2}
        />

        <PuppleButton type='submit' value='Save' />
      </FormContainer>
    </Container>
  );
};

export default SignUp;
