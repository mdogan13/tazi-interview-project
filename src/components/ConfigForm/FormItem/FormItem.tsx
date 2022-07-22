import React from "react";
import { useState, useEffect } from "react";
import { List, Form, Input } from "antd";
import classes from "./ConfigList.module.css";

const FormItem = (props: any) => {
  return (
    <Form.Item label="Input">
      <Input />
    </Form.Item>
  );
};

export default FormItem;
