import React from 'react';
import PropTypes from 'prop-types';// 利用prop-types第三方库对组件的props中的变量进行类型检测
import { Table, Popconfirm, Button } from 'antd';

//onDelete，products从
const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
    <Button>Delete</Button>
      </Popconfirm>
    );
    },
  }];
  return (
    <Table
  dataSource={products}
  columns={columns}
  rowKey="name"
  />
);
};

// 进行类型检测
ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
