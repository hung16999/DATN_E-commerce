import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { addProduct, deleteProduct, editProduct } from "../../redux/actions"
import { Table, Popconfirm, Form, Typography, Button, Select } from "antd"
import EditableCell from "./EditableCell"

const AdminUser = () => {
  const { Option } = Select
  const dispatch = useDispatch()
  const products = useSelector((store) => store.products)

  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState("")
  const [type, setType] = useState(null)
  const isEditing = (record) => record.id === editingKey
  const edit = (record) => {
    setType(record.type)
    form.setFieldsValue({
      name: "",
      src: "",
      price: 0,
      discount: 0,
      remains: 0,
      type: type,
      ...record,
    })
    setEditingKey(record.id)
  }

  const cancel = async () => {
    setEditingKey("")
  }

  const save = async (id) => {
    const row = await form.validateFields()
    dispatch(editProduct({ row: { ...row, type: type }, id }))
    setEditingKey("")
  }

  const deleteRecord = (record) => {
    dispatch(deleteProduct(record))
  }

  const addNewProduct = () => {
    const newProduct = {
      id: v4(),
      name: "",
      type: null,
      price: 0,
      discount: 0,
      remains: 0,
    }

    dispatch(addProduct(newProduct))
    edit(newProduct)
  }

  const changeType = (value) => {
    setType(value)
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      editable: false,
      width: 150,
    },
    {
      title: "tên",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "loại",
      dataIndex: "type",
      render: (_, product) => {
        const editable = isEditing(product)
        return editable ? (
          <Select
            defaultValue={product.type}
            style={{ width: 120 }}
            onChange={changeType}
          >
            <Option value="fruit">Hoa quả</Option>
            <Option value="vegetable">Rau củ</Option>
            <Option value="rice">Gạo</Option>
          </Select>
        ) : (
          <>
            <span>
              {product.type === "fruit" && "Hoa quả"}
              {product.type === "vegetable" && "Rau củ"}
              {product.type === "rice" && "Gạo"}
            </span>
          </>
        )
      },
    },
    {
      title: "giá",
      dataIndex: "price",
      editable: true,
    },
    {
      title: "discount",
      dataIndex: "discount",
      editable: true,
    },
    {
      title: "số lượng còn lại",
      dataIndex: "remains",
      editable: true,
    },
    {
      title: "Tính năng",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Button
              type="primary"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Lưu
            </Button>

            <Popconfirm title="Bạn muốn hủy?" onConfirm={cancel}>
              <Button>Hủy</Button>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Sửa
            </Typography.Link>

            <Popconfirm
              title="Bạn có chắc XÓA tài khoản?"
              onConfirm={() => deleteRecord(record)}
            >
              <Typography.Link
                disabled={editingKey !== ""}
                type="danger"
                style={{ marginLeft: "25px" }}
              >
                Xóa
              </Typography.Link>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "price" ||
          col.dataIndex === "discount" ||
          col.dataIndex === "remains"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <>
      <Button onClick={addNewProduct} type="primary">
        Thêm tài khoản mới
      </Button>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={products}
          columns={mergedColumns}
          rowClassName="editable-row"
          bordered
          pagination={false}
        />
      </Form>
    </>
  )
}

export default AdminUser
