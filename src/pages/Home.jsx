import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  width: 90%;
  flex-direction: column;
`;

// Tiêu đề chính
const Title = styled.h1`
  font-size: 2rem;
  color: #1e3a8a;
  margin: 30px 0 10px;
  border-left: 5px solid #3498db;
  padding-left: 15px;
`;

// Nội dung đoạn văn
const Text = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
`;

const Image = styled.img`
  width: 50%;
  height: auto;
  display: block;
  margin: 20px auto;
`;

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Acinetobacter baumannii</Title>
        <Text>
          Acinetobacter baumannii là một loại vi khuẩn Gram âm, hiếu khí, thuộc họ Neisseriaceae.
          Loại vi khuẩn này có thể sống trên cơ thể của một người khỏe mạnh, nó có thể trú ngụ ở họng, da hay dịch tiết cơ thể mà không gây bệnh.
        </Text>

        <Image src="/Acinetobacter-baumannii.jpg" alt="Bacteria" />

        <Text>
          Tuy nhiên khi gặp điều kiện thuận lợi như sức đề kháng của cơ thể người bị suy giảm miễn dịch thì Acinetobacter baumannii sẽ trở thành một tác nhân gây bệnh.
          Vi khuẩn này có khả năng tồn tại lâu ngoài môi trường và kháng nhiều loại thuốc diệt khuẩn, làm cho việc điều trị trở nên khó khăn hơn rất nhiều.
        </Text>

        <Title>Ai có nguy cơ bị nhiễm?</Title>
        <Image src="/nguyco.jpg" alt="Bacteria" />
        <Text>
          Bất kỳ ai cũng có thể bị nhiễm, đặc biệt là người:
          <br />– Có hệ miễn dịch yếu
          <br />– Vệ sinh kém
          <br />– Nằm viện dài ngày hoặc dùng máy thở
          <br />– Có vết thương hở
          <br />– Tiếp xúc gần người nhiễm bệnh
          <br />– Sử dụng thuốc kháng sinh lâu dài
        </Text>

        <Title>Acinetobacter baumannii gây ra bệnh gì?</Title>
        <Text>
          Vi khuẩn này có thể gây nhiều bệnh nghiêm trọng như:
          <br />– Viêm phổi
          <br />– Nhiễm trùng máu
          <br />– Viêm màng não
          <br />– Nhiễm trùng tiết niệu
          <br />– Nhiễm trùng da và vết thương
        </Text>

        <Title>Dấu hiệu và triệu chứng</Title>
        <Image src="/dauhieunhiemtrung.jpg" alt="Bacteria" />
        <Text>
          Các triệu chứng phổ biến gồm:
          <br />– Sốt
          <br />– Đau hoặc sưng đỏ tại vết thương
          <br />– Mụn nước, da sần sùi
          <br />– Ho, đau ngực, khó thở
          <br />– Tiểu buốt
          <br />– Đau đầu, cứng cổ
        </Text>

        <Title>Phòng ngừa lây nhiễm</Title>
        <Text>
          – Rửa tay thường xuyên bằng xà phòng hoặc dung dịch sát khuẩn.
          <br />– Vết thương cần được vệ sinh và băng kín.
          <br />– Dùng kháng sinh theo chỉ định bác sĩ, đúng liều – đủ ngày.
          <br />
          Việc giữ gìn vệ sinh cá nhân và môi trường xung quanh là yếu tố then chốt để kiểm soát vi khuẩn này.
        </Text>
      </Wrapper>
    </Container>
  );
};

export default Home;
