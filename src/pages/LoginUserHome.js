import React, { useRef, userState, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;

const LoginUserHome = () => {
  const carouselRef = useRef(null);
  const history = useNavigate();
  const [myStudies, setMyStudies] = useState();

  useEffect(() => {
    const myStudies = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/studies/my-studies'
        );
        console.log('myStudies response : ', response);
        setMyStudies(response.data);
        console.log(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    myStudies();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const handlerOnClick = (e, id) => {
    e.preventDefault();
    console.log(id);

    history('/studies/' + id);
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1300px',
        margin: '0 auto', // 수평 가운데 정렬
        display: 'flex',
        flexDirection: 'column',
        marginTop: '50px',
      }}
    >
      <h1 style={{ marginBottom: '15px' }}>My Studies</h1>
      <Card>
        <Carousel ref={carouselRef} {...settings}>
          {myStudies &&
            myStudies.map((study) => (
              <a
                href='#'
                style={{ textDecoration: 'none', color: 'black' }}
                onClick={(e) => handlerOnClick(e, study.id)}
              >
                <div key={study.id} style={{ color: 'black' }}>
                  <Meta title={study.title} description={study.intro} />
                  <p style={{ marginTop: '8px', marginBottom: '8px' }}>
                    카테고리: {study.category}
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    스터디장: {study.leader}
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    현재 인원: {study.headcount}
                  </p>
                  <p style={{ marginBottom: '8px' }}>
                    모집 인원: {study.recruitNum}
                  </p>
                </div>
              </a>
            ))}
        </Carousel>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <LeftOutlined
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={handlePrev}
          />
          <RightOutlined
            style={{ fontSize: '24px', cursor: 'pointer' }}
            onClick={handleNext}
          />
        </div>
      </Card>
    </div>
  );
};

export default LoginUserHome;
