import React from "react";
import { List } from "antd";
import classes from "./ConfigList.module.css";
import { DeleteOutlined } from '@ant-design/icons';

const ConfigList = (props: any) => {
  const selectConfig = (id: string) => {
    props.onConfigSelected('edit', id);
  };

  const deleteConfig = (id: string, schema: any, event: any) => {
    event.stopPropagation();
    props.onConfigDeleted(id, schema);
  };

  const renderListItem = (item: any) => (
    <List.Item className={classes.configuration} onClick={() => selectConfig(item.configId)}>
      {item.configName}
      <DeleteOutlined onClick={(event) => deleteConfig(item.configId, item.schema, event)} className={classes.deleteIcon} />
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
