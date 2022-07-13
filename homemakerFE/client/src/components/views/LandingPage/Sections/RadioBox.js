import React from "react";
import { Collapse, Radio } from "antd";
import { useState } from "react";

const { Panel } = Collapse;

function RadioBox(props) {

  //가격에서 value가 0부터 시작하니까
  const [Value, setValue] = useState(0)


  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <Radio key={value._id} value={value._id}>
        {" "}
        {value.name}
      </Radio>
    ));

    //하나만 클릭되게 만들어준다!
    const handleChange = (event) => {

      setValue(event.target.value)
      props.handleFilters(event.target.value)

    }

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={ Value }>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
