import React, { useRef, useState } from "react";
import styled from "styled-components";
import test from "../utils/test.txt";
const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 90%;
`;
const ButtonResetWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
const TextAreaWrapper = styled.div`
  width: ${(props) => (props.$selectedFile ? "0px" : "100%")};
  height: ${(props) => (props.$selectedFile ? "0" : "250px")};
  border-radius: 5px;
  border: 1px solid #4a4b4c;
  display: ${(props) => (props.$selectedFile ? "none" : "visible")};
  margin-bottom: ${(props) => (props.$selectedFile ? "0" : "10px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextArea = styled.textarea`
  display: ${(props) => (props.$selectedFile ? "none" : "visible")};
  width: calc(100% - 20px);
  height: calc(100% - 22px);
  max-height: 250px;
  padding: 9px;
  border-radius: 5px;
  border: 3px solid transparent;
  &:focus {
    outline: none;
    border: 3px solid #86b7fe;
    box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -webkit-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -moz-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
  }
`;
const Input = styled.input`
  display: ${(props) => (props.$text ? "none" : "visible")};
  height: 30px;
  &::-webkit-file-upload-button {
    height: 30px;
    border: none;
    cursor: pointer;
  }
  border: 1px solid #6c757d;
  border-radius: 5px 4px 4px 5px;
  cursor: pointer;
`;
const Example = styled.div`
  cursor: pointer;
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 10px;
  max-width: 300px;
  display: ${(props) => (props.$example ? "none" : "visible")};
`;
const ButtonReset = styled.button`
  display: ${(props) => (props.$visible ? "visible" : "none")};
  max-width: 70px;
  padding: 5px 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin-top: 10px;
  width: 100%;
  height: 1px;
  background-color: #c7c8c9;
`;
const Form = styled.form`
  width: 100%;
`;
const More = styled.div`
  display: ${(props) => (props.$visible || props.text ? "visible" : "none")};
`;
const WrapperItem = styled.div`
  margin-top: 20px;
`;
const Title = styled.h2`
  margin-bottom: 5px;
`;
const Organism = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px 1fr;
  grid-template-rows: 1fr 10px 1fr;
`;
const OrganismInput = styled.input`
  width: 95%;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  &:focus {
    outline: none;
    border: 1px solid #86b7fe;
    box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -webkit-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -moz-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  padding: 8px;
`;
const Annotation = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
`;
const AnnotationCol = styled.div`
  width: 18%;
  flex-grow: 1;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 250px;
`;
const AnnotationItem = styled.div`
  display: flex;
  gap: 10px;
`;
const AnnotationInput = styled.input`
  width: 70%;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  &:focus {
    outline: none;
    border: 1px solid #86b7fe;
    box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -webkit-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -moz-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
  }
  &::-webkit-file-upload-button {
    margin-top: -15px;
    border: none;
    margin-left: -10px;
    border-radius: 5px;
    height: 40px;
    margin-bottom: -10px;
  }
  padding: 8px;
`;
const Selection = styled.select`
  width: ${(props) => props.$w};
  border-radius: 5px;
  border: 1px solid #dee2e6;
  &:focus {
    outline: none;
    border: 1px solid #86b7fe;
    box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -webkit-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -moz-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
  }
  padding: 8px;
  min-width: 60px;
`;
const Replicons = styled.table`
  width: 100%;
`;
const RepliconsRow = styled.tr``;
const RepliconsCol = styled.td`
  /* display: flex; */
`;
const RepliconsInput = styled.input`
  border-radius: 5px;
  border: 1px solid #dee2e6;
  &:focus {
    outline: none;
    border: 1px solid #86b7fe;
    box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -webkit-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
    -moz-box-shadow: -1px -1px 5px 5px rgba(194, 219, 254, 1);
  }
  width: 90%;
  padding: 8px;
`;
const Submit = () => {
  const [file, setFile] = useState(null);
  const [example, setExample] = useState(false);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const fileInputRef = useRef(null);
  const textArea = useRef("");
  const addExample = async () => {
    if (example != true) {
      const response = await fetch(test);
      const data = await response.text();
      setText(data);
      setVisible(true);
      setExample(true);
    }
  };
  const reset = () => {
    setFile(null);
    setVisible(!visible);
    setExample(!example);
    setText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
    if (textArea.current.value != "") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const addFile = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
      setVisible(!visible);
    }
    console.log("visible : " + visible);
    console.log("text : " + text);
    console.log("file : " + file);
  };
  const showOption = () => {
    setInput(!input);
  };
  return (
    <Container>
      <Wrapper>
        <Form>
          <TextAreaWrapper $selectedFile={file}>
            <TextArea
              placeholder="Paste your fasta sequences here, click on 'Use example sequence' or select a fasta file from your computer below..."
              value={text}
              onChange={handleTextChange}
              ref={textArea}
              $selectedFile={file}
            ></TextArea>
          </TextAreaWrapper>
          <Example onClick={() => addExample()} $example={example}>
            Click here to use an example sequence
          </Example>
          <Input
            $text={text}
            type="file"
            id="file-upload"
            accept="*.fa,*.fas,.fna,.fasta,*.fa.gz,.fna.gz,.fas.gz,.fasta.gz"
            onChange={addFile}
            ref={fileInputRef}
          />
          <ButtonResetWrapper>
            <ButtonReset
              $visible={visible}
              type="button"
              onClick={() => reset()}
            >
              Reset
            </ButtonReset>
          </ButtonResetWrapper>
          <More $visible={visible}>
            <Hr />
            <WrapperItem>
              <Title>Organism</Title>
              <Organism>
                <OrganismInput placeholder="Genus and species (optional)"></OrganismInput>
                <div></div>
                <OrganismInput placeholder="Strain (optional)"></OrganismInput>
                <div></div> <div></div>
                <div></div>
                <OrganismInput placeholder="Locus prefix (optional)"></OrganismInput>
                <div></div>
                <OrganismInput placeholder="Locus tag prefix (optional)"></OrganismInput>
              </Organism>
            </WrapperItem>
            <WrapperItem>
              <Title>Annotation</Title>
              <Annotation>
                <AnnotationCol>
                  <AnnotationItem>
                    <input type="checkbox" name="" id="complete-genome" />
                    <label htmlFor="complete-genome">Complete genome</label>
                  </AnnotationItem>
                  <AnnotationItem>
                    <input type="checkbox" name="" id="keep-headers" />
                    <label htmlFor="keep-headers">Keep contig headers</label>
                  </AnnotationItem>
                  <AnnotationItem>
                    <input type="checkbox" name="" id="compliant" />
                    <label htmlFor="compliant">INSDC compliant output</label>
                  </AnnotationItem>
                </AnnotationCol>
                <AnnotationCol>
                  <label htmlFor="min-contig-length">Min contig length</label>
                  <AnnotationInput
                    type="number"
                    defaultValue="1"
                    min="1"
                    id="min-contig-length"
                  />
                </AnnotationCol>
                <AnnotationCol>
                  <label htmlFor="translation-table"> Translation table</label>
                  <Selection $w="70%" name="" id="translation-table">
                    <option value="4">
                      4: The Mold, Protozoan, and Coelenterate Mitochondrial
                      Code and the Mycoplasma/Spiroplasma Code
                    </option>
                    <option value="11" selected>
                      11: The Bacterial, Archaeal and Plant Plastid Code
                    </option>
                  </Selection>
                </AnnotationCol>
                <AnnotationCol>
                  <label htmlFor="mono-diderm">Mono-/Diderm</label>
                  <Selection $w="70%" name="" id="mono-diderm">
                    <option value="UNKNOWN">?</option>
                    <option value="MONODERM">Monoderm</option>
                    <option value="DIDERM">Diderm</option>
                  </Selection>
                </AnnotationCol>
                <AnnotationCol>
                  <label htmlFor="prodigal-training-file">
                    Prodigal training file
                  </label>
                  <AnnotationInput
                    class="form-control"
                    type="file"
                    id="prodigal-training-file"
                    accept=".tf"
                  ></AnnotationInput>
                </AnnotationCol>
              </Annotation>
            </WrapperItem>
            <WrapperItem>
              <Title>Replicons</Title>
              <Replicons>
                <tr>
                  <th>Original sequence id</th>
                  <th>Length</th>
                  <th>New sequence id </th>
                  <th>Type</th>
                  <th>Topology</th>
                  <th>Name</th>
                </tr>
                <tr>
                  <td>
                    <RepliconsInput type="text" disabled value="NC_002127.1" />
                  </td>
                  <td>
                    <RepliconsInput type="number" disabled value="3306" />
                  </td>
                  <td style={{ display: "flex" }}>
                    <RepliconsInput type="text" placeholder="Optional..." />
                  </td>
                  <td>
                    <Selection $w="100%">
                      <option value="UNKNOWN">?</option>
                      <option value="chromosome">Chromosome</option>
                      <option value="plasmid">Plasmid</option>
                      <option value="contig" selected>
                        Contig
                      </option>
                    </Selection>
                  </td>
                  <td>
                    <Selection $w="100%">
                      <option value="UNKNOWN">?</option>
                      <option value="c">circular</option>
                      <option value="l" selected>
                        linear
                      </option>
                    </Selection>
                  </td>
                  <td>
                    <RepliconsInput type="text" placeholder="Optional..." />
                  </td>
                </tr>
              </Replicons>
            </WrapperItem>
            <ButtonResetWrapper>
              <ButtonReset type="submit" $visible={true}>
                Submit
              </ButtonReset>
            </ButtonResetWrapper>
            <Hr />
          </More>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Submit;
