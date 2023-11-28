import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../components/Input';
import Container from '../components/Container';
import useInput from '../hooks/useInput';
import Title from '../components/Title';
import FormContainer from '../components/FormContainer';

const ModalButton = styled.button`
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

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const CloseButton = styled.button`
  display: block;
  cursor: pointer;
  border: 1px solid #000;
  border-radius: 5px;
  text-align: center;
  width: 20%;
  height: 30px;
  margin: 0px auto;
  margin-top: 10px;
  background-color: #fff;
  color: #000;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useInput('');
  const [nickname, setNickname] = useInput('');
  const [password, setPassword] = useInput('');
  const [password2, setPassword2] = useInput('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
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
      setIsSignUpSuccess(true);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const SignUpSuccessModal = ({ closeModal }) => {
    return (
      <Backdrop onClick={closeModal}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            <h2>회원가입 성공</h2>
            <p>회원가입이 성공적으로 완료되었습니다!</p>
            <p>이메일을 인증한 후 로그인 해주세요!</p>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalContent>
        </ModalWrapper>
      </Backdrop>
    );
  };

  const closeModal = () => {
    setIsSignUpSuccess(false);
    navigate('/signin');
  };

  return (
    <Container>
      <Title>회원가입</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isSignUpSuccess && <SignUpSuccessModal closeModal={closeModal} />}
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

        <ModalButton type='submit'>회원가입</ModalButton>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
