import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PuppleButton from '../components/PuppleButton';
import WhiteButton from '../components/WhiteButton';
import InputField from '../components/Input';
import Container from '../components/Container';
import useInput from '../hooks/useInput';
import Title from '../components/Title';
import FormContainer from '../components/FormContainer';

const CreateStudy = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [rule, setRule] = useInput('');
  const [intro, setIntro] = useInput('');
  const [recruitNum, setRecruitNum] = useInput('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/studies',
        {
          title,
          category,
          rule,
          intro,
          recruitNum,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      navigate(`/studies/${response.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Title>스터디 생성</Title>
      <FormContainer onSubmit={handleSubmit}>
        <InputField
          label='스터디명'
          type='text'
          placeholder='스터디명'
          value={title}
          onChange={setTitle}
        />
        <InputField
          label='카테고리'
          type='text'
          placeholder='카테고리'
          value={category}
          onChange={setCategory}
        />
        <InputField
          label='스터디규칙'
          type='text'
          placeholder='스터디규칙'
          value={rule}
          onChange={setRule}
        />
        <InputField
          label='스터디소개'
          type='text'
          placeholder='스터디소개'
          value={intro}
          onChange={setIntro}
        />
        <InputField
          label='모집인원'
          type='number'
          placeholder='모집인원'
          value={recruitNum}
          onChange={setRecruitNum}
        />

        <PuppleButton type='submit' value='생성' />
        <WhiteButton type='submit' value='취소' />
      </FormContainer>
    </Container>
  );
};

export default CreateStudy;
