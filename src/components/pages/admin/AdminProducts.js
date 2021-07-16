import React, { useState } from "react"
import { v4 } from "uuid"
import {
  Table,
  Popconfirm,
  Input,
  notification,
  Form,
  Typography,
  Button,
} from "antd"
import EditableCell from "../../common/EditableCell"
import API from "../../../env/api"

const AdminUser = ({ products, fetchDataForAdmin }) => {
  const [form] = Form.useForm()
  const isEditing = (record) => record.id === editingKey

  const [editingKey, setEditingKey] = useState("")
  const [isAddProduct, setIsAddProduct] = useState(false)
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [remains, setRemains] = useState("")
  const [src, setSrc] = useState("")
  const [name, setName] = useState("")

  const openNotification = () => {
    notification.open({
      message: "Thông báo",
      description: "Thao tác thành công!",
    })
  }

  const edit = async (record) => {
    await form.setFieldsValue({
      name: "",
      src: "",
      price: 0,
      discount: 0,
      remains: 0,
      type: "",
      ...record,
    })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey("")
  }

  const save = async (id) => {
    const row = await form.validateFields()
    const formData = new FormData()

    formData.append("id", id)
    formData.append("name", row.name)
    formData.append("price", row.price)
    formData.append("discount", row.discount)
    formData.append("src", row.src)
    formData.append("remains", row.remains)

    API.post(`update_product.php`, formData).then((response) => {
      if (response.data === 1) {
        openNotification()
        fetchDataForAdmin()
      } else {
        alert(response.data)
      }
    })
    setEditingKey("")
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      editable: false,
      width: 50,
    },
    {
      title: "tên",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "loại",
      dataIndex: "type",
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
      title: "Đường dẫn ảnh",
      dataIndex: "src",
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

  const addNewProduct = () => {
    const formData = new FormData()

    formData.append("id", v4())
    formData.append("name", name)
    formData.append("price", price)
    formData.append("discount", discount)
    formData.append("src", src)
    formData.append("remains", remains)
    formData.append("type", type)

    API.post(`push_product.php`, formData).then((response) => {
      if (response.data === 1) {
        setDiscount("")
        setName("")
        setPrice("")
        setRemains("")
        setSrc("")
        setType("")
        fetchDataForAdmin()
        openNotification()
      }
    })
  }

  return (
    <>
      {isAddProduct ? (
        <>
          <div>
            <Button onClick={() => setIsAddProduct(false)} type="danger">
              Hủy
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "20px",
            }}
          >
            <label>
              Tên:{" "}
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Loại:{" "}
              <Input value={type} onChange={(e) => setType(e.target.value)} />
            </label>

            <label>
              price:{" "}
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <label>
              discount:{" "}
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </label>

            <label>
              số lượng còn lại:{" "}
              <Input
                type="number"
                value={remains}
                onChange={(e) => setRemains(e.target.value)}
              />
            </label>

            <label>
              src:{" "}
              <Input value={src} onChange={(e) => setSrc(e.target.value)} />
            </label>

            <Button
              onClick={addNewProduct}
              type="primary"
              style={{ marginLeft: "15px" }}
            >
              Lưu
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button onClick={() => setIsAddProduct(true)} type="primary">
            Thêm sản phẩm mới
          </Button>
        </>
      )}

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
