import React from "react";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

// const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Austrailia" },
  { key: 7, value: "Antartica" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };
  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const submitHandler = (event) => {
    // preventdefault를 해야 확인 누른다고 리프레쉬가 되지않음
    event.preventDefault();

    //모든 요소가 채워져있어야 넘어갈수있다
    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert("모든값을 채워주세요!");
    }

    //서버에 채운 값들을 request로 보낸다.

    const body = {
      //로그인된 자의 ID => auth.js에서 props로 user데이터를 받아옴
      writer: props.user.userData._id,
      //나머지는 위의 useState에서
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents: Continent,
    };

    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("업로드에 성공 했습니다.");
        // 완료후 페이지 이동
        props.history.push("/");
      } else {
        alert("업로드에 실패 했습니다.");
      }
    });
  };


  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2> 업로드 </h2>
      </div>
      <Form onSubmit={ submitHandler}>
        {/* DropZone */}

        {/* 파일데이터를 uploadFile컴포넌트에서 부모컴포넌트로 데려오기 */}

        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label> 이름 </label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label> 설명 </label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {" "}
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
