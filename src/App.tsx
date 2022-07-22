import React, { useState } from "react";
import classes from "./App.module.css";
import ConfigList from "./components/ConfigList/ConfigList";
import { Button } from "antd";
import ConfigForm from "./components/ConfigForm/ConfigForm";

const App = () => {
  const [operation, setOperation] = useState("");
  const [isConfigFormVisible, setIsConfigFormVisible] = useState(false);
  const [userConfigData, setUserConfigData] = useState({
    schema1: [],
    schema2: [],
  });

  const createNewConfig = (values: any) => {
    setUserConfigData((previousData: any) => {
      let newState = { ...previousData };
      let schema = values.config.schema;
      newState[schema] = [...userConfigData[schema as keyof typeof userConfigData], values.config];
      
      return newState;
    });
  };

  const editConfig = () => {
    console.log('edit')
    //TODO: grab config id here
    setOperation('edit');
  }

  const deleteConfig = () => {};

  const hi = (values: any) => {
    console.log("FROM APP", values);
  };

  const openConfigForm = () => {
    setIsConfigFormVisible(true);
    setOperation('create');
  };

  const saveForm = (values: any) => {
    if(operation === 'create' ){
      createNewConfig(values)
    }else{
      editConfig()
    }
     
  }
  return (
    <div className="App">
      <ConfigList configData={userConfigData} onConfigSelected={editConfig}/>
      {isConfigFormVisible && (
        <ConfigForm operation={operation} onFormSaved={saveForm}></ConfigForm>
      )}
      <Button
        className={classes.createButton}
        onClick={openConfigForm}
        type="primary"
      >
        Create New Configuration
      </Button>
    </div>
  );
};

export default App;
