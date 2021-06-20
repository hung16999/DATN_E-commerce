import React, { useState } from "react"
import { Table, Input, Popconfirm, Form, Typography, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid"
import { addAccount, deleteAccount, editAccount } from "../../redux/actions"

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const AdminUser = () => {
  const dispatch = useDispatch()
  const users = useSelector((store) => store.users)
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState("")
  const isEditing = (record) => record.id === editingKey

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    })
    setEditingKey(record.id)
  }

  const cancel = async () => {
    setEditingKey("")
  }

  const save = async (id) => {
    const row = await form.validateFields()
    dispatch(editAccount({ row, id }))
    setEditingKey("")
  }

  const deleteRecord = (record) => {
    dispatch(deleteAccount(record))
  }

  const addNewAccount = () => {
    const newAccount = {
      id: v4(),
      name: "",
      username: "",
      password: "",
    }

    const newData = [...users]
    newData.unshift(newAccount)
    dispatch(addAccount(newAccount))
    edit(newAccount)
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      editable: false,
      width: 150,
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
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
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <>
      <Button onClick={addNewAccount} type="primary">
        Thêm tài khoản mới
      </Button>

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
