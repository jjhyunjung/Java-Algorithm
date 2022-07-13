import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductInfo from "../../DetailProductPage/Sections/ProductInfo";
import ProductImage from "../../DetailProductPage/Sections/ProductImage";
import { Row, Col } from "antd";

//왜 product를 못받아오는거지?!!!!!!!!!????????????????????????????????????????????????????????!?!??

function DetailProductPage(props) {
  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id = ${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          //콘솔로 무슨결과가옴?
          console.log("response.data", response.data);
          setProduct(response.data.product[0]);
        } else {
          alert("상세정보로딩에 실패했습니다.");
        }
      });
  }, []);
  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>오류 해결 필요</h1>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* ProductImage */}

          <ProductImage detail={Product} />
        </Col>

        <Col lg={12} sm={24}>
          {/* ProductInfo */}

          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
