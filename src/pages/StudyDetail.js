import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Container from '../components/Container';
import Title from '../components/Title';
import { useParams } from 'react-router-dom';

const StudyDetail = ({ match }) => {
  const { id } = useParams();
  const [study, setStudy] = useState(null);

  useEffect(() => {
    async function fetchStudyDetails() {
      try {
        const response = await axios.get(`http://localhost:8080/studies/${id}`);
        setStudy(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStudyDetails();
  }, [id]);

  return (
    <Container>
      <Title>{study && study.title}</Title>
    </Container>
  );
};

export default StudyDetail;
