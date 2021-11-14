import {
    Form,
    Input,
    InputNumber,
    Button,
    Modal,
    DatePicker,
    Select,
} from "antd";
import moment from "moment";
import { useEffect } from "react";

const ModalForm = ({
    isModalVisible,
    edit,
    onFinish,
    onFinishFailed,
    config,
    genres,
    handleCancel,
    handleOk,
}) => {
    const [form] = Form.useForm();

    const init =
        edit == null
            ? {
                  created_date: "2021-11-14T13:05:57",
                  genre: { genre_name: "", genre_id: 0 },
                  genre_id: "",
                  movie_id: "",
                  price: 0,
                  rating: 0,
                  release_date: moment(),
                  title: "",
              }
            : edit;
    console.log(edit, init);
    useEffect(() => {
        form.setFieldsValue(init);
    }, [form, init]);
    return (
        <Modal
            title={edit ? "Edit Movie" : "Add Movie"}
            visible={isModalVisible || edit}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                name="add_movie"
                initialValues={init}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Movie Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Title must be between 3-60 characters",
                            min: 3,
                            max: 60,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="genre_id"
                    label="Genre"
                    rules={[
                        {
                            required: true,
                            // message: "Please enter a decimal value",
                        },
                    ]}
                    style={{
                        display: "inline-block",
                        width: "40%",
                        marginRight: "32px",
                    }}
                >
                    <Select>
                        {genres.map((g) => (
                            <Select.Option value={g.genre_id}>
                                {g.genre_name}
                            </Select.Option>
                        ))}
                        {/* <Select.Option value="demo">Demo</Select.Option> */}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="release_date"
                    label="Release Date"
                    {...config}
                    style={{
                        display: "inline-block",
                        width: "50%",
                    }}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[
                        {
                            type: "number",
                            message: "Please enter a decimal value",
                        },
                    ]}
                    style={{
                        display: "inline-block",
                        // width: "calc(50% - 8px)",
                        marginRight: "16px",
                    }}
                >
                    <InputNumber type="number" min={0} max={10} />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            type: "number",
                            message: "Please enter a decimal value",
                        },
                    ]}
                    style={{
                        display: "inline-block",
                        // width: "calc(50% - 8px)",
                    }}
                >
                    <InputNumber type="number" min={0} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalForm;
