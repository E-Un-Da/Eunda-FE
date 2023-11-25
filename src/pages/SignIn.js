import axios from 'axios';
import PuppleButton from '../components/PuppleButton';
import WhiteButton from '../components/WhiteButton';
import InputField from '../components/Input';
import Container from '../components/Container';
import useInput from '../hooks/useInput';
import Title from '../components/Title';
import FormContainer from '../components/FormContainer';

const SignUp = () => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/signin', {
        email: email,
        password: password,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
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
        <WhiteButton type='submit' value='회원가입' />
      </FormContainer>
    </Container>
  );
};

export default SignUp;
