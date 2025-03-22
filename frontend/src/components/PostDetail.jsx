import styled from "styled-components";
import post1_1 from "../img/posts/post1_1.jpg";
import post1_2 from "../img/posts/post1_2.jpg";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 90%;
`;
const Header = styled.div``;
const Title = styled.h1`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Desc = styled.div``;
const Hr = styled.hr`
  margin-top: 5px;
  margin-bottom: 5px;
  height: 1px;
  background-color: #6b6868;
  color: #6b6868;
`;
const Main = styled.ul`
  list-style: none;
`;
const Section = styled.li``;
const TitleSection = styled.h1``;
const Paragraph = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const TextBold = styled.span`
  font-weight: bold;
`;
const TextBlue = styled.span`
  font-weight: bold;
  color: #0076c0;
`;
const ImgContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Img = styled.img`
  width: 60%;
  object-fit: cover;
`;
const DesImg = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-style: italic;
`;
const More = styled.div`
  color: #024975;
`;
const PostDetail = () => {
  return (
    <Container>
      <Wrapper>
        <Main>
          <Header>
            <Title>Nhiễm vi khuẩn acinetobacter baumannii</Title>
            <Desc>
              Vi khuẩn acinetobacter baumannii được biết đến là một loại vi
              khuẩn có khả năng đề kháng với kháng sinh rất mạnh, là một trong
              những nguyên nhân gây nhiễm khuẩn bệnh viện đáng báo động trên
              toàn cầu.
            </Desc>
            <Hr />
          </Header>
          <Section>
            <TitleSection>1. Vi khuẩn acinetobacter baumannii</TitleSection>
            <Paragraph>
              <TextBold> Vi khuẩn Acinetobacter baumannii</TextBold> là loại vi
              khuẩn gram âm, chúng có thể sống trên cơ thể của một số người khỏe
              mạnh, chúng có thể sống ở họng, da hay dịch tiết cơ thể mà không
              gây bệnh, nhưng khi gặp điều kiện thuận lợi như sức đề kháng của
              cơ thể người bị <TextBlue>suy giảm miễn dịch</TextBlue> thì chúng
              thành một tác nhân gây bệnh.
            </Paragraph>
            <Paragraph>
              <TextBold>Vi khuẩn A.baumannii</TextBold> lại có khả năng tồn tại
              rất lâu ở môi trường bên ngoài, ngoài ra chúng có khả năng chống
              lại với một số các thuốc dùng để diệt khuẩn, nên việc sử dụng nước
              tẩy trong bệnh viện ít hiệu quả với loại vi khuẩn này, chính vì
              thế mà nó trở thành một tác nhân gây nhiễm trùng trong bệnh viện.
            </Paragraph>
            <Paragraph>
              Đặc biệt loại vi khuẩn này có khả năng kháng rất nhiều loại kháng
              sinh, do chúng mang gen kháng kháng sinh. Điều này gây khó khăn
              trong việc điều trị nhiễm{" "}
              <TextBold>vi khuẩn acinetobacter baumannii</TextBold> và tăng tỷ
              lệ tử vong do <TextBlue>nhiễm khuẩn bệnh viện</TextBlue>.
            </Paragraph>
            <ImgContainer>
              <Img src={post1_1} />
              <DesImg>
                Vi khuẩn A.baumannii lại có khả năng tồn tại rất lâu ở môi
                trường bên ngoài
              </DesImg>
            </ImgContainer>
          </Section>
          <Section>
            <TitleSection>
              2. Nhiễm vi khuẩn acinetobacter baumannii nguy hiểm thế nào?
            </TitleSection>
            <Paragraph>
              Nhiễm <TextBold>vi khuẩn acinetobacter baumannii</TextBold> là
              nguyên nhân hay gặp trong nhiễm khuẩn bệnh viện đe doạ tính mạng,
              xuất hiện tại nhiều quốc gia. Nhiễm khuẩn bệnh viện hay gặp nhất
              là <TextBlue>viêm phổi bệnh viện</TextBlue>, cũng là nguyên nhân
              tử vong hàng đầu, tỷ lệ tử vong do
              <TextBlue>viêm phổi bệnh viện</TextBlue> bệnh viện lên đến 20-70%.
              Ngoài ra <TextBlue>nhiễm khuẩn tiết niệu</TextBlue> cũng hay gặp.
            </Paragraph>
            <Paragraph>
              Nhiễm khuẩn bệnh viện được định nghĩa là xuất hiện tình trạng
              nhiễm khuẩn sau 48 giờ nhập viện mà trước đó không có dấu hiệu hay
              triệu chứng cho thấy một nhiễm khuẩn trước đó.
            </Paragraph>
            <Paragraph>
              Bởi vì theo một số nghiên cứu cho thấy khả năng kháng thuốc của vi
              khuẩn này rất cao, đa <TextBlue>kháng kháng sinh</TextBlue>, chúng
              kháng lại hầu hết các loại kháng sinh.
            </Paragraph>
            <Paragraph>
              Chúng có khả năng kháng kháng sinh nhóm beta-lactam lên đến trên
              80%, ngay cả carbapenem thì cũng bị kháng cao, nhóm cephalosporin
              cũng bị kháng trên 70%. Trong nhóm này chỉ có kháng sinh
              Cefoperazone kết hợp với Sulbactam là bị kháng thấp hơn khoảng
              60%. Nhóm aminosid bị kháng trên 50%, nhóm Quinolon kháng trên
              70%, duy chỉ có kháng sinh colistin là còn nhạy cảm với khả năng
              kháng thuốc khoảng 18%.
            </Paragraph>
            <Paragraph>
              Như vậy mắc nhóm
              <TextBold>vi khuẩn acinetobacter baumannii</TextBold> đa kháng
              thuốc thì còn rất ít lựa chọn thuốc điều trị, điều này làm tăng
              nguy cơ tử vong do nhiễm loại vi khuẩn này. Không chỉ vậy, ngay kể
              cả khi tiến hành điều trị loại thuốc vi khuẩn đó nhạy cảm thì vẫn
              có thể xuất hiện kháng thuốc trong suốt quá trình điều trị.
            </Paragraph>
            <ImgContainer>
              <Img src={post1_2} />
              <DesImg>
                Nhiễm vi khuẩn acinetobacter baumannii là nguyên nhân hay gặp
                trong nhiễm khuẩn bệnh viện
              </DesImg>
            </ImgContainer>
          </Section>
          <Section>
            <TitleSection>
              3. Làm gì để ngăn ngừa nhiễm vi khuẩn acinetobacter baumannii
            </TitleSection>
            <Paragraph>
              Ngăn ngừa nguồn <TextBold>vi khuẩn baumannii</TextBold> phát triển
              và lây lan bằng cách đảm bảo vệ sinh khoa, phòng sạch sẽ, đặc biệt
              những khoa có nguy cơ cao cho vi sinh vật phát triển và gây bệnh
              như phòng mổ, phòng hậu phẫu, khoa điều trị tích cực cần, tẩy uế
              thường xuyên. Cần có khu vực cách ly người bệnh mắc{" "}
              <TextBlue>bệnh truyền nhiễm</TextBlue>, xử lý chất thải y tế đúng
              quy trình hạn chế tối đa thải nguồn vi sinh vật gây bệnh ra môi
              trường, dụng cụ y tế cần đảm bảo vô trùng tuyệt đối.
            </Paragraph>
            <Paragraph>
              Không sử dụng kháng sinh bừa bãi khi không có chỉ định, chỉ dùng
              để diệt vi khuẩn chứ không dùng kháng sinh trong trường hợp nhiễm
              virus trừ khi có bội nhiễm. Đây là một biện pháp hiệu quả nhằm hạn
              chế việc đề kháng với kháng sinh của vi khuẩn.
            </Paragraph>
            <Paragraph>
              Khi sử dụng kháng sinh chọn kháng sinh từ phổ hẹp đến kháng sinh
              phổ rộng, không dùng kháng sinh có phổ rộng ngay từ đầu. Cần dùng
              kháng sinh đủ liều lượng, đủ ngày, nhạy cảm với vi khuẩn và hợp
              với điều kiện kinh tế người bệnh.
            </Paragraph>
            <Paragraph>
              <TextBold>Vi khuẩn a.baumannii</TextBold> có khả năng đa kháng
              kháng sinh, là nguyên nhân gây nhiễm trùng bệnh viện và làm tăng
              tỷ lệ tử vong. Chính vì vậy việc hiểu được tình hình đề kháng
              kháng sinh của <TextBold>vi khuẩn baumannii</TextBold> là rất quan
              trọng nhằm bảo đảm điều trị kháng sinh đúng, giảm khả năng đề
              kháng của vi khuẩn từ đó giảm thiểu tử vong bệnh nhân.
            </Paragraph>
          </Section>
        </Main>
        <Link to="/">
          <More>Xem thêm</More>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default PostDetail;
