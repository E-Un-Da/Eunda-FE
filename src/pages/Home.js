import React, { useRef } from 'react';
import { Card, Carousel, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title, Text } = Typography;

const Home = () => {
    const carouselRef = useRef(null);
    
  const stories = [
    {
      id: 1,
      title: 'Story 1',
      category: 'Travel',
      leader: 'John Doe',
      intro: 'A journey to the mountains',
      headcount: 3,
      recruitNum: 2,
      recruit: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Story 2',
      category: 'Adventure',
      leader: 'Jane Smith',
      intro: 'Exploring unknown territories',
      headcount: 5,
      recruitNum: 3,
      recruit: false,
      createdAt: new Date(),
    },
    {
        id: 3,
        title: 'Story 2',
        category: 'Adventure',
        leader: 'Jane Smith',
        intro: 'Exploring unknown territories',
        headcount: 5,
        recruitNum: 3,
        recruit: false,
        createdAt: new Date(),
    },
    {
        id: 4,
        title: 'Story 2',
        category: 'Adventure',
        leader: 'Jane Smith',
        intro: 'Exploring unknown territories',
        headcount: 5,
        recruitNum: 3,
        recruit: false,
        createdAt: new Date(),
    },
    {
        id: 5,
        title: 'Story 2',
        category: 'Adventure',
        leader: 'Jane Smith',
        intro: 'Exploring unknown territories',
        headcount: 5,
        recruitNum: 3,
        recruit: false,
        createdAt: new Date(),
      },
  ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };
    
    const handlerOnClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        
        // history('/product/detail/'+id);
    };
    
    const handlePrev = () => {
        carouselRef.current.prev();
    };

    const handleNext = () => {
        carouselRef.current.next();
    };

    return (
        <div style={{ marginTop: '50px', padding: '15px' }}>
            <Carousel  ref={carouselRef} {...settings}>
                {stories.map(story => (
                    <div key={story.id} >
                        <a href="#" onClick={ (e) => handlerOnClick(e, story.id) }>
                            <Card 
                                hoverable
                                style={{ width: '100%', margin: '0 auto' }}
                            >
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Title level={5}>{story.title}</Title>
                                    <Title level={5} style={{ marginBottom: 0 }}>{ story.leader }</Title>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text type="secondary">{story.category}</Text> 
                                    <Text type="secondary">{story.headcount}</Text> 
                                    <Text type="secondary">{story.recruitNum}</Text> 
                                    <Text type="secondary">{story.recruit ? 'Yes' : 'No'}</Text> 
                                </div>
                                <div>
                                    <Text type="secondary">{story.intro}</Text> 
                                </div>
                            </Card>
                        </a>           
                    </div>
                ))}
            </Carousel>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <LeftOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handlePrev} />
                <RightOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handleNext} />
            </div>
        </div>
    );
};

export default Home;
