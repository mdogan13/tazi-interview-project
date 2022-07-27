import React, { useState } from "react";
import classes from "./App.module.css";
import ConfigList from "./components/ConfigList/ConfigList";
import { Button } from "antd";
import ConfigForm from "./components/ConfigForm/ConfigForm";

//TODO: add popup for messages
//TODO: use constants for hardcoded strings
const App = () => {
  const [operation, setOperation] = useState("");
  const [isConfigFormVisible, setIsConfigFormVisible] = useState(false);
  const [userFormData, setUserFormData] = useState({} as any);
  const [userConfigData, setUserConfigData] = useState({
    schema1: [] as any,
    schema2: [] as any,
  } as any);

  const saveForm = (values: any) => {
    let hasConfigLimitReached = isConfigLimitReached(values.schema);

    if (operation === 'create') {
      !hasConfigLimitReached && createNewConfig(values)
    } else {
      editConfig(values)
    }

    setIsConfigFormVisible(false);
  };

  const isConfigLimitReached = (schema: string): boolean => {
    return userConfigData[schema].length === 5;
  }

  const createNewConfig = (values: any) => {
    setUserConfigData((previousData: any) => {
      let newState = { ...previousData };
      let schema = values.schema;
      values['configId'] = (values.configName || '') + '_' + Math.random() * (new Date()).getTime();
      newState[schema] = [...userConfigData[schema as keyof typeof userConfigData], values];

      return newState;
    });
  };

  const editConfig = (values: any) => {
    setOperation('edit');

    setUserConfigData((previousData: any) => {
      let newState = { ...previousData };
      let schema = values.schema;
      let newConfigArray = userConfigData[schema];
      let configIndex = newConfigArray.findIndex((configData: any) => configData.configId === values.configId);

      newConfigArray[configIndex] = values;
      newState[schema] = newConfigArray;

      return newState;
    });
  };

  const deleteConfig = (configId: string, schema: any) => {
    setUserConfigData((previousData: any) => {
      let newState = { ...previousData };
      let newConfigArray = userConfigData[schema].filter((config: any) => config.configId !== configId);

      newState[schema] = newConfigArray;

      return newState;
    });

    if (configId === userFormData.configId) {
      setIsConfigFormVisible(false)
    }
  };

  const getUserConfigById = (id: string) => {
    let userConfig = {};

    Object.keys(userConfigData).forEach(schema => {
      let searchResult = userConfigData[schema].filter((data: any) => data.configId === id);
      if (searchResult.length > 0) {
        userConfig = searchResult[0];
      }
    });

    return userConfig;
  };

  const openConfigForm = (operation: string, configId?: string) => {
    setIsConfigFormVisible(true);
    setOperation(operation);

    if (typeof configId !== 'undefined') {
      setUserFormData(getUserConfigById(configId));
    }
  };

  return (
    <div className="App">
      <ConfigList configData={userConfigData} onConfigSelected={openConfigForm} onConfigDeleted={deleteConfig} />
      {isConfigFormVisible && (
        <ConfigForm operation={operation} onFormSaved={saveForm} userFormData={userFormData}></ConfigForm>
      )}
      <Button
        className={classes.createButton}
        onClick={() => openConfigForm('create')}
        type="primary"
      >
        Create New Configuration
      </Button>
    </div>
  );
};

export default App;