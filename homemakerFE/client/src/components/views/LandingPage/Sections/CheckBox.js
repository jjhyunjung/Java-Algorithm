import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CheckBox = (props) => {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    //누른것의 Index를 구하고
    //indexOf에서 값이 -1이 뜬다면 그 값이없다 라는 뜻

    const currentIndex = Checked.indexOf(value);

    //전체 checked된 state에서 현재 누른 checkbox가 이미 있다면

    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
    //빼주고

    // State를 넣어준다.
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span> {value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
    {/*  defaultActiveKey 를 1로하면 디폴트로 펼쳐져있고 0으로하면 접혀있음*/}
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="키워드" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CheckBox;
