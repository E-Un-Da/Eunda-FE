import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import styled from 'styled-components';
import Container from '../components/Container';
import Title from '../components/Title';
import { useParams } from 'react-router-dom';
import useInput from '../hooks/useInput';
import TextareaField from '../components/Textarea';
import ModalInput from '../components/ModalInput';

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
  min-height: 13%;
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

const ModalButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: #7f56d9;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 1.2rem;
  font-weight: 700;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30%;
  height: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  width: 68%;
  height: 40px;
  margin: 5px auto;
  background-color: #7f56d9;
  transition: background-color 0.3s ease;
  color: #fff;

  &:hover {
    background-color: #2980b9;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const BottomButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  width: 25%;
  height: 40px;
  margin: 5px 20px;
  background-color: #7f56d9;
  transition: background-color 0.3s ease;
  color: #fff;

  &:hover {
    background-color: #2980b9;
  }
`;

const Modal = ({ closeModal }) => {
  const { id } = useParams();
  const [title, setTitle] = useInput('');
  const [contents, setContents] = useInput('');

  const handleCreateCard = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/studies/${id}/cards`,
        {
          title,
          contents,
        }
      );

      console.log('카드 생성 성공:', response.data);

      closeModal();

      window.location.reload();
    } catch (error) {
      console.error('카드 생성 실패:', error);
    }
  };
  return (
    <Backdrop onClick={closeModal}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalTitle>카드 생성</ModalTitle>
        <ModalInput
          label='카드 제목'
          type='text'
          placeholder='카드 제목'
          value={title}
          onChange={setTitle}
        />
        <TextareaField
          label='스터디 내용'
          value={contents}
          onChange={setContents}
        />
        <Button onClick={handleCreateCard}>카드 생성</Button>
      </ModalWrapper>
    </Backdrop>
  );
};


const InviteModal = ({ closeModal }) => {
    const { id } = useParams();
    const [email, setEmail] = useInput('');
  
    const handleInviteMember = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/studies/${id}/invites`,
          {
            email
          }
        );
  
        console.log('멤버 초대 성공:', response.data);
  
        closeModal();
  
        window.location.reload();
      } catch (error) {
        console.error('멤버 초대 실패:', error);
      }
    };
    return (
      <Backdrop onClick={closeModal}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <ModalTitle>멤버 초대</ModalTitle>
          <ModalInput
            label='초대할 멤버의 이메일'
            type='email'
            placeholder='초대할 멤버의 이메일'
            value={email}
            onChange={setEmail}
          />
          <Button onClick={handleInviteMember}>멤버 초대</Button>
        </ModalWrapper>
      </Backdrop>
    );
  };



axios.defaults.withCredentials = true;

const StudyDetail = () => {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [cardDetails, setCardDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

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

  const DroppableContainer = styled.div`
    width: 100%;
    height: 100%;
  `;


  // 컬럼별로 카드 렌더링
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
            <DroppableContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
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
            </DroppableContainer>
          )}
        </Droppable>
      </CardColumn>
    );
  };



  // 드래그 앤 드롭

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

    const movedCardId = cardDetails.find(
      (card) => card.id.toString() === draggableId
    ).id;
    const destinationStatus = destination.droppableId;

    const updatedCardDetails = [...cardDetails];
    const movedCardIndex = updatedCardDetails.findIndex(
      (card) => card.id === movedCardId
    );
    const [movedCard] = updatedCardDetails.splice(movedCardIndex, 1);
    movedCard.status = destinationStatus;
    updatedCardDetails.splice(destination.index, 0, movedCard);

    setCardDetails(updatedCardDetails);

    try {
      await axios.put(
        `http://localhost:8080/cards/${movedCardId}/status`,
        { status: destinationStatus },
        {
          withCredentials: true,
        }
      );

      console.log('성공');
      const response = await axios.get(`http://localhost:8080/studies/${id}`);
      setStudy(response.data.study);
      setCardDetails(response.data.cardDetails);
    } catch (error) {
      // 오류 처리
      console.error(error);
      // 실패 시 롤백
      setCardDetails(cardDetails);
    }
  };



  // 모집 상태 변경
  const handleStatusChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/studies/${id}/status`
      );
      console.log('상태 변경 요청 성공:', response.data);
    } catch (error) {
      console.error('상태 변경 요청 실패:', error);
      
    }
  };

  return (
    <Container>
      <Title>{study && study.title}</Title>
      <ModalButton onClick={openModal}>카드 생성</ModalButton>
      {isModalOpen && <Modal closeModal={closeModal} />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <CardContainer>
          {renderCardsByStatus('TODO')}
          {renderCardsByStatus('IN_PROGRESS')}
          {renderCardsByStatus('DONE')}
        </CardContainer>
      </DragDropContext>
      <ButtonWrapper>
        <BottomButton onClick={openInviteModal}>스터디원 초대</BottomButton>
        {isInviteModalOpen && <InviteModal closeModal={closeInviteModal} />}
        <BottomButton onClick={handleStatusChange}>스터디원 모집</BottomButton>
      </ButtonWrapper>
    </Container>
  );
};

export default StudyDetail;
