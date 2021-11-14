import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import MovieList from "./components/Movies/MovieList";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Button } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import moment from "moment";
import ModalForm from "./components/Movies/Forms/ModalForm";
import "./App.css";
import { MySearch } from "./components/Search";
import { GenreFilter } from "./components/Filter";

const { Header, Content } = Layout;

const config = {
    rules: [{ type: "object", required: true, message: "Please select time!" }],
};

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [edit, setedit] = useState(null);
    const [loading, setloading] = useState(false);
    const [genreId, setGenreId] = useState("");

    async function fetchMovies() {
        let response = await fetch("http://localhost:5000/api/v1/movie");
        response = await response.json();
        if (response.success === true) {
            setMovies(response.data);
        } else alert(response.error.message);
    }

    async function fetchGenres() {
        let response = await fetch("http://localhost:5000/api/v1/movie/genre");
        response = await response.json();
        if (response.success === true) {
            setGenres(response.data);
        } else alert(response.error.message);
    }

    useEffect(() => {
        fetchGenres();
        fetchMovies();
    }, [loading]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // addMovie();
    };

    const handleCancel = () => {
        setedit(null);

        setIsModalVisible(false);
    };
    async function addMovie(values) {
        setloading(true);
        let response = await fetch("http://localhost:5000/api/v1/movie", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await response.json();
        if (response.success === true) {
            setIsModalVisible(false);
            setloading(false);
        } else alert(response.error.payload || response.error.message);
    }

    async function editMovie(values) {
        setloading(true);

        const editBody = { ...values, movie_id: edit.movie_id };
        let response = await fetch(`http://localhost:5000/api/v1/movie/edit`, {
            method: "PUT",
            body: JSON.stringify(editBody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 204) {
            setloading(false);

            setedit(null);
        } else alert(response);
    }

    const onFinish = (values) => {
        values = {
            ...values,
            release_date: moment(values.release_date).format(
                "YYYY-MM-DDThh:mm:ss"
            ),
        };

        if (edit) {
            editMovie(values);
        } else {
            addMovie(values);
        }
    };

    const onFinishFailed = (errorInfo) => {
        alert("Failed:", errorInfo);
    };

    async function searchMovies(x) {
        const url = genreId
            ? `http://localhost:5000/api/v1/movie?title=${x}&genre_id=${genreId}`
            : `http://localhost:5000/api/v1/movie?title=${x}`;

        let response = await fetch(url);
        response = await response.json();
        if (response.success === true) {
            setMovies(response.data);
        } else alert(response.error.message);
    }

    async function filterMovies(genre_id) {
        let response = await fetch(
            `http://localhost:5000/api/v1/movie?genre_id=${genre_id}`
        );
        response = await response.json();
        if (response.success === true) {
            setMovies(response.data);
        } else alert(response.error.message);
    }

    const handleSearch = (s) => {
        searchMovies(s.target.value);
    };
    const handleFilter = (s) => {
        setGenreId(s);
        filterMovies(s);
    };

    return (
        <section className={"container"}>
            <header className={"header"}>
                <h1 className={"title"}>MovieMania</h1>
                <GenreFilter
                    filterBy={handleFilter}
                    className={"action"}
                    genres={genres}
                />
                <Button
                    type="primary"
                    shape="circle"
                    icon={<RetweetOutlined />}
                    style={{ margin: "0px 8px" }}
                    onClick={() => {
                        setGenreId("");
                        fetchMovies();
                    }}
                />
                <MySearch onSearch={handleSearch} className={"action"} />
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{
                        padding: "0 50px",
                        margin: "16px",
                        float: "right",
                    }}
                >
                    Add Movie
                </Button>
            </header>
            <MovieList
                movies={movies}
                setedit={setedit}
                setloading={setloading}
            />
            <ModalForm
                isModalVisible={isModalVisible}
                edit={edit}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                config={config}
                genres={genres}
                handleCancel={handleCancel}
                handleOk={handleOk}
            />{" "}
        </section>
    );
};

export default App;
