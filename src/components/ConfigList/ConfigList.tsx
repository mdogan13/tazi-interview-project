import React from "react";
import { useState, useEffect } from "react";
import { List } from "antd";
import classes from "./ConfigList.module.css";

const ConfigList = (props: any) => {
  const [configData, setConfigData] = useState({});
  useEffect(() => {
    setConfigData(props.configData);
  }, [props.configData]);

  //const prepareList = () => {
  //  return (
  //    <div className={classes.listWrapper}>
  //      <div>
  //        Schema1
  //        {props.configData.schema1.map((config: any) => (
  //          <li>{config}</li>
  //        ))}
  //      </div>
  //      <div>
  //        Schema2
  //        {props.configData.schema2.map((config: any) => (
  //          <li>{config}</li>
  //        ))}
  //      </div>
  //    </div>
  //  );
  //};
  //setCountryData(
  //  response.data
  //    .map((countryData) => <CountryCard countryData={countryData} />)
  //    .splice(0, 8)
  //);

  const hi = () => {
    console.log("hi");
  };

  //TODO: send config id on select
  const renderListItem = (item: any) => (
    <List.Item className={classes.configuration} onClick={props.onConfigSelected}>
      {item.configName}
    </List.Item>
  );

  return (
    <div className={classes.listWrapper}>
      <List
        size="large"
        header={<div>Schema 1</div>}
        dataSource={props.configData.schema1}
        renderItem={renderListItem}
      />
      <List
        size="large"
        header={<div>Schema 2</div>}
        dataSource={props.configData.schema2}
        renderItem={renderListItem}
      />
    </div>
  );
};

export default ConfigList;
