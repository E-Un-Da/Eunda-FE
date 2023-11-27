import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import styled from 'styled-components';
import Container from '../components/Container';
import Title from '../components/Title';
import { useParams } from 'react-router-dom';

const CardContainer = styled.div`
  display: flex;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 10px;
  width: 400px;
  background-color: #f7f7f7;
  min-height: 500px;
`;

const CardColumnTitle = styled.h3`
  text-align: left;
  font-size: 13px;
  margin-left: 10px;
  padding: 15px 0;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin: 0 auto;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  min-height: 9%;
  position: relative;
`;

const CardTitle = styled.p`
  font-size: 13px;
  color: #252c32;
`;

const CardManager = styled.p`
  font-size: 11px;
  color: #6e7c87;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

axios.defaults.withCredentials = true;

const StudyDetail = () => {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [cardDetails, setCardDetails] = useState([]);

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((c) => c.trim().startsWith(`${cookieName}=`));

    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      const decodedValue = decodeURIComponent(cookieValue);

      return decodedValue;
    }

    return null;
  }

  useEffect(() => {
    const fetchStudyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/studies/${id}`);
        setStudy(response.data.study);
        setCardDetails(response.data.cardDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudyDetails();
  }, [id]);

  const renderCardsByStatus = (status) => {
    let columnTitle = '';

    switch (status) {
      case 'TODO':
        columnTitle = '해야할 공부';
        break;
      case 'IN_PROGRESS':
        columnTitle = '공부중';
        break;
      case 'DONE':
        columnTitle = '공부완료';
        break;
      default:
        columnTitle = '공부 목록';
        break;
    }

    const filteredCards = cardDetails.filter((card) => card.status === status);

    return (
      <CardColumn>
        <CardColumnTitle>{columnTitle}</CardColumnTitle>
        <Droppable droppableId={status}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredCards.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={card.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CardTitle>{card.title}</CardTitle>
                      <CardManager>{card.manager}</CardManager>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardColumn>
    );
  };

  //****************수정*****************/
  function getBearerToken() {
    const cookieName = 'Authorization';
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((c) => c.trim().startsWith(`${cookieName}=`));

    if (cookie) {
      const tokenString = cookie.split('=')[1].trim();

      return tokenString;
    }

    return null;
  }
  /**************************************/

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const movedCardId = cardDetails[source.index].id;
    const destinationStatus = destination.droppableId;

    try {
      await axios.put(
        `http://localhost:8080/cards/${movedCardId}/status`,
        { status: destinationStatus },
        {
          withCredentials: true,
        }
      );
      console.log('성공');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>{study && study.title}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <CardContainer>
          {renderCardsByStatus('TODO')} {/* TODO 상태의 카드 */}
          {renderCardsByStatus('IN_PROGRESS')} {/* IN_OPRGRESS 상태의 카드 */}
          {renderCardsByStatus('DONE')} {/* DONE 상태의 카드 */}
        </CardContainer>
      </DragDropContext>
    </Container>
  );
};

export default StudyDetail;
