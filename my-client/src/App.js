import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import MovieList from "./components/Movies/MovieList";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
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
import { getKeyThenIncreaseKey } from "antd/lib/message";
const { Header, Content } = Layout;

const config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }],
};

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            let response = await fetch("http://localhost:5000/api/v1/movie");
            response = await response.json();
            if (response.success === true) {
                console.log(response);
                setMovies(response.data);
            } else alert(response.error.message);
        }

        async function fetchGenres() {
            let response = await fetch(
                "http://localhost:5000/api/v1/movie/genre"
            );
            response = await response.json();
            if (response.success === true) {
                console.log(response);
                setGenres(response.data);
            } else alert(response.error.message);
        }

        fetchGenres();
        fetchMovies();
    }, [isModalVisible]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // addMovie();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const addMovie = (values) => {
        async function fetchMovies() {
            let response = await fetch("http://localhost:5000/api/v1/movie", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            response = await response.json();
            if (response.success === true) {
                console.log(response.data);

                setIsModalVisible(false);
            } else alert(response.error.message || response.error.payload);
        }
        fetchMovies();
    };

    const onFinish = (values) => {
        console.log("Success:", values);
        console.log(
            moment(values.release_date).format("YYYY-MM-DDThh:mm:ss[Z]")
        );
        values = { ...values, release_date: values.release_date };
        addMovie(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    console.log(genres);

    return (
        <Layout>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ color: "white", padding: 0 }}
                >
                    MovieMania
                    <Button type="primary" onClick={showModal}>
                        Primary Button
                    </Button>
                </Header>
                <Content style={{ margin: "64px 0px", padding: "0 50px" }}>
                    <MovieList movies={movies} />
                </Content>
                <Modal
                    title={"Add Movie"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form
                        name="add_movie"
                        initialValues={{}}
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
                                    message:
                                        "Title must be between 3-60 characters",
                                    min: 3,
                                    max: 60,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="realease_date"
                            label="Release Date"
                            {...config}
                        >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item name="genre_id" label="Select">
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
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    type: "number",
                                    message: "Please enter a decimal value",
                                },
                            ]}
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
                        >
                            <InputNumber type="number" min={0} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Layout>
        </Layout>
    );
};

export default App;
