import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PuppleButton from '../components/PuppleButton';

import InputField from '../components/Input';
import Container from '../components/Container';
import useInput from '../hooks/useInput';
import Title from '../components/Title';
import FormContainer from '../components/FormContainer';

const WhiteButton = styled(Link)`
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
  text-decoration: none;
  line-height: 40px;
  font-size: 13px;
`;

const SignIn = () => {
  const history = useNavigate();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/signin',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, // 추가해줘야 애플리케이션 쿠키에 저장된다.
        }
      );

      console.log(response.data);
      history('/');
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
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
          label='비밀번호'
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={setPassword}
        />

        <PuppleButton type='submit' value='로그인' />
        <WhiteButton to='/signup'>회원가입</WhiteButton>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
