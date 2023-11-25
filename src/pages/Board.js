import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Container from '../components/Container';

const SelectButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
`;

const StyledSelect = styled.select`
  padding: 8px;
  border: none;
  color: #333;
  font-size: 16px;
  outline: none;
`;

const StyledOption = styled.option`
  background-color: #f8f8f8;
  color: #333;
  font-size: 16px;
`;

const PuppleButton = styled.input.attrs((props) => ({
  type: props.type,
  value: props.value,
}))`
  display: block;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  width: 8%;
  height: 30px;
  margin: 5px auto;
  background-color: #7f56d9;
  color: #fff;
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

const Board = () => {
  const [studies, setStudies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [isAsc, setIsAsc] = useState(true);

  useEffect(() => {
    async function fetchStudies() {
      try {
        const response = await axios.get(
          `http://localhost:8080/studies?page=${page}&sortBy=${sortBy}&isAsc=${isAsc}`
        );
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
          <PuppleButton type='submit' value='스터디 생성' />
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
              <TableHeaderCell width='15%'>모집상태</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {studies.map((study) => (
              <tr key={study.id}>
                <TableBodyCell width='8%' padding='5px'>
                  {study.category}
                </TableBodyCell>
                <TableBodyCell width='25%'>{study.leader}</TableBodyCell>
                <TableBodyCell width='25%'>{study.title}</TableBodyCell>
                <TableBodyCell width='10%'>
                  {study.headcount + '/' + study.recruitNum}
                </TableBodyCell>
                <TableBodyCell width='15%'>
                  {new Date(study.createdAt).toLocaleDateString()}
                </TableBodyCell>
                <TableBodyCell width='15%'>
                  {study.recruit ? '모집' : '안해'}
                </TableBodyCell>
              </tr>
            ))}
          </tbody>
        </Table>
        <button onClick={() => setPage((prevPage) => prevPage - 1)}>
          Previous Page
        </button>
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next Page
        </button>
      </Container>
  );
};

export default Board;
