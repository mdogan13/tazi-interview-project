import React, { useState } from "react";
import classes from "./App.module.css";
import ConfigList from "./components/ConfigList/ConfigList";
import { Button } from "antd";
import ConfigForm from "./components/ConfigForm/ConfigForm";
import { uuid } from 'uuidv4';

const App = () => {
  const [operation, setOperation] = useState("");
  const [isConfigFormVisible, setIsConfigFormVisible] = useState(false);
  const [userFormData, setUserFormData] = useState({});
  const [userConfigData, setUserConfigData] = useState({
    schema1: [] as any,
    schema2: [] as any,
  } as any);

  const saveForm = (values: any) => {
    if (operation === 'create') {
      createNewConfig(values)
    } else {
      editConfig(values)
    }

  }

  const createNewConfig = (values: any) => {
    setUserConfigData((previousData: any) => {
      let newState = { ...previousData };
      let schema = values.schema;
      values['configId'] = values.configName + Math.random();
      newState[schema] = [...userConfigData[schema as keyof typeof userConfigData], values];

      return newState;
    });
  };

  const editConfig = (values:any) => {
    console.log('edit')
    //TODO: grab config id here, set schema
    setOperation('edit');


  setUserConfigData((previousData: any) => {
    let newState = { ...previousData };
    let schema = values.schema;
    let configIndex = userConfigData[schema].findIndex((configData:any)=>configData.id!==values.configId);
    let newConfigArray = userConfigData[schema];

    newConfigArray[configIndex]=values;
 
    newState[schema] = newConfigArray;

    return newState;
  });
  
  }

  const getUserConfigById = (id: string) => {
    let userConfig = {};

    Object.keys(userConfigData).forEach(schema => {
      let searchResult = userConfigData[schema].filter((data: any) => data.configId === id);
      if (searchResult.length > 0) {
        userConfig = searchResult[0];
      }
    });

    return userConfig;
  }

  const deleteConfig = () => { };

  const openConfigForm = (operation: string, configId?: string) => {
    setIsConfigFormVisible(true);
    setOperation(operation);

    if (typeof configId !== 'undefined') {
      setUserFormData(getUserConfigById(configId));
    }
  };


  return (
    <div className="App">
      <ConfigList configData={userConfigData} onConfigSelected={openConfigForm} />
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
