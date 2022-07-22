import React, { useState } from "react";
import { useEffect } from "react";
import classes from "./ConfigForm.module.css";
import { Select, Form, Input, Button } from "antd";
import { CONFIG_SCHEMA1, CONFIG_SCHEMA2 } from "../../schemas";
const { Option } = Select;

const ConfigForm = (props: any) => {
  const [schema, setSchema] = useState("schema1");
  const [formLayout, setFormLayout] = useState<any | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setConfigSchema(schema);
    form.resetFields();
  }, [props.operation]);

  const setConfigSchema = (schema: string) => {
    console.log("setting,", schema);
    form.resetFields();
    setSchema(schema);
    if (schema === "schema1") {
      setFormLayout(parseDefaultConfig(CONFIG_SCHEMA1));
    } else {
      setFormLayout(parseDefaultConfig(CONFIG_SCHEMA2));
    }
    console.log(formLayout);
  };

  const parseDefaultConfig = function (obj: any) {
    var keys = Object.keys(obj);

    return keys.map((key) => {
      if (isObject(obj[key])) {
        if (key.includes("parameter")) {
          return (
            <li key={Math.random()}>
              <Form.Item name={["config", key]} label={key}>
                <Input />
              </Form.Item>
            </li>
          );
        }
        return (
          <ul key={Math.random()}>
            <li key={Math.random()}>{key}</li>
            {parseDefaultConfig(obj[key])}
          </ul>
        );
      }
      return "";
    });
  };

  const isObject = (x: any) => {
    return Object.prototype.toString.call(x) === "[object Object]";
  };

  const saveConfig = (values: any) => {
    console.log(values);
    values.config.schema = schema;
    props.onFormSaved(values);
  };

  return (
    <div className={classes.formWrapper}>
      <div className={classes.form}>
        <h3>
          {props.operation === "create" ? "Create New" : "Edit"} Configuation
        </h3>
        {props.operation === "create" && (
          <Select
            className={classes.typeSelect}
            defaultValue="schema1"
            style={{ width: 120 }}
            onChange={setConfigSchema}
          >
            <Option value="schema1">Schema 1</Option>
            <Option value="schema2">Schema 2</Option>
          </Select>
        )}
        <Form
          form={form}
          labelWrap
          onFinish={saveConfig}
          className={classes.configForm}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
        >
          <Form.Item
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17 }}
            name={["config", "configName"]}
            label="Configuration Name"
          >
            <Input />
          </Form.Item>
          {formLayout}
          <Button
            htmlType="submit"
            className={classes.saveButton}
            type="primary"
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ConfigForm;
