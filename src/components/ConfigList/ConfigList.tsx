import React from "react";
import { useState, useEffect } from "react";
import { List } from "antd";
import classes from "./ConfigList.module.css";

const ConfigList = (props: any) => {
  //const [configData, setConfigData] = useState({});
  //useEffect(() => {
  //  setConfigData(props.configData);
  //}, [props.configData]);

  const selectConfig = (id: string) => {
    props.onConfigSelected('edit', id);
  }

  const renderListItem = (item: any) => (
    <List.Item className={classes.configuration} onClick={() => selectConfig(item.configId)}>
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
