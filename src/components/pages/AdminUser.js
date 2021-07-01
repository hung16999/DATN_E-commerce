import React, { useState } from "react"
import { v4 } from "uuid"
import {
  Table,
  Popconfirm,
  Form,
  Typography,
  Button,
  Input,
  notification,
} from "antd"
import EditableCell from "./EditableCell"
import api from "../../env/api"

const AdminUser = ({ users, fetchDataForAdmin }) => {
  const [form] = Form.useForm()
  const isEditing = (record) => record.id_account === editingKey

  const [editingKey, setEditingKey] = useState("")
  const [isAddAccount, setIsAddAccount] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const edit = async (record) => {
    await form.setFieldsValue({
      name: "",
      username: "",
      password: "",
      role: "",
      ...record,
    })
    setEditingKey(record.id_account)
  }

  const cancel = () => {
    setEditingKey("")
  }

  const save = async (id_account) => {
    const row = await form.validateFields()
    const formData = new FormData()

    formData.append("id_account", id_account)
    formData.append("name", row.name)
    formData.append("phone", row.phone)
    formData.append("username", row.username)
    formData.append("password", row.password)
    formData.append("role", row.role)

    api.post(`update_account.php`, formData).then((response) => {
      if (response.data === 1) {
        openNotification()
        fetchDataForAdmin()
      } else {
        alert(response.data)
      }
    })
    setEditingKey("")
  }

  const deleteRecord = (id) => {
    const formData = new FormData()
    formData.append("id_account", id)

    api.post(`delete_account.php`, formData).then((response) => {
      if (response.data === 1) {
        openNotification()
        fetchDataForAdmin()
      } else {
        alert(response.data)
      }
    })
  }

  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "chức vụ",
      dataIndex: "role",
      editable: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      editable: true,
    },
    {
      title: "username",
      dataIndex: "username",
      editable: true,
    },
    {
      title: "password",
      dataIndex: "password",
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
              onClick={() => save(record.id_account)}
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
              onConfirm={() => deleteRecord(record.id_account)}
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
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        inputType: col.dataIndex === "phone" || "role" ? "number" : "text",
      }),
    }
  })

  const addNewAccount = () => {
    const formData = new FormData()

    formData.append("id_account", v4())
    formData.append("name", name)
    formData.append("phone", phone)
    formData.append("role", role)
    formData.append("username", username)
    formData.append("password", password)

    api.post(`push_account.php`, formData).then((response) => {
      if (response.data === 1) {
        setName("")
        setPassword("")
        setRole("")
        setUsername("")
        setPhone("")
        fetchDataForAdmin()
        openNotification()
      }
    })
  }

  const openNotification = () => {
    notification.open({
      message: "Thông báo",
      description: "Thao tác thành công!",
    })
  }

  return (
    <>
      {isAddAccount ? (
        <>
          <div>
            <Button onClick={() => setIsAddAccount(false)} type="danger">
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
              Họ và tên:{" "}
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Chức vụ:{" "}
              <Input
                type="number"
                min={2}
                max={3}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </label>

            <label>
              phone:{" "}
              <Input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <label>
              username:{" "}
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label>
              password:{" "}
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <Button
              onClick={addNewAccount}
              type="primary"
              style={{ marginLeft: "15px" }}
            >
              Lưu
            </Button>
          </div>
        </>
      ) : (
        <Button onClick={() => setIsAddAccount(true)} type="primary">
          Thêm tài khoản mới
        </Button>
      )}

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={users}
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
