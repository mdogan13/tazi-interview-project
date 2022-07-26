import React, { useState } from "react";
import { useEffect } from "react";
import classes from "./ConfigForm.module.css";
import { Select, Form, Input, Button, InputNumber, Switch, Radio } from "antd";
import { CONFIG_SCHEMA1, CONFIG_SCHEMA2 } from "../../schemas";

const { Option } = Select;

const ConfigForm = (props: any) => {
  const [schema, setSchema] = useState('schema1');
  const [formLayout, setFormLayout] = useState<any | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    let formSchema = props.operation === 'create' ? schema : props.userFormData.schema;

    setConfigSchema(formSchema);
    initializeForm(formSchema);
  }, [props.operation, props.userFormData]);

  const setConfigSchema = (schema: string) => {
    form.resetFields();

    setSchema(schema);
    if (schema === 'schema1') {
      setFormLayout(generateForm(CONFIG_SCHEMA1));
    } else {
      setFormLayout(generateForm(CONFIG_SCHEMA2));
    }
    initializeForm(schema);
  };

  const initializeForm = (schema: any) => {
    let formData = getInitialFormData(schema);
    Object.keys(formData).forEach((key: any) => {
      if ((key.includes('parameter') || key.includes('configName')) && formData[key]) {
        let setParam: any = {};
        if (props.operation === 'create') {
          setParam[key] = formData[key].default ?? null;
        } else {
          setParam[key] = formData[key];
        }

        form.setFieldsValue(setParam);
      };
    });
  };

  const getInitialFormData = (schema: any) => props.operation === 'create' ?
    (schema === "schema1" ? flattenObject(CONFIG_SCHEMA1) : flattenObject(CONFIG_SCHEMA2)) : props.userFormData;


  const flattenObject = (obj: any, roots = []): any => {
    return Object
      // find props of given object
      .keys(obj)
      // return an object by iterating props
      .reduce((memo, prop: any) => Object.assign(
        // create a new object
        {},
        // include previously returned object
        memo,
        Object.prototype.toString.call(obj[prop]) === '[object Object]' && !prop.includes('parameter')
          // keep working if value is an object
          ? flattenObject(obj[prop], roots.concat([prop as never]))
          // include current prop and value and prefix prop with the roots
          : { [prop]: obj[prop] }
      ), {})
  };

  const generateForm = (obj: any) => {
    let keys = Object.keys(obj);

    return keys.map((key) => {
      if (isObject(obj[key])) {
        if (key.includes("parameter")) {
          return (
            <li key={Math.random()}>
              <Form.Item name={key} label={key} rules={[
                {
                  required: obj[key]['required'],
                  message: 'Please fill this field.',
                },
              ]}>
                {generateFormItem(obj[key])}
              </Form.Item>
            </li>
          );
        }
        return (
          <ul key={Math.random()}>
            <li key={Math.random()}>{key}</li>
            {generateForm(obj[key])}
          </ul>
        );
      }
    }) as any;
  };

  const generateFormItem = (formItemConfig: any) => {
    if (formItemConfig['options']) {
      return generateDropdown(formItemConfig['options'])
    } else if (formItemConfig['resolution']) {
      return generateIncrementalInput(formItemConfig)
    } else if (formItemConfig['type'] === 'boolean') {
      return (
        <Radio.Group value={formItemConfig.default}>
          <Radio value={true}>True</Radio>
          <Radio value={false}>False</Radio>
        </Radio.Group>
      );
    }

    return <Input />;
  };

  const generateDropdown = (options: []) => (
    <Select>
      {options.map((option: string) => <Option key={option} value={option}>{option}</Option>)}
    </Select>
  );

  const generateIncrementalInput = (config: any) => (
    <InputNumber min={config.min} max={config.max} step={config.resolution} value={config.default} />
  );

  const isObject = (x: any) => {
    return Object.prototype.toString.call(x) === "[object Object]";
  };

  const saveConfig = (values: any) => {
    values.schema = schema;

    if (props.operation === 'edit') {
      values.configId = props.userFormData.configId;
    }

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
            defaultValue={schema}
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
            name={"configName"}
            label="Configuration Name"
            rules={[
              {
                required: true,
                message: 'Please enter a configuration name',
              },
            ]}
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
