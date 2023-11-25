import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Container from '../components/Container';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

// todo - 참여신청하기 버튼 눌렀을 때 api 요청(api 개발해야 함)

const SelectButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`;

const StyledSelect = styled.select`
  padding: 8px;
  border: none;
  color: #333;
  font-size: 11px;
  outline: none;
`;

const StyledOption = styled.option`
  background-color: #f8f8f8;
  color: #333;
  font-size: 11px;
`;

const PuppleButton = styled(Link)`
  display: block;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  width: 8%;
  height: 30px;
  background-color: #7f56d9;
  color: #fff;
  margin-right: 15px;
  text-decoration: none;
  line-height: 30px;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;

  th {
    border-top: 1px solid #6e7c87;
    border-bottom: 1px solid #6e7c87;
    color: #6e7c87;
    height: 2.5vh;
    vertical-align: bottom;
    padding-bottom: 10px;
    font-size: 0.7rem;
    text-align: left;
  }

  td {
    border-bottom: 1px solid #6e7c87;
    color: #6e7c87;
    height: 3vh;
    vertical-align: middle;
    font-size: 0.7rem;
    overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
    white-space: nowrap; /* 한 줄에 표시 */
    text-overflow: ellipsis; /* 넘치는 내용에 대해 ...으로 표시 */
    text-align: left;
  }
`;

const TableHeaderCell = styled.th`
  width: ${(props) => props.width || 'auto'};
  padding-left: ${(props) => props.padding || '0'};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TableBodyCell = styled.td`
  width: ${(props) => props.width || 'auto'};
  padding-left: ${(props) => props.padding || '0'};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RecruitButton = styled.button`
  background-color: #ebf7ff;
  color: #0452c8;
  border: none;
  border-radius: 5px;
  height: 20px;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  line-height: 20px;
`;

const NotRecruit = styled.button`
  background-color: #ffefeb;
  color: #cc0905;
  border: none;
  border-radius: 5px;
  height: 20px;
  font-size: 11px;
  font-weight: bold;
  line-height: 20px;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

const Board = () => {
  const [studies, setStudies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [isAsc, setIsAsc] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchStudies() {
      try {
        const response = await axios.get(
          `http://localhost:8080/studies?page=${page}&sortBy=${sortBy}&isAsc=${isAsc}`
        );
        const totalItems = response.data.totalElements || 0;
        const totalPages = Math.ceil(totalItems / 15);
        setTotalPages(totalPages);
        console.log(response.data.content);
        setStudies(response.data.content); // 스터디 목록을 받아온 데이터로 업데이트
      } catch (error) {
        console.error(error);
      }
    }

    fetchStudies();
  }, [page, sortBy, isAsc]);

  const handleChange = (e) => {
    setSortBy(e.target.value); // 선택한 옵션 업데이트
  };

  return (
    <Container>
      <SelectButtonWrapper>
        <StyledSelect value={sortBy} onChange={handleChange}>
          <StyledOption value='createdAt'>생성일자</StyledOption>
          <StyledOption value='category'>카테고리</StyledOption>
          <StyledOption value='recruit'>모집상태</StyledOption>
        </StyledSelect>
        <PuppleButton to='/create-study'>스터디 생성</PuppleButton>
      </SelectButtonWrapper>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell width='8%' padding='5px'>
              카테고리
            </TableHeaderCell>
            <TableHeaderCell width='25%'>스터디장</TableHeaderCell>
            <TableHeaderCell width='25%'>스터디명</TableHeaderCell>
            <TableHeaderCell width='10%'>모집인원</TableHeaderCell>
            <TableHeaderCell width='15%'>생성일자</TableHeaderCell>
            <TableHeaderCell width='15%' padding='6.5px'>
              모집상태
            </TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => (
            <tr key={study.id}>
              <TableBodyCell width='8%' padding='5px'>
                {study.category}
              </TableBodyCell>
              <TableBodyCell width='25%'>{study.leader}</TableBodyCell>
              <TableBodyCell width='25%'>
                <TitleLink to={`/studies/${study.id}`}>{study.title}</TitleLink>
              </TableBodyCell>
              <TableBodyCell width='10%'>
                {study.headcount + '/' + study.recruitNum}
              </TableBodyCell>
              <TableBodyCell width='15%'>
                {new Date(study.createdAt).toLocaleDateString()}
              </TableBodyCell>
              <TableBodyCell width='15%'>
                {study.recruit ? (
                  <RecruitButton>참여 신청하기</RecruitButton>
                ) : (
                  <NotRecruit>모집 마감</NotRecruit>
                )}
              </TableBodyCell>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(pageNumber) => setPage(pageNumber)}
      />
    </Container>
  );
};

export default Board;
