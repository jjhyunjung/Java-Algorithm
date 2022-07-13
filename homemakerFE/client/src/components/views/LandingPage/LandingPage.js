import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "../LandingPage/Sections/CheckBox";
import { continents, price } from "./Sections/Datas";
import RadioBox from "../LandingPage/Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("")


  useEffect(() => {
    //usestate를 사용해서 한페이지에 8개만 보이게 + 더보기를 통해 더가져오기 만드는
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("불러오기에 실패했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;
    // 더보기버튼 누를시 몇개더 나올지
    //  0  +   8
    //  8  +   8

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card 
        //product _id로 주소를 만듬
        cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  //여기서 value 는 밑에 filter의 값
  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    showFilteredResults(newFilters);

    //filters 값에는 datas의 _id 값이 들어가있다
    console.log("filters", filters);

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  //searchFeature에서 받아오기
  const updateSearchTerm = (newSearchTerm) =>{
    setSearchTerm(newSearchTerm)

    let body = {
      skip : 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    }

    setSkip(0)
    setSearchTerm(newSearchTerm)
    getProducts(body)

  }


  return (

    <div style={{ width: "75%", margin: "3rem auto" }}>

      {/* Search */}
      <div style={{display: "flex", justifyContent : "center", padding: "30px"}}>
          <SearchFeature
              refreshFunction = { updateSearchTerm }
          />
      </div>
      
      <div style={{ textAlign: "center" }}>
        <h2>
          {" "}
          HomeMaker <Icon type="rocket" />
        </h2>
      </div>
      <br />
      <br />

      {/* Filter */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* CheckBox */}
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* RadioBox */}
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>



      {/* Card */}
      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
