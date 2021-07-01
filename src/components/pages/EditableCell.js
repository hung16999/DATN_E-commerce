import { Input, InputNumber, Form } from "antd"

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
  const inputNode = () => {
    if (dataIndex === "role") {
      return <InputNumber min={2} max={3} />
    } else if (inputType === "number") {
      return <InputNumber />
    } else {
      return <Input />
    }
  }

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
          {inputNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export default EditableCell
