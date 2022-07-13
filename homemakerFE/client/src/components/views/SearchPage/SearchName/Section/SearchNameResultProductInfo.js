import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from 'react-redux'

function SearchResultProductInfo(props) {

    

    const clickHandler = (props) => {

        //필요한정보를 카트에 넣음
        //user관련 state는 redux를 활용

    }


  return (
    <div>
      <Descriptions title="상품정보">
        <Descriptions.Item label="Price">
          {/*{props.detail.price}*/}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">
          {/*{props.detail.sold}*/}
        </Descriptions.Item>
        <Descriptions.Item label="view">
          {/*{props.detail.views}*/}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {/*{props.detail.description}*/}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick>
          스크랩
        </Button>
      </div>
    </div>
  );
}

export default SearchResultProductInfo;
